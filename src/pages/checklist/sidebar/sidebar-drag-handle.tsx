import { useRef } from 'react';
import { useDrag } from 'react-dnd';

export const DragHandle = ({ onDrag }: { onDrag: (x: number) => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drag] = useDrag({
    type: 'resize-sidebar',
    item: { type: 'resize-sidebar' },
  });
  drag(ref);

  const handleDrag = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onDrag(event.clientX);
  };
  const handleMouseUp = (event: MouseEvent) => {
    event.stopPropagation();
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleMouseUp);
  };
  const handleMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={ref}
      onMouseDown={handleMouseDown}
      className='w-2 cursor-ew-resize right-0 absolute inset-y-0'
    />
  );
};
