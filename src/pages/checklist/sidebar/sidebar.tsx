import { useRef, useState } from 'react';
import { TreeMenu } from './tree';
import { DragHandle } from './sidebar-drag-handle';
import { SidebarHeader } from './sidebar-header';

export const Sidebar = () => {
  const [width, setWidth] = useState(250);
  const ref = useRef<HTMLDivElement>(null);

  const handleDrag = (clientX: number) => {
    setWidth(Math.max(200, Math.min(800, clientX)));
  };

  return (
    <div
      ref={ref}
      className='flex flex-row min-w-72 relative bg-bg-dark dark:bg-dark-bg-light'
      style={{ width: `${width}px` }}
    >
      <div className='w-full h-full flex flex-col gap-1'>
        <SidebarHeader />
        <TreeMenu />
      </div>
      <DragHandle onDrag={handleDrag} />
    </div>
  );
};
