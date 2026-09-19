from fastapi import UploadFile, File, Form, FastAPI, Depends, HTTPException, status, Query
from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
import json
from image_scan import check_image
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from typing import List, Optional

from config import settings
from database import engine, get_db
from models import Base
import models, schemas, services


# Initialize database schema migrations
Base.metadata.create_all(bind=engine)

app = FastAPI(title="LoseFer Backend Engine - Member B", version="1.0.0")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Dummy User Dependency for multi-user context testing (Replaced by JWT middleware in Auth integration)
def get_current_user_id() -> int:
    return 1

# --- AUTH ENDPOINTS ---

@app.post("/signup", response_model=schemas.UserResponse)
def signup(user_in: schemas.UserSignup, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == user_in.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = pwd_context.hash(user_in.password)
    new_user = models.User(email=user_in.email, hashed_password=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@app.post("/login")
def login(user_in: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == user_in.email).first()
    if not user or not pwd_context.verify(user_in.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {"message": "Login successful", "user_id": user.id, "email": user.email}

# --- REPORTING ENDPOINTS ---[cite: 1]

@app.post("/report-lost", response_model=schemas.ItemResponse, status_code=status.HTTP_201_CREATED)
def report_lost(
    item_in: str = Form(...),
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    item_data = schemas.ItemCreate(**json.loads(item_in))
    image_path = None
    if image:
        # image save karo
        image_path = f"uploads/{image.filename}"
        with open(image_path, "wb") as f:
            f.write(image.file.read())

        # scan karo
        is_safe = check_image(image_path)
        if not is_safe:
            raise HTTPException(status_code=400, detail="Image flagged as inappropriate content")

    item = models.Item(
        **item_data.model_dump(exclude_unset=True, exclude={"timestamp", "image_url"}),
        item_type=models.ItemTypeEnum.LOST,
        user_id=user_id,
        timestamp=item_data.timestamp or datetime.now(timezone.utc),
        image_url=image_path
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@app.post("/report-found", response_model=schemas.ItemResponse, status_code=status.HTTP_201_CREATED)
def report_found(
    item_in: str = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    """
    Submits a found item report.
    """
    item_data = schemas.ItemCreate(**json.loads(item_in))

     # image save karo
    image_path = f"uploads/{image.filename}"
    with open(image_path, "wb") as f:
        f.write(image.file.read())

    # scan karo
    is_safe = check_image(image_path)
    if not is_safe:
        raise HTTPException(status_code=400, detail="Image flagged as inappropriate content")
    
    item = models.Item(
    **item_data.model_dump(exclude_unset=True, exclude={"timestamp", "image_url"}),
    item_type=models.ItemTypeEnum.FOUND,
    user_id=user_id,
    timestamp=item_data.timestamp or datetime.now(timezone.utc),
    image_url=image_path
)
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@app.post("/verify-item/{item_id}")
def verify_item(
    item_id: int,
    submitted_answer: str = Form(...),
    db: Session = Depends(get_db)
):
    """
    Verifies claimant's secret answer against the stored one using keyword matching.
    """
    item = db.query(models.Item).filter(models.Item.id == item_id).first()

    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    stored_answer = item.secret_answer.strip().lower() if item.secret_answer else ""
    given_answer = submitted_answer.strip().lower()
    print("ITEM ID:", item_id)
    print("STORED ANSWER:", repr(item.secret_answer))
    print("SUBMITTED ANSWER:", repr(submitted_answer))

    # Common filler words jo ignore karne hain
    ignore_words = {"the", "a", "an", "is", "are", "there", "it", "has", "on", "of", "in"}

    stored_words = set(stored_answer.split()) - ignore_words
    given_words = set(given_answer.split()) - ignore_words

    print("STORED WORDS:", stored_words)
    print("GIVEN WORDS:", given_words)
    print("MATCH COUNT:", match_count)
    print("MATCH RATIO:", match_ratio)


    if not stored_words:
        return {"verified": False, "message": "No valid secret answer stored"}

    # Kitne % stored keywords submitted answer mein maujood hain
    match_count = len(stored_words & given_words)
    match_ratio = match_count / len(stored_words)

    if match_ratio >= 0.6:  # 60% ya usse zyada keywords match hone chahiye
        return {"verified": True, "message": "Verification successful", "match_score": round(match_ratio * 100, 1)}
    else:
        return {
            "verified": False,
            "message": "Answer does not sufficiently match. Manual verification required.",
            "match_score": round(match_ratio * 100, 1)
        }
    
    

@app.get("/items", response_model=List[schemas.ItemResponse])
def get_found_items(
    category: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """
    Retrieves and lists all found items, with optional category filtering
    """
    query = db.query(models.Item).filter(models.Item.item_type == models.ItemTypeEnum.FOUND)
    if category:
        query = query.filter(models.Item.category.ilike(f"%{category}%"))
    items = query.all()

    for item in items:
        claim = db.query(models.Claim).filter(models.Claim.item_id == item.id).first()
        item.claim_id = claim.id if claim else None

    return items


# --- AI MATCHING ENDPOINT ---[cite: 1]

@app.get("/match/{item_id}", response_model=List[schemas.MatchResultResponse])
def get_matches_for_item(
    item_id: int,
    db: Session = Depends(get_db)
):
    """
    Calculates and returns ranked candidate matches using Member C's scoring factors[cite: 1].
    Stores high-confidence match entities in database and triggers notifications[cite: 1].
    """
    target_item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if not target_item:
        raise HTTPException(status_code=404, detail="Item not found")

    # Determine opposite item pool
    opposite_type = models.ItemTypeEnum.FOUND if target_item.item_type == models.ItemTypeEnum.LOST else models.ItemTypeEnum.LOST
    candidates = db.query(models.Item).filter(models.Item.item_type == opposite_type).all()

    ranked_results = []
    for candidate in candidates:
        score = services.calculate_heuristic_match(target_item, candidate)
        is_high_confidence = score >= settings.MATCH_SCORE_THRESHOLD

        # Record or update match record
        match_entry = db.query(models.Match).filter(
            models.Match.lost_item_id == (target_item.id if target_item.item_type == models.ItemTypeEnum.LOST else candidate.id),
            models.Match.found_item_id == (candidate.id if target_item.item_type == models.ItemTypeEnum.LOST else target_item.id)
        ).first()

        if not match_entry:
            match_entry = models.Match(
                lost_item_id=target_item.id if target_item.item_type == models.ItemTypeEnum.LOST else candidate.id,
                found_item_id=candidate.id if target_item.item_type == models.ItemTypeEnum.LOST else target_item.id,
                similarity_score=score
            )
            db.add(match_entry)
            db.commit()
            db.refresh(match_entry)

        # Trigger notification if criteria met[cite: 1]
        if is_high_confidence and not match_entry.is_notification_sent:
            notified = services.trigger_match_notification(
                lost_item=target_item if target_item.item_type == models.ItemTypeEnum.LOST else candidate,
                found_item=candidate if target_item.item_type == models.ItemTypeEnum.LOST else target_item,
                score=score
            )
            if notified:
                match_entry.is_notification_sent = True
                db.commit()

        ranked_results.append({
            "match_id": match_entry.id,
            "candidate_item": candidate,
            "similarity_score": score,
            "high_confidence_match": is_high_confidence
        })

    # Sort results highest score first
    ranked_results.sort(key=lambda x: x["similarity_score"], reverse=True)
    return ranked_results

# --- CLAIM ENDPOINTS ---[cite: 1]

@app.post("/claim", response_model=schemas.ClaimResponse, status_code=status.HTTP_201_CREATED)
def submit_claim(
    claim_in: schemas.ClaimCreate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    """
    Submits a claim and stores verification answers for security verification[cite: 1].
    """
    item = db.query(models.Item).filter(models.Item.id == claim_in.item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Target item not found")

    if not claim_in.verification_answer.strip():
        raise HTTPException(status_code=400, detail="Verification answer cannot be empty")

    claim = models.Claim(
        item_id=claim_in.item_id,
        claimant_id=user_id,
        verification_answer=claim_in.verification_answer,
        status=models.ClaimStatusEnum.PENDING
    )
    db.add(claim)
    db.commit()
    db.refresh(claim)
    return claim

@app.post("/claims/{claim_id}/messages")
def send_message(
    claim_id: int,
    message: str = Form(...),
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    new_message = models.Message(
        claim_id=claim_id,
        sender_id=user_id,
        message=message
    )

    db.add(new_message)
    db.commit()
    db.refresh(new_message)

    return new_message

@app.get("/claims/{claim_id}/messages")
def get_messages(
    claim_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    messages = (
        db.query(models.Message)
        .filter(models.Message.claim_id == claim_id)
        .order_by(models.Message.created_at)
        .all()
    )

    return [
        {
            "id": msg.id,
            "sender": "You" if msg.sender_id == user_id else "Other User",
            "text": msg.message,
            "created_at": msg.created_at
        }
        for msg in messages
    ]

@app.get("/claims/{claim_id}/unread-count")
def get_unread_count(
    claim_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    unread = db.query(models.Message).filter(
        models.Message.claim_id == claim_id,
        models.Message.sender_id != user_id,
        models.Message.is_read == False
    ).count()
    return {"unread_count": unread}

@app.post("/claims/{claim_id}/mark-read")
def mark_messages_read(
    claim_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    db.query(models.Message).filter(
        models.Message.claim_id == claim_id,
        models.Message.sender_id != user_id
    ).update({"is_read": True})
    db.commit()
    return {"status": "marked as read"}
