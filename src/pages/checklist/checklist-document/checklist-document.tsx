import { useParams } from 'react-router-dom';
import { useGetChecklistItemsQuery } from '@/api/queries/checklist';
import { ChecklistItem } from './checklist-item';
import { ChecklistHeader } from './checklist-header';

export const ChecklistDocument = () => {
  // const { checklistId } = useParams().checklistId;

  const { data: checklistItems } = useGetChecklistItemsQuery(42);
  // TODO: 백엔드에서 받아오기
  const title = '제목없음';
  const workspaceName = '기본 워크스페이스';
  const folderName = '기본 폴더';
  const isDefault = true;

  return (
    <div className='flex flex-col w-full h-full'>
      <ChecklistHeader />

      <div className='flex flex-1 pl-40 pr-48'>
        <div className='flex flex-col flex-1 gap-2 pt-20'>
          <span className='flex flex-col gap-4 text-4xl font-extrabold pb-8 pl-14'>
            <span>🗒️</span>
            <h1>{title}</h1>
          </span>
          {checklistItems?.map(item => {
            return <ChecklistItem key={item.id} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
};
