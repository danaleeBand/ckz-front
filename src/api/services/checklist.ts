import apiRequest from '../api';

export type CreateChecklistResponseType = {
  id: number;
};

export const postChecklist = async (
  folderId: number,
  checklistName: string,
) => {
  return apiRequest('/checklists', {
    method: 'POST',
    data: { title: checklistName, folderId },
  });
};

export const patchChecklist = async (
  checklistId: number,
  checklistName: string,
) => {
  return apiRequest(`/checklists/${checklistId}`, {
    method: 'PATCH',
    data: { title: checklistName },
  });
};

export const deleteChecklist = async (checklistId: number) => {
  return apiRequest(`/checklists/${checklistId}`, {
    method: 'DELETE',
  });
};
