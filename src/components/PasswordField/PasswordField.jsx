import { useState } from 'react';
import { EyeIcon } from '../icons/EyeIcon';
import forms from '../../styles/forms.module.css';
import styles from './PasswordField.module.css';

export const PasswordField = ({ register, error }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={forms.field}>
      <input
        className={`${forms.input} ${styles.input} ${error ? forms.invalid : ''}`}
        type={isVisible ? 'text' : 'password'}
        placeholder="Password"
        autoComplete="current-password"
        {...register}
      />
      <button
        className={styles.toggle}
        type="button"
        onClick={() => setIsVisible(prev => !prev)}
        aria-label={isVisible ? 'Hide password' : 'Show password'}
      >
        <EyeIcon isVisible={isVisible} />
      </button>
      {error && <span className={forms.error}>{error}</span>}
    </div>
  );
};
