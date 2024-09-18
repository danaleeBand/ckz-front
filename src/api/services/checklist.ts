import apiRequest from '../api';

export type CreateChecklistResponseType = {
  id: number;
};

export const postChecklist = async (
  folderId: number,
  checklistName: string,
) => {
  return apiRequest(`/folders/${folderId}/checklists`, {
    method: 'POST',
    data: { title: checklistName },
  });
};

export const patchChecklist = async (
  checklistId: number,
  checklistName: string,
  folderId: number,
) => {
  return apiRequest(`/folders/${folderId}/checklists/${checklistId}`, {
    method: 'PATCH',
    data: { title: checklistName },
  });
};

export const deleteChecklist = async (
  checklistId: number,
  folderId: number,
) => {
  return apiRequest(`/folders/${folderId}/checklists/${checklistId}`, {
    method: 'DELETE',
  });
};
