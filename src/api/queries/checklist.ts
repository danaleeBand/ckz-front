import { useMutation, useQuery } from '@tanstack/react-query';
import {
  deleteChecklistItem,
  getChecklistItems,
  patchChecklistItem,
  postChecklistItem,
} from '../services/checklist-item';
import {
  AddChecklistItemRequest,
  DeleteChecklistItemRequest,
  UpdateChecklistItemRequest,
} from '../models';
import { getChecklistDetail } from '../services';

export const ChecklistQueryKeys = {
  root: 'checklist',
  getItem: 'get-checklist-items',
  getDetail: 'get-checklist-detail',
  add: 'add-checklist-item',
  update: 'patch-checklist-item',
  delete: 'delete-checklist-item',
};

export const useGetChecklistItemsQuery = (checklistId: number) => {
  return useQuery({
    queryKey: [
      ChecklistQueryKeys.root,
      ChecklistQueryKeys.getItem,
      checklistId ?? -1,
    ],
    queryFn: () => getChecklistItems(checklistId),
    enabled: !!checklistId,
  });
};

export const useAddChecklistItemMutation = () => {
  return useMutation({
    mutationKey: [ChecklistQueryKeys.root, 'add'],
    mutationFn: (payload: AddChecklistItemRequest) =>
      postChecklistItem({ ...payload }),
  });
};

export const useUpdateChecklistItemMutation = () => {
  return useMutation({
    mutationKey: [ChecklistQueryKeys.root, 'patch'],
    mutationFn: (payload: UpdateChecklistItemRequest) =>
      patchChecklistItem({ ...payload }),
  });
};

export const useDeleteChecklistItemMutation = () => {
  return useMutation({
    mutationKey: [ChecklistQueryKeys.root, 'delete'],
    mutationFn: (payload: DeleteChecklistItemRequest) =>
      deleteChecklistItem({ ...payload }),
  });
};

export const useGetChecklistDetailQuery = (checklistId: number) => {
  return useQuery({
    queryKey: [
      ChecklistQueryKeys.root,
      ChecklistQueryKeys.getDetail,
      checklistId ?? -1,
    ],
    queryFn: () => getChecklistDetail({ id: checklistId }),
  });
};
