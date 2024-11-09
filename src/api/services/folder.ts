import apiRequest from '../api';

export type CreateFolderResponseType = {
  id: number;
};

export const postFolder = async (workspaceId: number, folderName: string) => {
  return apiRequest('/folders', {
    method: 'POST',
    data: { name: folderName, workspaceId },
  });
};

export const patchFolder = async (folderId: number, folderName: string) => {
  return apiRequest(`/folders/${folderId}`, {
    method: 'PATCH',
    data: { name: folderName },
  });
};

// TODO: api 아직 없음
export const deleteFolder = async (folderId: number) => {
  return apiRequest(`/folders/${folderId}`, {
    method: 'DELETE',
  });
};
