import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChecklistStore } from '@/stores';
import { useAxios } from '@/hooks';
import { formatTreeData, getTreeItemId } from '@/utils';
import { apiDataExample } from '@/pages';

export const ChecklistRoute = () => {
  const { response, error, status } = useAxios(
    {
      url: '/sidebar/tree',
      method: 'GET',
    },
    true,
  );
  const navigate = useNavigate();
  const { lastViewedChecklistId } = useChecklistStore();

  useEffect(() => {
    if (status === 'error' && error) {
      // navigate('/'); // TODO: 에러 핸들링, navigate, 아래 코드 삭제
      let checkListId;
      const initTreeData = formatTreeData(apiDataExample);
      const checklists = initTreeData
        .filter(item => item.type === 2)
        .map(item => getTreeItemId(item.id));

      if (lastViewedChecklistId && checklists.includes(lastViewedChecklistId)) {
        checkListId = lastViewedChecklistId;
      } else {
        [checkListId] = checklists;
      }
      navigate(`/${checkListId}`);
    }
    if (status === 'success' && response) {
      let checkListId;
      const initTreeData = formatTreeData(response);
      const checklists = initTreeData
        .filter(item => item.type === 2)
        .map(item => getTreeItemId(item.id));

      if (lastViewedChecklistId && checklists.includes(lastViewedChecklistId)) {
        checkListId = lastViewedChecklistId;
      } else {
        [checkListId] = checklists;
      }
      navigate(`/${checkListId}`);
    }
  }, [error, response, status]);

  return null;
};
