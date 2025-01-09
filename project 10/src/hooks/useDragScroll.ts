import { useCallback, useRef } from 'react';

export const useDragScroll = () => {
  const isDragging = useRef(false);
  const startY = useRef(0);
  const scrollTop = useRef(0);

  const onMouseDown = useCallback((e: React.MouseEvent | TouchEvent) => {
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    isDragging.current = true;
    startY.current = clientY;
    scrollTop.current = window.scrollY;

    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;
      
      const clientY = 'touches' in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
      const delta = startY.current - clientY;
      window.scrollTo({
        top: scrollTop.current + delta,
        behavior: 'auto'
      });
    };

    const onMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchmove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchend', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchend', onMouseUp);
  }, []);

  return { onMouseDown };
};