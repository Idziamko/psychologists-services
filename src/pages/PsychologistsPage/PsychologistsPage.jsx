import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { SortSelect } from '../../components/SortSelect/SortSelect';
import { PsychologistsList } from '../../components/PsychologistsList/PsychologistsList';
import { LoadMoreButton } from '../../components/LoadMoreButton/LoadMoreButton';
import { Loader } from '../../components/Loader/Loader';
import { fetchPsychologistsPage } from '../../services/psychologistsApi';
import styles from './PsychologistsPage.module.css';

const PsychologistsPage = () => {
  const [psychologists, setPsychologists] = useState([]);
  const [sortValue, setSortValue] = useState('show-all');
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    setIsLoading(true);

    fetchPsychologistsPage(sortValue, null)
      .then(page => {
        if (!isActive) {
          return;
        }

        setPsychologists(page.items);
        setCursor(page.cursor);
        setHasMore(page.hasMore);
      })
      .catch(() => toast.error('Failed to load psychologists'))
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [sortValue]);

  const handleLoadMore = async () => {
    setIsLoading(true);

    try {
      const page = await fetchPsychologistsPage(sortValue, cursor);
      setPsychologists(prev => [...prev, ...page.items]);
      setCursor(page.cursor);
      setHasMore(page.hasMore);
    } catch {
      toast.error('Failed to load more psychologists');
    } finally {
      setIsLoading(false);
    }
  };

  const isInitialLoading = isLoading && psychologists.length === 0;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SortSelect value={sortValue} onChange={setSortValue} />

        {isInitialLoading ? (
          <Loader />
        ) : (
          <div className={styles.list}>
            <PsychologistsList psychologists={psychologists} />
          </div>
        )}

        {hasMore && !isInitialLoading && (
          <LoadMoreButton onClick={handleLoadMore} isLoading={isLoading} />
        )}
      </div>
    </section>
  );
};

export default PsychologistsPage;
