import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

export const Logo = () => (
  <Link className={styles.logo} to="/">
    <span className={styles.brand}>psychologists</span>
    <span className={styles.dot}>.</span>
    <span className={styles.suffix}>services</span>
  </Link>
);
