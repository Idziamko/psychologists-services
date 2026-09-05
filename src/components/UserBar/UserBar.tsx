import { UserIcon } from '../icons/UserIcon';
import styles from './UserBar.module.css';

interface UserBarProps {
  name: string;
  onLogout: () => void;
}

export const UserBar = ({ name, onLogout }: UserBarProps) => (
  <div className={styles.bar}>
    <div className={styles.user}>
      <span className={styles.avatar}>
        <UserIcon />
      </span>
      <span className={styles.name}>{name}</span>
    </div>
    <button className={styles.logout} type="button" onClick={onLogout}>
      Log out
    </button>
  </div>
);
