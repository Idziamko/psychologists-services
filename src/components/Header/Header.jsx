import { useState } from 'react';
import { Logo } from '../Logo/Logo';
import { Navigation } from '../Navigation/Navigation';
import { AuthNav } from '../AuthNav/AuthNav';
import { UserBar } from '../UserBar/UserBar';
import { Modal } from '../Modal/Modal';
import { LoginForm } from '../LoginForm/LoginForm';
import { RegisterForm } from '../RegisterForm/RegisterForm';
import { useAuth } from '../../hooks/useAuth';
import styles from './Header.module.css';

export const Header = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const [openedModal, setOpenedModal] = useState(null);

  const closeModal = () => setOpenedModal(null);

  return (
    <header className={styles.header}>
      <div
        className={
          isLoggedIn ? `${styles.inner} ${styles.centered}` : styles.inner
        }
      >
        <Logo />
        <Navigation />
        {isLoggedIn ? (
          <UserBar name={user.displayName ?? 'User'} onLogout={logout} />
        ) : (
          <AuthNav
            onLoginClick={() => setOpenedModal('login')}
            onRegisterClick={() => setOpenedModal('register')}
          />
        )}
      </div>

      {openedModal === 'login' && (
        <Modal onClose={closeModal} width={566} title="Log In">
          <LoginForm onSuccess={closeModal} />
        </Modal>
      )}

      {openedModal === 'register' && (
        <Modal onClose={closeModal} width={566} title="Registration">
          <RegisterForm onSuccess={closeModal} />
        </Modal>
      )}
    </header>
  );
};
