import { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { ChecklistItemType } from '@/api';
import { Checkbox } from '@/components/ui';

export const ChecklistItem = ({
  id,
  title,
  memo,
  isChecked = false,
}: ChecklistItemType) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleClickItem = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCheckItem = useCallback((checked: boolean) => {
    // api 호출
  }, []);

  return (
    <div className='flex'>
      <div className='flex h-10 w-14 justify-center items-center self-start'>
        우잉
      </div>
      <div
        {...(memo && {
          role: 'button',
          tabIndex: 0,
          onClick: handleClickItem,
          onKeyDown: e => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleClickItem();
            }
          },
        })}
        className='flex flex-1 flex-row pt-1.5 pb-1.5 pl-5 pr-6 gap-4 bg-bg-dark rounded-md'
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
          <p className='flex justify-center items-center h-7 font-semibold text-sm text-text-basic'>
            {title}
          </p>
          {isExpanded && memo && (
            <p className='pb-1 text-xs text-text-light'>{memo}</p>
          )}
        </div>

        {memo && (
          <div className='flex flex-1 h-7 justify-end items-center self-start'>
            <FontAwesomeIcon
              icon={isExpanded ? faChevronUp : faChevronDown}
              className='h-3 text-text-lighter'
            />
          </div>
        )}
      </div>
    </div>
  );
};
