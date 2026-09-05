import styles from './LoadMoreButton.module.css';

export const LoadMoreButton = ({ onClick, isLoading }) => (
  <button
    className={styles.button}
    type="button"
    onClick={onClick}
    disabled={isLoading}
  >
    {isLoading ? 'Loading...' : 'Load more'}
  </button>
);
