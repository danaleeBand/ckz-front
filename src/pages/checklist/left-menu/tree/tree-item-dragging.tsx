import { memo } from 'react';
import { DragLayerMonitorProps } from '@minoru/react-dnd-treeview';
import { TreeDataProps } from '@/types';

export type DragItemProps = {
  monitorProps: DragLayerMonitorProps<TreeDataProps>;
};

export const TreeItemDragPreview = memo(({ monitorProps }: DragItemProps) => {
  const { item } = monitorProps;

  const customStyle = `
    w-40 py-1 px-2
    rounded-md
    text-basic text-text-light dark:text-dark-text-dark
    truncate 
    bg-bg-darker dark:bg-dark-bg-lighter
    opacity-50
  `;

  return <div className={customStyle}>{item.text}</div>;
});
