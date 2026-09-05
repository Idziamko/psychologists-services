import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { SortSelect } from '../../components/SortSelect/SortSelect';
import { PsychologistsList } from '../../components/PsychologistsList/PsychologistsList';
import { LoadMoreButton } from '../../components/LoadMoreButton/LoadMoreButton';
import { Loader } from '../../components/Loader/Loader';
import { useFavorites } from '../../hooks/useFavorites';
import {
  fetchPsychologistsByIds,
  PAGE_SIZE,
} from '../../services/psychologistsApi';
import { sortPsychologists } from '../../utils/sortPsychologists';
import styles from './FavoritesPage.module.css';

const FavoritesPage = () => {
  const { favoriteIds } = useFavorites();
  const [psychologists, setPsychologists] = useState([]);
  const [sortValue, setSortValue] = useState('show-all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    setIsLoading(true);

    fetchPsychologistsByIds(favoriteIds)
      .then(items => {
        if (isActive) {
          setPsychologists(items);
        }
      })
      .catch(() => toast.error('Failed to load favorites'))
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [favoriteIds]);

  const sorted = useMemo(
    () => sortPsychologists(psychologists, sortValue),
    [psychologists, sortValue]
  );

  const visible = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SortSelect
          value={sortValue}
          onChange={value => {
            setSortValue(value);
            setVisibleCount(PAGE_SIZE);
          }}
        />

        {visible.length > 0 ? (
          <div className={styles.list}>
            <PsychologistsList psychologists={visible} />
          </div>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>
              You do not have any favorite psychologists yet
            </p>
            <Link className={styles.emptyLink} to="/psychologists">
              Go to psychologists
            </Link>
          </div>
        )}

        {hasMore && (
          <LoadMoreButton
            onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
          />
        )}
      </div>
    </section>
  );
};

export default FavoritesPage;
