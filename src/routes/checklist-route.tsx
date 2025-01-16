import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChecklistStore } from '@/stores';
import { getTreeItemId } from '@/utils';
import { useSidebarQuery } from '@/api';

export const ChecklistRoute = () => {
  const navigate = useNavigate();
  const { lastViewedChecklistId } = useChecklistStore();
  const { data: initTreeData, isPending, isSuccess } = useSidebarQuery(true);

  const getLastViewedChecklistId = async () => {
    if (isSuccess) {
      let checkListId;
      const checklists = initTreeData
        .filter(item => item.data.type === 2)
        .map(item => getTreeItemId(item.id));

      if (lastViewedChecklistId && checklists.includes(lastViewedChecklistId)) {
        checkListId = lastViewedChecklistId;
      } else {
        [checkListId] = checklists;
      }
      navigate(`/${checkListId}`);
    } else {
      alert('get tree error');
    }
  };

  useEffect(() => {
    if (isPending) return;
    getLastViewedChecklistId();
  }, [isSuccess, isPending]);

  return null;
};
