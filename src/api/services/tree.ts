import { TreeWorkSpaceItemType } from '@/types';
import apiRequest from '../api';
import { apiRoutes } from '@/constants/api';

export type TreeApiResponseType = {
  data: {
    workspaces: Array<TreeWorkSpaceItemType>;
  };
};

export const getSidebarTree = async () => {
  return apiRequest(apiRoutes.sidebar.TREE, { method: 'GET' });
};
