import apiRequest from '../api';
import {
  DeleteSidebarItemPayload,
  PatchSidebarItemPayload,
  PostSidebarItemPayload,
  PostSidebarItemResponse,
} from '../models';

export const postFolder = async ({
  parentId,
  name,
}: PostSidebarItemPayload) => {
  const response = await apiRequest('/folders', {
    method: 'POST',
    data: { name, workspaceId: parentId },
  });
  return response.data as PostSidebarItemResponse;
};

export const patchFolder = async ({ id, name }: PatchSidebarItemPayload) => {
  return apiRequest(`/folders/${id}`, {
    method: 'PATCH',
    data: { name },
  });
};

// TODO: api 아직 없음
export const deleteFolder = async ({ id }: DeleteSidebarItemPayload) => {
  return apiRequest(`/folders/${id}`, {
    method: 'DELETE',
  });
};
