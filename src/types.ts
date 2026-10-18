export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  category: 'childhood' | 'milestone' | 'fun' | 'tradition';
  tag: string;
  description: string;
  imageTheme: string;
}

export interface PromiseItem {
  id: number;
  title: string;
  subtitle: string;
  detail: string;
  iconName: string;
}

export interface CouponItem {
  id: string;
  title: string;
  description: string;
  code: string;
  icon: string;
  isRedeemed: boolean;
  redeemedDate?: string;
}

export interface SiblingNote {
  id: string;
  sender: 'Prachi' | 'Mandip';
  message: string;
  timestamp: string;
  emoji: string;
}
