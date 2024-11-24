import { apiRoutes } from '@/constants/api';
import apiRequest from '../api';

export type CreateFolderResponseType = {
  id: number;
};

export const postFolder = async (workspaceId: number, folderName: string) => {
  return apiRequest(apiRoutes.folder.BASE, {
    method: 'POST',
    data: { name: folderName, workspaceId },
  });
};

export const patchFolder = async (folderId: number, folderName: string) => {
  return apiRequest(apiRoutes.folder.ITEM, {
    method: 'PATCH',
    data: { name: folderName },
    pathParams: { folderId },
  });
};

export const deleteFolder = async (folderId: number) => {
  return apiRequest(apiRoutes.folder.ITEM, {
    method: 'DELETE',
    pathParams: { folderId },
  });
};
