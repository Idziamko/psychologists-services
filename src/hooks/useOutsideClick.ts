import { useEffect, type RefObject } from 'react';

export const useOutsideClick = (
  elementRef: RefObject<HTMLElement | null>,
  isActive: boolean,
  onOutsideClick: () => void
) => {
  useEffect(() => {
    if (!isActive) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (
        elementRef.current &&
        !elementRef.current.contains(event.target as Node)
      ) {
        onOutsideClick();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
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
