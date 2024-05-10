import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Avatar, Tooltip } from '@/components/ui';
import { useUserStore } from '@/stores';

export const SidebarHeader = () => {
  const { name, profileImageUrl } = useUserStore();

  const actionIconStyle =
    'p-0.5 rounded-sm hover:bg-grey-150 cursor-pointer focus:outline-none';

  return (
    <div
      className='flex flex-row items-center py-1 px-1 mx-1 mt-2 gap-2
        hover:bg-bg-darker dark:hover:bg-bg-darker rounded-md'
    >
      <Avatar imageUrl={profileImageUrl ?? ''} className='w-6 h-6' />
      <p className='font-bold text-sm text-text-light dark:text-dark-text-dark'>
        {name}의 체크리스트
      </p>
      <div className='flex flex-row gap-1 items-center ml-auto mr-2 text-text-lighter dark:text-dark-text-darker text-sm'>
        <FontAwesomeIcon
          icon={faPenToSquare}
          data-tooltip-id='new-checklist'
          data-tooltip-content='체크리스트 작성'
          className={actionIconStyle}
        />
        <FontAwesomeIcon
          icon={faGear}
          data-tooltip-id='setting'
          data-tooltip-content='계정 설정'
          className={actionIconStyle}
        />
      </div>
      <Tooltip id='setting' />
      <Tooltip id='new-checklist' />
    </div>
  );
};
