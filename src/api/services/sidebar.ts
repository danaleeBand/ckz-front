import apiRequest from '../api';
import { SidebarApiResponseType } from '../models';

export const getSidebarTree = async () => {
  const response = await apiRequest('/sidebar/tree', { method: 'GET' });
  return response.data as SidebarApiResponseType;
};
