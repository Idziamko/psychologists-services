import { createContext } from 'react';

export interface FavoritesContextValue {
  favoriteIds: string[];
  isLoading: boolean;
  toggleFavorite: (id: string) => Promise<void>;
  isFavorite: (id: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(
  null
);
