import styles from './LoadMoreButton.module.css';

interface LoadMoreButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

export const LoadMoreButton = ({ onClick, isLoading }: LoadMoreButtonProps) => (
  <button
    className={styles.button}
    type="button"
    onClick={onClick}
    disabled={isLoading}
  >
    {isLoading ? 'Loading...' : 'Load more'}
  </button>
);
