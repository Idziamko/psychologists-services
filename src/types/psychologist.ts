export interface Review {
  reviewer: string;
  rating: number;
  comment: string;
}

export interface Psychologist {
  id: string;
  name: string;
  avatar_url: string;
  experience: string;
  reviews: Review[];
  price_per_hour: number;
  rating: number;
  license: string;
  specialization: string;
  initial_consultation: string;
  about: string;
}

export type SortValue =
  | 'a-z'
  | 'z-a'
  | 'price-low'
  | 'price-high'
  | 'popular'
  | 'not-popular'
  | 'show-all';

export interface SortOption {
  value: SortValue;
  label: string;
}

export interface PageCursor {
  id: string;
  value: string | number;
}

export interface PsychologistsPage {
  items: Psychologist[];
  cursor: PageCursor | null;
  hasMore: boolean;
}
