import { useAddChecklistItemMutation } from '@/api/queries/checklist';
import {
  useRef,
  useEffect,
  useState,
  ChangeEvent,
  useCallback,
  KeyboardEvent,
} from 'react';

type ChecklistItemEditingProps = {
  checklistId: number;
  handleClickOutside: () => void;
};

export const ChecklistItemEditing = ({
  checklistId,
  handleClickOutside,
}: ChecklistItemEditingProps) => {
  const [checklistTitle, setChecklistTitle] = useState<string>('');

  const editingRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: updateChecklistTitle } = useAddChecklistItemMutation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecklistTitle(event.target.value);
  };

  const handleEndEditing = useCallback(() => {
    if (checklistTitle.trim() !== '') {
      updateChecklistTitle(
        {
          checklistId,
          title: checklistTitle,
        },
        {
          onSuccess: () => {
            setChecklistTitle('');
            handleClickOutside();
          },
        },
      );
    } else {
      handleClickOutside();
    }
  }, [checklistTitle, checklistId, handleClickOutside]);

  useEffect(() => {
    const handleClickEvent = (event: MouseEvent) => {
      if (
        editingRef.current &&
        !editingRef.current.contains(event.target as Node)
      ) {
        handleEndEditing();
      }
    };
    document.addEventListener('mousedown', handleClickEvent);
    return () => {
      document.removeEventListener('mousedown', handleClickEvent);
    };
  }, [handleEndEditing]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleEndEditing();
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className='flex shrink-0 justify-start items-center ml-14 pl-12 pr-12 h-10 
        bg-bg-dark dark:bg-dark-bg-light border-none rounded-md'
      ref={editingRef}
    >
      <input
        value={checklistTitle}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder='체크리스트 제목을 입력해주세요.'
        className='flex flex-1 bg-transparent text-basic px-2 py-0.5 h-8
          text-text-light dark:text-dark-text-dark text-base'
        ref={inputRef}
      />
    </div>
  );
};
