import { useState } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { EyeIcon } from '../icons/EyeIcon';
import forms from '../../styles/forms.module.css';
import styles from './PasswordField.module.css';

interface PasswordFieldProps {
  register: UseFormRegisterReturn;
  error?: string;
}

export const PasswordField = ({ register, error }: PasswordFieldProps) => {
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
