import { useCallback, useState } from 'react';
import { ChecklistItemType } from '@/api';
import { Checkbox } from '@/components/ui';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  GripVerticalIcon,
  PlusIcon,
} from 'lucide-react';

export const ChecklistItem = ({
  id,
  title,
  memo,
  isChecked = false,
}: ChecklistItemType) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleClickItem = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCheckItem = useCallback((checked: boolean) => {
    // api 호출
  }, []);

  const checklistItemStyle = `flex flex-1 flex-row pt-1.5 pb-1.5 pl-5 pr-6 gap-4 border-none ${
    isHovered
      ? 'bg-bg-darker dark:bg-dark-bg-lighter'
      : 'bg-bg-dark dark:bg-dark-bg-light'
  } rounded-md`;

  return (
    <div
      className='flex'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 옵션 메뉴 버튼 영역 */}
      <div className='flex h-10 w-14 pr-2 justify-end items-center self-start'>
        {isHovered && (
          <div className='flex justify-center items-center'>
            <button className='p-1 rounded-full hover:bg-grey-50 cursor-pointer focus:outline-none'>
              <PlusIcon className='h-4 w-4 text-text-lighter' />
            </button>
            <button className='p-1 rounded-full hover:bg-grey-50 cursor-pointer focus:outline-none'>
              <GripVerticalIcon className='h-4 w-4 text-text-lighter' />
            </button>
          </div>
        )}
      </div>

      {/* 체크리스트 아이템 영역 */}
      <div
        role='button'
        tabIndex={0}
        onClick={handleClickItem}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClickItem();
          }
        }}
        className={checklistItemStyle}
      >
        <div
          className='flex justify-center items-center h-7'
          onClick={e => e.stopPropagation()}
        >
          <Checkbox
            defaultChecked={isChecked}
            onCheckedChange={handleCheckItem}
            className='w-4 h-4'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <p className='flex justify-left items-center h-7 font-semibold text-sm text-text-basic'>
            {title}
          </p>
          {isExpanded && memo && (
            <p className='pb-1 text-xs text-text-light dark:text-dark-text-dark'>
              {memo}
            </p>
          )}
        </div>

        {/* 체크리스트 아이템 접기 & 열기 버튼 영역 */}
        {memo && (
          <div className='flex flex-1 h-7 justify-end items-center self-start'>
            <button className='p-1 rounded-full focus:outline-none'>
              {isExpanded ? (
                <ChevronUpIcon className='h-3 text-text-lighter' />
              ) : (
                <ChevronDownIcon className='h-3 text-text-lighter' />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
