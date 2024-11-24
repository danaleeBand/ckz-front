import { apiRoutes } from '@/constants/api';
import apiRequest from '../api';

export type CreateChecklistResponseType = {
  id: number;
};

export const postChecklist = async (
  folderId: number,
  checklistName: string,
) => {
  return apiRequest(apiRoutes.checklist.BASE, {
    method: 'POST',
    data: { title: checklistName, folderId },
  });
};

export const patchChecklist = async (
  checklistId: number,
  checklistName: string,
) => {
  return apiRequest(apiRoutes.checklist.ITEM, {
    method: 'PATCH',
    data: { title: checklistName },
    pathParams: { checklistId },
  });
};

export const deleteChecklist = async (checklistId: number) => {
  return apiRequest(apiRoutes.checklist.ITEM, {
    method: 'DELETE',
    pathParams: { checklistId },
  });
};
