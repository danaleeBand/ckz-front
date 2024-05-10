import { useRef, useState } from 'react';
import { TreeMenu } from './tree';
import { DragHandle } from './sidebar-drag-handle';

export const Sidebar = () => {
  const [width, setWidth] = useState(250);
  const ref = useRef<HTMLDivElement>(null);

  const handleDrag = (clientX: number) => {
    setWidth(Math.max(120, Math.min(600, clientX)));
  };

  return (
    <div
      ref={ref}
      className='flex flex-row relative'
      style={{ width: `${width}px` }}
    >
      <TreeMenu />
      <DragHandle onDrag={handleDrag} />
    </div>
  );
};
