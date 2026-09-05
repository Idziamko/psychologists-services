import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchFavoriteIds, saveFavoriteIds } from '../services/favoritesApi';
import { useAuth } from '../hooks/useAuth';
import { FavoritesContext } from './FavoritesContext';

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setFavoriteIds([]);
      return;
    }

    let isActive = true;
    setIsLoading(true);

    fetchFavoriteIds(user.uid)
      .then(ids => {
        if (isActive) {
          setFavoriteIds(ids);
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [user]);

  const toggleFavorite = useCallback(
    async id => {
      if (!user) {
        return;
      }

      const nextIds = favoriteIds.includes(id)
        ? favoriteIds.filter(favoriteId => favoriteId !== id)
        : [...favoriteIds, id];

      setFavoriteIds(nextIds);
      await saveFavoriteIds(user.uid, nextIds);
    },
    [favoriteIds, user]
  );

  const value = useMemo(
    () => ({
      favoriteIds,
      isLoading,
      toggleFavorite,
      isFavorite: id => favoriteIds.includes(id),
    }),
    [favoriteIds, isLoading, toggleFavorite]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
