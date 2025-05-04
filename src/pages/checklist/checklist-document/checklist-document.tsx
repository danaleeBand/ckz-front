import { useGetChecklistDetailQuery } from '@/api/queries/checklist';
import { ChecklistItem } from './checklist-item';
import { ChecklistHeader } from './checklist-header';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { ChecklistItemEditing } from './checklist-item-editing';
import { PlusIcon } from 'lucide-react';

export const ChecklistDocument = () => {
  const { checklistId } = useParams();

  const [newItem, setNewItem] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState(false);

  const { data: checklistDetail, refetch: refetchChecklistDetail } =
    useGetChecklistDetailQuery(Number(checklistId));

  const handleClickNewItem = () => {
    setNewItem(true);
    setIsHovered(false);
  };

  const handleClickOutside = () => {
    setNewItem(false);
    refetchChecklistDetail();
  };

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
        <div className='pt-20 w-full'>
          <span className='flex flex-col gap-4 text-4xl font-extrabold pb-8 pl-14'>
            <span>🗒️</span>
            <h1>{checklistDetail?.checklist.title}</h1>
          </span>
          <div className='flex flex-col gap-2 h-full'>
            {checklistDetail?.items?.map(item => {
              return <ChecklistItem key={item.id} {...item} />;
            })}
            {newItem && (
              <ChecklistItemEditing
                checklistId={Number(checklistId)}
                handleClickOutside={handleClickOutside}
              />
            )}
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className='flex w-full h-full justify-center items-start pl-14 pt-2'
            >
              {!newItem && isHovered && (
                <button
                  onClick={handleClickNewItem}
                  className='rounded-full bg-bg-dark hover:bg-bg-darker dark:bg-dark-bg-light hover:dark:bg-dark-bg-lighter p-2'
                >
                  <PlusIcon className='h-4 w-4 text-text-lighter dark:text-dark-text-dark' />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>체크리스트 데이터를 불러오는 중입니다.</div>
  );
};
