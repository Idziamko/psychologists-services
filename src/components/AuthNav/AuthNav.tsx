import styles from './AuthNav.module.css';

interface AuthNavProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export const AuthNav = ({ onLoginClick, onRegisterClick }: AuthNavProps) => (
  <div className={styles.group}>
    <button className={styles.login} type="button" onClick={onLoginClick}>
      Log In
    </button>
    <button
      className={styles.registration}
      type="button"
      onClick={onRegisterClick}
    >
      Registration
    </button>
  </div>
);
