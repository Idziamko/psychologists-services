import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Loader } from '../Loader/Loader';
import styles from './Layout.module.css';

export const Layout = () => (
  <div className={styles.wrapper}>
    <Header />
    <main className={styles.main}>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </main>
  </div>
);
