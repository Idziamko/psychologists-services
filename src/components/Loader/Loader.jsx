import styles from './Loader.module.css';

export const Loader = () => (
  <div className={styles.wrapper} role="status" aria-live="polite">
    <span className={styles.spinner} />
    <span className="visually-hidden">Loading</span>
  </div>
);
