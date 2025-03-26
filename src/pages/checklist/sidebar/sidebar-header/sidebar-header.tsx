import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Avatar, Dropdown, DropdownItemProps, Tooltip } from '@/components/ui';
import { useUserStore } from '@/stores';
import { logout } from '@/utils';

export type SidebarHeaderProps = {
  width: number;
};

export const SidebarHeader = ({ width }: SidebarHeaderProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const { name, profileImageUrl } = useUserStore();

  const dropdownItems: Array<DropdownItemProps> = useMemo(() => {
    return [
      {
        name: '개인정보 변경',
        id: 1,
        onClick: () => {
          alert('todo');
        },
      },
      {
        name: '로그아웃',
        id: 2,
        onClick: async () => {
          await logout();
          navigate('/login');
        },
      },
    ];
  }, []);

  const actionIconStyle = `p-0.5 rounded-sm hover:bg-grey-150 cursor-pointer focus:outline-none 
    hover:text-text-primary-dark dark:hover:text-dark-text-primary-light`;

  return (
    <>
      <div
        className='h-8 flex flex-row items-center py-1 px-1 mx-1 mt-2 mb-1.5 gap-2
        hover:bg-bg-darker dark:hover:bg-bg-darker rounded-md'
      >
        <Avatar imageUrl={profileImageUrl ?? ''} className='w-6 h-6' />
        <p className='font-bold text-base text-text-light dark:text-dark-text-dark'>
          {name}의 체크리스트
        </p>
        <div
          className='flex flex-row gap-1 items-center ml-auto mr-2 
            text-text-lighter dark:text-dark-text-darker text-base'
        >
          <FontAwesomeIcon
            icon={faUserPlus}
            data-tooltip-id='new-checklist'
            data-tooltip-content='공유 워크스페이스 추가'
            className={actionIconStyle}
          />
          <FontAwesomeIcon
            icon={faGear}
            data-tooltip-id='setting'
            data-tooltip-content='계정 설정'
            className={actionIconStyle}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
        </div>
        <Tooltip id='new-checklist' />
        {!isDropdownOpen && <Tooltip id='setting' />}
      </div>
      {isDropdownOpen && (
        <Dropdown
          items={dropdownItems}
          isOpen={isDropdownOpen}
          setIsOpen={setIsDropdownOpen}
        />
      )}
    </>
  );
};
