import apiRequest from '../api';
import {
  DeleteSidebarItemPayload,
  PatchSidebarItemPayload,
  PostSidebarItemPayload,
  PostSidebarItemResponse,
} from '../models';

export const postChecklist = async ({
  parentId,
  name,
}: PostSidebarItemPayload) => {
  const response = await apiRequest('/checklists', {
    method: 'POST',
    data: { title: name, folderId: parentId },
  });
  return response.data as PostSidebarItemResponse;
};

export const patchChecklist = async ({ id, name }: PatchSidebarItemPayload) => {
  return apiRequest(`/checklists/${id}`, {
    method: 'PATCH',
    data: { title: name },
  });
};

export const deleteChecklist = async ({ id }: DeleteSidebarItemPayload) => {
  return apiRequest(`/checklists/${id}`, {
    method: 'DELETE',
  });
};
