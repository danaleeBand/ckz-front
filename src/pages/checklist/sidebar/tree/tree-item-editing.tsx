import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { TreeDataProps } from '@/types';
import { getTreeItemId, getTreeItemType } from '@/utils';
import { patchChecklist, patchFolder } from '@/api';

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
  const ref = useRef<HTMLInputElement>(null);
  const [itemName, setItemName] = useState<string>(node.text);

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
    let response;

    const nodeType = getTreeItemType(node.id);
    const id = getTreeItemId(node.id);
    const name = ref.current?.value;

    if (!name) {
      onEndEdit();
      return;
    }

    if (nodeType === 2) {
      response = await patchChecklist(id, name, 1); // TODO: api 변경 대응
    } else if (nodeType === 1) {
      response = await patchFolder(1, id, name);
    }
    // TODO: workspace 이름 변경

    if (response?.success) {
      onEndEdit(name);
    } else {
      onEndEdit();
    }
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
