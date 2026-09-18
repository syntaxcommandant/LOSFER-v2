export type ItemType = 'lost' | 'found';

export interface Item {
  id: number;
  user_id: number;
  item_type: ItemType;
  title: string;
  description: string;
  category: string;
  color: string;
  location: string;
  timestamp: string;
  image_url?: string | null;
  secret_answer?: string;
  claim_id?: number | null;
}

export interface MatchCandidate {
  match_id?: number | null;
  candidate_item: Item;
  similarity_score: number;
  high_confidence_match: boolean;
}

export interface Claim {
  id: number;
  item_id: number;
  claimant_id: number;
  verification_answer: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface VerifyResult {
  verified: boolean;
  message: string;
  match_score?: number;
}

export interface UserSession {
  email: string;
  name: string;
  studentId: string;
  role: 'student' | 'admin';
}
