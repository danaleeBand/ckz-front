import apiRequest from '../api';

export type CreateFolderResponseType = {
  id: number;
};

export const postFolder = async (workspaceId: number, folderName: string) => {
  return apiRequest(`/workspaces/${workspaceId}/folders`, {
    method: 'POST',
    data: { name: folderName },
  });
};

export const patchFolder = async (
  workspaceId: number,
  folderId: number,
  folderName: string,
) => {
  return apiRequest(`/workspaces/${workspaceId}/folders/${folderId}`, {
    method: 'PATCH',
    data: { name: folderName },
  });
};
