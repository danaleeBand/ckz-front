import { TreeWorkSpaceItemType } from '@/types';
import apiRequest from '../api';

export type TreeApiResponseType = {
  data: {
    workspaces: Array<TreeWorkSpaceItemType>;
  };
};

export const getSidebarTree = async () => {
  return apiRequest('/sidebar/tree', { method: 'GET' });
};
