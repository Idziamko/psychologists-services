import { useCallback, useRef, useState } from 'react';
import { ClockIcon } from '../icons/ClockIcon';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import forms from '../../styles/forms.module.css';
import styles from './TimeSelect.module.css';

const MEETING_TIMES = Array.from({ length: 20 }, (_, index) => {
  const totalMinutes = 9 * 60 + index * 30;
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
  const minutes = String(totalMinutes % 60).padStart(2, '0');
  return `${hours}:${minutes}`;
});

interface TimeSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const TimeSelect = ({ value, onChange, error }: TimeSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setIsOpen(false), []);
  useOutsideClick(wrapperRef, isOpen, close);

  const handleSelect = (time: string) => {
    onChange(time);
    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        className={`${forms.input} ${styles.control} ${error ? forms.invalid : ''}`}
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={value ? styles.value : styles.placeholder}>
          {value || '00:00'}
        </span>
        <ClockIcon className={styles.icon} />
      </button>

      {isOpen && (
        <div className={styles.panel}>
          <p className={styles.panelTitle}>Meeting time</p>
          <ul className={styles.list} role="listbox">
            {MEETING_TIMES.map(time => (
              <li key={time}>
                <button
                  className={
                    time === value
                      ? `${styles.option} ${styles.selected}`
                      : styles.option
                  }
                  type="button"
                  role="option"
                  aria-selected={time === value}
                  onClick={() => handleSelect(time)}
                >
                  {time}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <span className={forms.error}>{error}</span>}
    </div>
  );
};
