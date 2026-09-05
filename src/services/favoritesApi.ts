import { get, ref, set } from 'firebase/database';
import { database } from '../firebase/config';

export const fetchFavoriteIds = async (userId: string): Promise<string[]> => {
  const snapshot = await get(ref(database, `users/${userId}/favorites`));
  return snapshot.exists() ? snapshot.val() : [];
};

export const saveFavoriteIds = (userId: string, ids: string[]): Promise<void> =>
  set(ref(database, `users/${userId}/favorites`), ids);
