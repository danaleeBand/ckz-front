import { useMutation, useQuery } from '@tanstack/react-query';
import {
  deleteChecklist,
  deleteFolder,
  getSidebarTree,
  patchChecklist,
  patchFolder,
  postChecklist,
  postFolder,
} from '../services';
import {
  DeleteSidebarItemPayload,
  PatchSidebarItemPayload,
  PostSidebarItemPayload,
} from '../models';
import { formatTreeData } from '@/utils';

export const SidebarQueryKeys = {
  root: 'tree',
  sidebar: 'sidebar',
  add: 'add',
  edit: 'edit',
  delete: 'delete',
};

export const useSidebarQuery = (enabled?: boolean) => {
  return useQuery({
    queryKey: [SidebarQueryKeys.root, SidebarQueryKeys.sidebar],
    queryFn: getSidebarTree,
    enabled,
    select: data => formatTreeData(data),
  });
};

export const useAddSidebarItemMutation = () => {
  return useMutation({
    mutationKey: [SidebarQueryKeys.root, SidebarQueryKeys.add],
    mutationFn: async (payload: PostSidebarItemPayload) => {
      let response;
      if (payload.type === 'checklist') {
        response = await postChecklist(payload);
      } else {
        response = await postFolder(payload);
      }
      return response;
    },
  });
};

export const useEditSidebarItemMutation = () => {
  return useMutation({
    mutationKey: [SidebarQueryKeys.root, SidebarQueryKeys.edit],
    mutationFn: async (payload: PatchSidebarItemPayload) => {
      if (payload.type === 'checklist') {
        await patchChecklist(payload);
      } else {
        await patchFolder(payload);
      }
    },
  });
};

export const useDeleteSidebarItemMutation = () => {
  return useMutation({
    mutationKey: [SidebarQueryKeys.root, SidebarQueryKeys.delete],
    mutationFn: async (payload: DeleteSidebarItemPayload) => {
      if (payload.type === 'checklist') {
        await deleteChecklist(payload);
      } else {
        await deleteFolder(payload);
      }
    },
  });
};
