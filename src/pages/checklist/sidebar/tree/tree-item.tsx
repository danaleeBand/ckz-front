import { memo, MouseEvent, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NodeModel, useDragOver } from '@minoru/react-dnd-treeview';
import { useQueryClient } from '@tanstack/react-query';
import { TreeDataProps } from '@/types';
import { getTreeItemId, getTreeItemType } from '@/utils';
import { useChecklistStore } from '@/stores';
import { SidebarQueryKeys, useDeleteSidebarItemMutation } from '@/api';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FolderPlusIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from 'lucide-react';

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
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const dragOverProps = useDragOver(node.id, isOpen, onToggle);

    const { setLastViewedChecklistId } = useChecklistStore();
    const { mutate: deleteMutation } = useDeleteSidebarItemMutation();

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
      const isDeleteConfirmed = window.confirm('정말 삭제하시겠습니까?');
      if (!isDeleteConfirmed) {
        return;
      }
      const type = getTreeItemType(node.id as string);
      const nodeId = getTreeItemId(node.id as string);
      deleteMutation(
        { id: nodeId, type: type === 2 ? 'checklist' : 'folder' },
        {
          onSuccess: () => {
            onDeleteItem?.();
            queryClient.invalidateQueries({
              queryKey: [SidebarQueryKeys.root],
            });
          },
          onError: () => alert('실패'),
        },
      );
    }, [node.id]);

    const getAddItemButton = useCallback((type: 'folder' | 'checklist') => {
      const itemName = type === 'folder' ? '폴더' : '체크리스트';

      const handleAddItem = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onNewItem?.(node, type);
      };

      return (
        <button aria-label={`${itemName} 생성`} onClick={handleAddItem}>
          {type === 'folder' ? (
            <FolderPlusIcon className='w-3.5 h-3.5' />
          ) : (
            <PlusIcon className='w-3.5 h-3.5' />
          )}
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
            {isOpen && <ChevronDownIcon className='w-3.5 h-3.5' />}
            {!isOpen && <ChevronRightIcon className='w-3.5 h-3.5' />}
          </button>
        )}
        <div className='text-basic truncate w-full'>{node.text}</div>
        {isHovering && (
          <div
            className='flex justify-center items-center gap-2 mr-1 text-xs
            text-text-light dark:text-dark-text-dark
            hover:text-text-basic dark:hover:text-text-basic'
          >
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
                  <PencilIcon className='w-3.5 h-3.5' />
                </button>
                <button
                  aria-label='항목 삭제'
                  onClick={(event: MouseEvent<HTMLButtonElement>) => {
                    event.stopPropagation();
                    handleDeleteItem();
                  }}
                >
                  <TrashIcon className='w-3.5 h-3.5' />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    );
  },
);
