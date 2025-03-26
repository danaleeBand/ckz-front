import { useGetChecklistDetailQuery } from '@/api/queries/checklist';
import { ChecklistItem } from './checklist-item';
import { ChecklistHeader } from './checklist-header';
import { useParams } from 'react-router-dom';

export const ChecklistDocument = () => {
  const { checklistId } = useParams();

  const { data: checklistDetail } = useGetChecklistDetailQuery(
    Number(checklistId),
  );

  return checklistDetail ? (
    <div className='flex flex-col w-full h-full'>
      <ChecklistHeader
        title={checklistDetail.checklist.title}
        workspaceName={checklistDetail.workspace.name}
        folderName={checklistDetail.folder.name}
        isDefault={checklistDetail.folder.isDefault}
        lastEdited={checklistDetail.checklist.updatedAt}
        lastEditedBy={checklistDetail.checklist.updatedBy?.name}
      />
      <div className='flex flex-1 pl-40 pr-48'>
        <div className='flex flex-col flex-1 gap-2 pt-20'>
          <span className='flex flex-col gap-4 text-4xl font-extrabold pb-8 pl-14'>
            <span>🗒️</span>
            <h1>{checklistDetail?.checklist.title}</h1>
          </span>
          {checklistDetail?.items?.map(item => {
            return <ChecklistItem key={item.id} {...item} />;
          })}
        </div>
      </div>
    </div>
  ) : (
    <div>체크리스트 데이터를 불러오는 중입니다.</div>
  );
};
