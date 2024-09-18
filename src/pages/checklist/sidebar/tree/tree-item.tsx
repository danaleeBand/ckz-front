import { memo, MouseEvent, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NodeModel, useDragOver } from '@minoru/react-dnd-treeview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faCaretRight,
  faFolderPlus,
  faPen,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { TreeDataProps } from '@/types';
import { getTreeItemId, getTreeItemType } from '@/utils';
import { useChecklistStore } from '@/stores';
import { deleteChecklist, deleteFolder } from '@/api';

export type TreeItemProps = {
  node: TreeDataProps;
  depth: number;
  isOpen: boolean;
  isSelected?: boolean;
  onToggle: (id: NodeModel['id']) => void;
  onNewItem?: (node: TreeDataProps, type: 'folder' | 'checklist') => void;
  onEditItem?: () => void;
  onDeleteItem?: () => void;
};

export const TreeItem = memo(
  ({
    node,
    depth,
    isOpen,
    isSelected,
    onToggle,
    onNewItem,
    onEditItem,
    onDeleteItem,
  }: TreeItemProps) => {
    const { setLastViewedChecklistId } = useChecklistStore();
    const navigate = useNavigate();
    const dragOverProps = useDragOver(node.id, isOpen, onToggle);
    const [isHovering, setIsHovering] = useState(false);

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

    const handleDeleteItem = useCallback(async () => {
      let response;
      const type = getTreeItemType(node.id as string);
      const nodeId = getTreeItemId(node.id as string);

      if (type === 2) {
        response = await deleteChecklist(nodeId, 1); // TODO: api 수정 예정
      } else if (type === 1) {
        // response = await deleteFolder(1, nodeId); // TODO: api 추가 예정
      }

      if (response?.success) {
        onDeleteItem?.();
      } else {
        alert('실패');
      }
    }, [node.id]);

    const getAddItemButton = useCallback((type: 'folder' | 'checklist') => {
      const itemName = type === 'folder' ? '폴더' : '체크리스트';

      const handleAddItem = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onNewItem?.(node, type);
      };

      return (
        <button aria-label={`${itemName} 생성`} onClick={handleAddItem}>
          <FontAwesomeIcon icon={type === 'folder' ? faFolderPlus : faPlus} />
        </button>
      );
    }, []);

    const customStyle = useMemo(() => {
      return `${getTreeItemType(node.id as string) === 2 ? 'pl-7' : ''} ${
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
          cursor-pointer py-1 px-2 mr-1 my-0.5
          rounded-md
          ${customStyle}`}
        onClick={handleOnClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        {...dragOverProps}
      >
        {node.droppable && (
          <button
            className={`w-4 h-4 flex justify-center items-center 
            text-xs text-text-light dark:text-dark-text-dark`}
          >
            {isOpen && <FontAwesomeIcon icon={faCaretDown} />}
            {!isOpen && <FontAwesomeIcon icon={faCaretRight} />}
          </button>
        )}
        <div className='text-basic truncate w-full'>{node.text}</div>
        {isHovering && (
          <div className='flex justify-center items-center gap-2 mr-1 text-xs text-text-light dark:text-dark-text-dark hover:text-text-basic dark:hover:text-text-basic'>
            {getTreeItemType(node.id as string) !== 2 && (
              <>
                {!depth && getAddItemButton('folder')}
                {getAddItemButton('checklist')}
              </>
            )}
            {getTreeItemType(node.id as string) !== 0 && (
              <>
                <button
                  aria-label='이름 변경'
                  onClick={(event: MouseEvent<HTMLButtonElement>) => {
                    event.stopPropagation();
                    onEditItem?.();
                  }}
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button
                  aria-label='항목 삭제'
                  onClick={(event: MouseEvent<HTMLButtonElement>) => {
                    event.stopPropagation();
                    handleDeleteItem();
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    );
  },
);
