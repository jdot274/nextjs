import React, { useState, useRef, useEffect } from 'react';
import { useDevMode } from '../contexts/DevModeContext';
import { useLayout } from '../contexts/LayoutContext';
import { cn } from '@/lib/utils';

interface DraggableElementProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const DraggableElement: React.FC<DraggableElementProps> = ({ id, children, className }) => {
  const { isDevMode } = useDevMode();
  const { layouts, savedLayouts, updateLayout, isDragging, setIsDragging } = useLayout();
  const elementRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDraggingThis, setIsDraggingThis] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const elementStartPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Use saved layouts when not in dev mode
    if (!isDevMode && savedLayouts[id]) {
      setPosition(savedLayouts[id]);
    } else if (layouts[id]) {
      setPosition(layouts[id]);
    }
  }, [layouts, savedLayouts, id, isDevMode]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isDevMode) return;
    
    e.preventDefault();
    setIsDraggingThis(true);
    setIsDragging(true);
    
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    elementStartPos.current = position;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingThis) return;

    const dx = e.clientX - dragStartPos.current.x;
    const dy = e.clientY - dragStartPos.current.y;

    const newPosition = {
      x: elementStartPos.current.x + dx,
      y: elementStartPos.current.y + dy
    };

    setPosition(newPosition);
    updateLayout(id, newPosition);
  };

  const handleMouseUp = () => {
    if (isDraggingThis) {
      setIsDraggingThis(false);
      setIsDragging(false);
    }
  };

  useEffect(() => {
    if (isDevMode) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDevMode, isDraggingThis]);

  return (
    <div
      ref={elementRef}
      className={cn(
        className,
        isDevMode && 'cursor-move hover:outline hover:outline-2 hover:outline-blue-500/50',
        isDraggingThis && 'opacity-50'
      )}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isDraggingThis ? 'none' : 'transform 0.2s',
        position: 'relative',
        zIndex: isDraggingThis ? 100 : undefined
      }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
}

export default DraggableElement;