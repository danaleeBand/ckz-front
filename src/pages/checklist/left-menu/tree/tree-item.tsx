import { memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { NodeModel, useDragOver } from '@minoru/react-dnd-treeview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { TreeDataProps, getTreeItemId, getTreeItemType } from './util';

export type TreeItemProps = {
  node: NodeModel<TreeDataProps>;
  depth: number;
  isOpen: boolean;
  isSelected: boolean;
  onToggle: (id: NodeModel['id']) => void;
  onSelect: (id: string) => void;
};

export const TreeItem = memo(
  ({ node, depth, isOpen, isSelected, onToggle, onSelect }: TreeItemProps) => {
    const navigate = useNavigate();

    const handleOnClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (getTreeItemType(node.id as string) === 2) {
        onSelect(node.id as string);
        navigate(`/${getTreeItemId(node.id as string)}`);
      } else {
        onToggle(node.id as string);
      }
    };
    const dragOverProps = useDragOver(node.id, isOpen, onToggle);

    const customStyle = useMemo(() => {
      return `${getTreeItemType(node.id as string) === 2 ? 'px-7' : ''} ${
        isSelected
          ? 'bg-bg-darker dark:bg-dark-bg-lighter font-bold'
          : 'bg-bg-dark dark:bg-dark-bg-light hover:bg-grey-150 dark:hover:bg-grey-850'
      } ${depth === 0 ? 'ml-1' : depth === 1 ? 'ml-4' : depth === 2 ? 'ml-8' : ''}`;
    }, [depth, node.id, isSelected]);

    console.log(customStyle);
    return (
      <div
        className={`tree-node flex flex-row gap-1.5 items-center
      cursor-pointer py-1 px-2
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
        <div
          className={`text-basic text-text-light dark:text-dark-text-dark
          truncate w-full`}
        >
          {node.text}
        </div>
      </div>
    );
  },
);
