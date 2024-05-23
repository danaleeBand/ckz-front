import { useRef, useState } from 'react';
import { TreeMenu } from './tree';
import { DragHandle } from './sidebar-drag-handle';
import { SidebarHeader } from './sidebar-header';

export const Sidebar = () => {
  const [width, setWidth] = useState(250);
  const ref = useRef<HTMLDivElement>(null);

  const handleDrag = (clientX: number) => {
    setWidth(Math.max(175, Math.min(800, clientX)));
  };

  return (
    <div
      ref={ref}
      className='flex flex-row relative bg-bg-dark dark:bg-dark-bg-light'
      style={{ width: `${width}px` }}
    >
      <div className='w-full gap-1'>
        <SidebarHeader width={width} />
        <TreeMenu />
      </div>
      <DragHandle onDrag={handleDrag} />
    </div>
  );
};
