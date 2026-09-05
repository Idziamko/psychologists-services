import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

export const Logo = () => (
  <Link className={styles.logo} to="/">
    <span className={styles.accent}>psychologists.</span>services
  </Link>
);
