import { useEffect } from 'react';

export const useOutsideClick = (elementRef, isActive, onOutsideClick) => {
  useEffect(() => {
    if (!isActive) {
      return;
    }

    const handlePointerDown = event => {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        onOutsideClick();
      }
    };

    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onOutsideClick();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [elementRef, isActive, onOutsideClick]);
};
