import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '../icons/CloseIcon';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, onClose, width = 566, title }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    document.body.classList.add('is-locked');
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('is-locked');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div
        className={styles.modal}
        style={{ maxWidth: `${width}px` }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <button
          className={styles.close}
          type="button"
          onClick={onClose}
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
