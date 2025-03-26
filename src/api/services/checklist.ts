import apiRequest from '../api';
import {
  DeleteSidebarItemPayload,
  GetChecklistDetailPayload,
  GetChecklistDetailResponse,
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
  return await apiRequest(`/checklists/${id}`, {
    method: 'PATCH',
    data: { title: name },
  });
};

export const deleteChecklist = async ({ id }: DeleteSidebarItemPayload) => {
  return await apiRequest(`/checklists/${id}`, {
    method: 'DELETE',
  });
};

export const getChecklistDetail = async ({ id }: GetChecklistDetailPayload) => {
  const response = await apiRequest(`/checklists/${id}`, {
    method: 'GET',
  });
  return response.data as GetChecklistDetailResponse;
};
