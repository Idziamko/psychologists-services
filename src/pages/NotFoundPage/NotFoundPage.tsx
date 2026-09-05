import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => (
  <section className={styles.section}>
    <p className={styles.code}>404</p>
    <h1 className={styles.title}>This page does not exist</h1>
    <Link className={styles.link} to="/">
      Back to home
    </Link>
  </section>
);

export default NotFoundPage;
