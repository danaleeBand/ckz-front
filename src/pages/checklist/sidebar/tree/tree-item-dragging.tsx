import { memo } from 'react';
import { DragLayerMonitorProps } from '@minoru/react-dnd-treeview';
import { TreeDataDetailProps } from '@/types';

export type DragItemProps = {
  monitorProps: DragLayerMonitorProps<TreeDataDetailProps>;
};

export const TreeItemDragPreview = memo(({ monitorProps }: DragItemProps) => {
  const { item } = monitorProps;

  const customStyle = `
    w-40 py-1 px-2
    rounded-md
    text-basic truncate font-bold
    text-text-primary dark:text-dark-text-primary 
    bg-bg-dark dark:bg-dark-bg-light
    border-2 border-border-primary dark:border-dark-border-primary
    shadow-lg
  `;

  return <div className={customStyle}>{item.text}</div>;
});
