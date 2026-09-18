import axios from 'axios';
import { Item, MatchCandidate, Claim, VerifyResult } from './types';


export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

// Fallback demo items for offline resilience / initial campus showcase
export const DEMO_FOUND_ITEMS: Item[] = [
  {
    id: 101,
    user_id: 1,
    item_type: 'found',
    title: 'Casio Scientific Calculator fx-991CW',
    category: 'Electronics',
    color: 'Black',
    location: 'Room 204, Block B',
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    description: 'Black Casio scientific calculator with protective slide cover. Found near row 4 desk.',
    image_url: null,
  },
  {
    id: 102,
    user_id: 2,
    item_type: 'found',
    title: 'Silver Analog Watch with Brown Leather Strap',
    category: 'Accessories',
    color: 'Brown',
    location: 'Central Library, 2nd Floor',
    timestamp: new Date(Date.now() - 3600000 * 18).toISOString(),
    description: 'Men\'s analog wrist watch with minor scratch on outer bezel and genuine leather strap.',
    image_url: null,
  },
  {
    id: 103,
    user_id: 3,
    item_type: 'found',
    title: 'Blue Steel Hydro Water Bottle',
    category: 'Accessories',
    color: 'Blue',
    location: 'Sports Ground Pavilion',
    timestamp: new Date(Date.now() - 3600000 * 30).toISOString(),
    description: 'Insulated blue metal water bottle with sticker residue on bottom and dented cap.',
    image_url: null,
  },
  {
    id: 104,
    user_id: 4,
    item_type: 'found',
    title: 'Black Laptop Backpack with Padded Sleeve',
    category: 'Bags',
    color: 'Black',
    location: 'Main Cafeteria, North Wing',
    timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
    description: 'Black water-resistant backpack containing engineering notebooks and a yellow lanyard.',
    image_url: null,
  },
  {
    id: 105,
    user_id: 5,
    item_type: 'found',
    title: 'Wireless Earbuds Charging Case (White)',
    category: 'Electronics',
    color: 'White',
    location: 'Computer Lab 3, Tech Park',
    timestamp: new Date(Date.now() - 3600000 * 56).toISOString(),
    description: 'White glossy case with small silver keychain clip. Found plugged into workstation 14.',
    image_url: null,
  },
  {
    id: 106,
    user_id: 6,
    item_type: 'found',
    title: 'Campus Student ID Card & Lanyard',
    category: 'Documents',
    color: 'Blue',
    location: 'Auditorium Entry Foyer',
    timestamp: new Date(Date.now() - 3600000 * 72).toISOString(),
    description: 'Blue university lanyard with magnetic access badge in clear acrylic holder.',
    image_url: null,
  },
];

export async function fetchFoundItems(category?: string): Promise<Item[]> {
  try {
    const params = category && category !== 'All' ? { category } : {};
    const res = await axios.get<Item[]>(`${API_BASE_URL}/items`, { params, timeout: 4000 });
    if (res.data && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }
  } catch (err) {
    console.warn('Live backend /items unreachable or empty, using campus preview items', err);
  }
  
  if (category && category !== 'All') {
    return DEMO_FOUND_ITEMS.filter((i) => i.category.toLowerCase() === category.toLowerCase());
  }
  return DEMO_FOUND_ITEMS;
}

export async function fetchItemById(id: number): Promise<Item | null> {
  try {
    const res = await axios.get<Item>(`${API_BASE_URL}/items/${id}`, { timeout: 3000 });
    if (res.data) return res.data;
  } catch {
    // Fallback search in catalog
    try {
      const items = await fetchFoundItems();
      const found = items.find((i) => i.id === id);
      if (found) return found;
    } catch {}
  }
  return DEMO_FOUND_ITEMS.find((i) => i.id === id) || null;
}

export async function reportLostItem(itemData: {
  title: string;
  description: string;
  secret_answer: string;
  category: string;
  color: string;
  location: string;
  timestamp: string;
}, photo?: File | null): Promise<Item> {
  const formData = new FormData();
  formData.append('item_in', JSON.stringify(itemData));
  if (photo) {
    formData.append('image', photo);
  }

  const res = await axios.post<Item>(`${API_BASE_URL}/report-lost`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}

export async function reportFoundItem(itemData: {
  title: string;
  description: string;
  secret_answer: string;
  category: string;
  color: string;
  location: string;
  timestamp: string;
}, photo: File): Promise<Item> {
  const formData = new FormData();
  formData.append('item_in', JSON.stringify(itemData));
  formData.append('image', photo);

  const res = await axios.post<Item>(`${API_BASE_URL}/report-found`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}

export async function fetchMatches(itemId: number): Promise<MatchCandidate[]> {
  try {
    const res = await axios.get<MatchCandidate[]>(`${API_BASE_URL}/match/${itemId}`, { timeout: 5000 });
    if (res.data && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }
  } catch (err) {
    console.warn(`Match API call for item ${itemId} fallback to heuristic simulation`, err);
  }

  // Simulated heuristic matches for presentation demo if backend match is empty
  const candidate = DEMO_FOUND_ITEMS[0];
  return [
    {
      match_id: 1,
      candidate_item: candidate,
      similarity_score: 87.5,
      high_confidence_match: true,
    },
    {
      match_id: 2,
      candidate_item: DEMO_FOUND_ITEMS[1],
      similarity_score: 64.2,
      high_confidence_match: false,
    },
  ];
}

export async function verifySecretAnswer(itemId: number, submittedAnswer: string): Promise<VerifyResult> {
  const formData = new FormData();
  formData.append('submitted_answer', submittedAnswer);

  const res = await axios.post<VerifyResult>(`${API_BASE_URL}/verify-item/${itemId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}

export async function submitClaim(itemId: number, verificationAnswer: string): Promise<Claim> {
  const res = await axios.post<Claim>(`${API_BASE_URL}/claim`, {
    item_id: itemId,
    verification_answer: verificationAnswer,
  });
  return res.data;
}

export async function sendMessage(
  claimId: number,
  message: string
) {
  const formData = new FormData();

  formData.append("message", message);

  const res = await axios.post(
    `${API_BASE_URL}/claims/${claimId}/messages`,
    formData
  );

  return res.data;
}

export async function getMessages(claimId: number) {
  const res = await axios.get(
    `${API_BASE_URL}/claims/${claimId}/messages`
  );

  return res.data;
}

export async function markMessagesRead(claimId: number) {
  const res = await axios.post(`${API_BASE_URL}/claims/${claimId}/mark-read`);
  return res.data;
}


