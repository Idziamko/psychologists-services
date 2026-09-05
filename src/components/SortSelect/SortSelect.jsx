import { useCallback, useRef, useState } from 'react';
import { ChevronIcon } from '../icons/ChevronIcon';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { SORT_OPTIONS } from '../../services/psychologistsApi';
import styles from './SortSelect.module.css';

export const SortSelect = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const close = useCallback(() => setIsOpen(false), []);
  useOutsideClick(wrapperRef, isOpen, close);

  const selected = SORT_OPTIONS.find(option => option.value === value);

  const handleSelect = optionValue => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <span className={styles.label} id="sort-label">
        Filters
      </span>
      <button
        className={styles.control}
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="sort-label"
      >
        {selected?.label}
        <ChevronIcon
          className={isOpen ? `${styles.icon} ${styles.rotated}` : styles.icon}
        />
      </button>

      {isOpen && (
        <ul className={styles.list} role="listbox">
          {SORT_OPTIONS.map(option => (
            <li key={option.value}>
              <button
                className={
                  option.value === value
                    ? `${styles.option} ${styles.selected}`
                    : styles.option
                }
                type="button"
                role="option"
                aria-selected={option.value === value}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
