import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChecklistStore } from '@/stores';
import { formatTreeData, getTreeItemId } from '@/utils';
import { getSidebarTree, TreeApiResponseType } from '@/api';

export const ChecklistRoute = () => {
  const navigate = useNavigate();
  const { lastViewedChecklistId } = useChecklistStore();

  const getLastViewedChecklistId = async () => {
    const response = await getSidebarTree();

    if (response.success) {
      let checkListId;
      const initTreeData = formatTreeData(response as TreeApiResponseType);
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
    getLastViewedChecklistId();
  }, []);

  return null;
};
