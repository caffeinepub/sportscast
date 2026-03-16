// localStorage utility helpers for SportsCast

export interface Prediction {
  matchId: string;
  predictedTeam: string;
  matchTeamA: string;
  matchTeamB: string;
  sport: string;
  isCorrect?: boolean;
  submittedAt: number;
}

export interface UserProfile {
  username: string;
  totalPoints: number;
  language: string;
}

export interface Group {
  id: string;
  name: string;
  inviteCode: string;
  members: GroupMember[];
  createdAt: number;
}

export interface GroupMember {
  name: string;
  points: number;
  isMe: boolean;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

const KEYS = {
  predictions: "sc_predictions",
  profile: "sc_profile",
  groups: "sc_groups",
  cart: "sc_cart",
};

export function getProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(KEYS.profile);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { username: "Player1", totalPoints: 120, language: "en" };
}

export function saveProfile(profile: UserProfile): void {
  localStorage.setItem(KEYS.profile, JSON.stringify(profile));
}

export function getPredictions(): Prediction[] {
  try {
    const raw = localStorage.getItem(KEYS.predictions);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function savePrediction(prediction: Prediction): void {
  const preds = getPredictions().filter(
    (p) => p.matchId !== prediction.matchId,
  );
  preds.unshift(prediction);
  localStorage.setItem(KEYS.predictions, JSON.stringify(preds));
}

export function getPredictionForMatch(matchId: string): Prediction | undefined {
  return getPredictions().find((p) => p.matchId === matchId);
}

export function getGroups(): Group[] {
  try {
    const raw = localStorage.getItem(KEYS.groups);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function saveGroups(groups: Group[]): void {
  localStorage.setItem(KEYS.groups, JSON.stringify(groups));
}

export function generateInviteCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export function getCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(KEYS.cart);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function saveCart(cart: CartItem[]): void {
  localStorage.setItem(KEYS.cart, JSON.stringify(cart));
}

export function clearCart(): void {
  localStorage.removeItem(KEYS.cart);
}

// Friends feature
export interface Friend {
  username: string;
  points: number;
  addedAt: number;
}

// Mock user registry for search
const MOCK_USERS: Friend[] = [
  { username: "RohitFan99", points: 340, addedAt: 0 },
  { username: "ViratKing", points: 290, addedAt: 0 },
  { username: "DhoniLover", points: 275, addedAt: 0 },
  { username: "IPLPunter", points: 210, addedAt: 0 },
  { username: "CricketGuru", points: 195, addedAt: 0 },
  { username: "SixHitter", points: 180, addedAt: 0 },
  { username: "WicketWatch", points: 165, addedAt: 0 },
  { username: "BoundaryBoss", points: 150, addedAt: 0 },
  { username: "SpinMaster", points: 140, addedAt: 0 },
  { username: "PitchPerfect", points: 120, addedAt: 0 },
  { username: "StumpSmasher", points: 100, addedAt: 0 },
  { username: "OverAnalyzer", points: 85, addedAt: 0 },
];

export function searchUsers(query: string): Friend[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return MOCK_USERS.filter((u) => u.username.toLowerCase().includes(q));
}

export function getFriends(): Friend[] {
  try {
    const raw = localStorage.getItem("sc_friends");
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function saveFriends(friends: Friend[]): void {
  localStorage.setItem("sc_friends", JSON.stringify(friends));
}
