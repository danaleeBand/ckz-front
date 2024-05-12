import { memo, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { NodeModel, useDragOver } from '@minoru/react-dnd-treeview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { TreeDataProps } from '@/types';
import { getTreeItemId, getTreeItemType } from '@/utils';
import { useChecklistStore } from '@/stores';

export type TreeItemProps = {
  node: NodeModel<TreeDataProps>;
  depth: number;
  isOpen: boolean;
  isSelected: boolean;
  onToggle: (id: NodeModel['id']) => void;
};

export const TreeItem = memo(
  ({ node, depth, isOpen, isSelected, onToggle }: TreeItemProps) => {
    const { setLastViewedChecklistId } = useChecklistStore();
    const navigate = useNavigate();
    const dragOverProps = useDragOver(node.id, isOpen, onToggle);

    const handleOnClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (getTreeItemType(node.id as string) === 2) {
          setLastViewedChecklistId(getTreeItemId(node.id as string));
          navigate(`/${getTreeItemId(node.id as string)}`);
        } else {
          onToggle(node.id as string);
        }
      },
      [node.id, onToggle],
    );

    const customStyle = useMemo(() => {
      return `${getTreeItemType(node.id as string) === 2 ? 'px-7' : ''} ${
        isSelected
          ? `bg-bg-darker dark:bg-dark-bg-lighter font-bold 
              text-text-primary dark:text-dark-text-primary`
          : `bg-bg-dark dark:bg-dark-bg-light hover:bg-grey-150 dark:hover:bg-grey-850 
              text-text-light dark:text-dark-text-dark`
      } ${depth === 0 ? 'ml-1' : depth === 1 ? 'ml-4' : depth === 2 ? 'ml-8' : ''}`;
    }, [depth, node.id, isSelected]);

    return (
      <div
        className={`tree-node flex flex-row gap-1.5 items-center
          cursor-pointer py-1 px-2 mr-1 my-1
          rounded-md
          ${customStyle}`}
        onClick={handleOnClick}
        {...dragOverProps}
      >
        {node.droppable && (
          <div
            className={`w-4 h-4 flex justify-center items-center 
            text-xs text-text-light dark:text-dark-text-dark`}
          >
            {isOpen && <FontAwesomeIcon icon={faCaretDown} />}
            {!isOpen && <FontAwesomeIcon icon={faCaretRight} />}
          </div>
        )}
        <div className='text-basic truncate w-full'>{node.text}</div>
      </div>
    );
  },
);
