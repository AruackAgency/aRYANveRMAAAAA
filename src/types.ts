export interface PhotoItem {
  id: number;
  chapter: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  dateTag: string;
  locationTag: string;
  quote: string;
  heartCount: number;
  filter?: string;
  userUploaded?: boolean;
}

export interface WishItem {
  id: string;
  author: string;
  text: string;
  category: 'love' | 'success' | 'happiness' | 'dreams';
  timestamp: string;
  sparkleColor: string;
}

export interface ReasonItem {
  id: number;
  number: number;
  title: string;
  text: string;
  category: 'radiance' | 'heart' | 'magic' | 'quirks';
  emoji: string;
  isFlipped?: boolean;
}

export interface BirthdayQuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface FortuneItem {
  fortune: string;
  blessing: string;
  luckyNumber: number;
  luckyColor: string;
}
