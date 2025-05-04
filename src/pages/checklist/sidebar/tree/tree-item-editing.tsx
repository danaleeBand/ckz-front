import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { TreeDataProps } from '@/types';
import { getTreeItemId, getTreeItemType } from '@/utils';
import { SidebarQueryKeys, useEditSidebarItemMutation } from '@/api';
import { ChecklistQueryKeys } from '@/api/queries/checklist';

export type TreeItemEditingProps = {
  node: TreeDataProps;
  depth: number;
  onEndEdit: (itemName?: string) => void;
};

export const TreeItemEditing = ({
  node,
  depth,
  onEndEdit,
}: TreeItemEditingProps) => {
  const queryClient = useQueryClient();
  const { mutate } = useEditSidebarItemMutation();
  const [itemName, setItemName] = useState<string>(node.text);
  const ref = useRef<HTMLInputElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      handleEndEdit();
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleEndEdit();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setItemName(event.target.value);
  };

  const handleEndEdit = async () => {
    const nodeType = getTreeItemType(node.id);
    const id = getTreeItemId(node.id);
    const name = ref.current?.value?.trim();

    if (!name) {
      onEndEdit();
      return;
    }

    mutate(
      { id, name, type: nodeType === 2 ? 'checklist' : 'folder' },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [SidebarQueryKeys.root] });
          queryClient.invalidateQueries({
            queryKey: [ChecklistQueryKeys.root],
          });
          onEndEdit(name);
        },
        onError: () => onEndEdit(),
      },
    );
  };

  useEffect(() => {
    ref.current?.select();
  }, [ref]);

  const customStyle = useMemo(() => {
    return `${depth === 1 ? 'ml-4' : depth === 2 ? 'ml-8' : ''}`;
  }, [depth]);

  return (
    <div
      className={`tree-node flex items-center
          mr-1 my-0.5 pl-5 pr-1 py-0.5 rounded-md ${customStyle}`}
    >
      <input
        value={itemName}
        onChange={handleChange}
        className='flex flex-1 bg-transparent text-basic px-2 py-0.5 text-text-light dark:text-dark-text-dark'
        ref={ref}
      />
    </div>
  );
};
