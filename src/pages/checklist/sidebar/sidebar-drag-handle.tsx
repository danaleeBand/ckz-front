import { useCallback, useRef } from 'react';
import { useDrag } from 'react-dnd';

export const DragHandle = ({ onDrag }: { onDrag: (x: number) => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drag, preview] = useDrag({
    type: 'resize-sidebar',
    item: { type: 'resize-sidebar' },
  });
  preview(null);

  const handleDrag = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      onDrag(event.clientX);
    },
    [onDrag],
  );
  const handleMouseUp = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleMouseUp);
    },
    [handleDrag],
  );
  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [handleDrag, handleMouseUp],
  );
  drag(ref);

  return (
    <div
      ref={ref}
      onMouseDown={handleMouseDown}
      className='w-2 cursor-ew-resize right-0 absolute inset-y-0'
      style={{ userSelect: 'none' }}
    />
  );
};
