import apiRequest from '../api';
import {
  AddChecklistItemRequest,
  ChecklistItemType,
  DeleteChecklistItemRequest,
  UpdateChecklistItemRequest,
} from '../models';

export const getChecklistItems = async (checklistId: number) => {
  const response = await apiRequest(`/checklists/${checklistId}/items`, {
    method: 'GET',
  });
  return response.data as Array<ChecklistItemType>;
};

export const postChecklistItem = async ({
  checklistId,
  title,
}: AddChecklistItemRequest) => {
  return apiRequest(`/checklists/${checklistId}/items`, {
    method: 'POST',
    data: { title },
  });
};

export const patchChecklistItem = async ({
  checklistId,
  checklistItemId,
  ...rest
}: UpdateChecklistItemRequest) => {
  return apiRequest(`/checklists/${checklistId}/items/${checklistItemId}`, {
    method: 'PATCH',
    data: { ...rest },
  });
};

export const deleteChecklistItem = async ({
  checklistId,
  checklistItemId,
}: DeleteChecklistItemRequest) => {
  return apiRequest(`/checklists/${checklistId}/items/${checklistItemId}`, {
    method: 'DELETE',
  });
};
