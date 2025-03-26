import { ChevronRightIcon, EllipsisIcon } from 'lucide-react';
import { getRelativeTimeString } from '@/utils';

export type ChecklistHeaderProps = { hi: 'hid' };

export const ChecklistHeader = () => {
  // TODO: props로 받아오기
  const title = '제목없음';
  const workspaceName = '기본 워크스페이스';
  const folderName = '기본 폴더';
  const isDefault = true;
  // const lastEdited = time('2025-03-26 12:00:00');
  const lastEdited = new Date('2025-03-26 17:00:00');
  const lastEditedBy = '홍길동';

  return (
    <div className='h-12 pt-5 pl-10 pr-16 text-xs'>
      <div className='flex justify-between items-center'>
        {/* breadcrumb 영역 */}
        <div className='flex justify-center items-center gap-0.5'>
          <div className=''>{workspaceName}</div>
          <ChevronRightIcon className='w-4 h-4' />
          {isDefault && (
            <div className='flex justify-center items-center gap-0.5'>
              <div className=''>{folderName}</div>
              <ChevronRightIcon className='w-4 h-4' />
            </div>
          )}
          <div className=''>{title}</div>
        </div>

        <div className='flex justify-center items-center gap-1'>
          {/* 마지막 편집 정보 */}
          <span className='text-text-light dark:text-dark-text-dark'>
            {lastEditedBy}, 마지막 편집 {getRelativeTimeString(lastEdited)}
          </span>
          {/* 옵션 메뉴 버튼 */}
          <button className='p-1 rounded-full hover:bg-grey-50 cursor-pointer focus:outline-none'>
            <EllipsisIcon className='w-4 h-4 text-text-light dark:text-dark-text-dark' />
          </button>
        </div>
      </div>
    </div>
  );
};
