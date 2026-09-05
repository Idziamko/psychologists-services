import { get, ref, set } from 'firebase/database';
import { database } from '../firebase/config';

export const fetchFavoriteIds = async userId => {
  const snapshot = await get(ref(database, `users/${userId}/favorites`));
  return snapshot.exists() ? snapshot.val() : [];
};

export const saveFavoriteIds = (userId, ids) =>
  set(ref(database, `users/${userId}/favorites`), ids);
