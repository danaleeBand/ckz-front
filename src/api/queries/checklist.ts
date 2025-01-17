import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getChecklistItems,
  postChecklistItem,
} from '../services/checklist-item';
import { AddChecklistItemRequest, ChecklistItem } from '../models';

export const ChecklistQueryKeys = {
  root: 'checklist',
  get: 'get-checklist-items',
  add: 'add-checklist-item',
  patch: 'patch-checklist-item',
  delete: 'delete-checklist-item',
};

export const useGetChecklistItemsQuery = (checklistId: number) => {
  return useQuery({
    queryKey: [
      ChecklistQueryKeys.root,
      ChecklistQueryKeys.get,
      checklistId ?? -1,
    ],
    queryFn: () => getChecklistItems(checklistId),
    enabled: !!checklistId,
  });
};

export const useAddChecklistItemMutation = () => {
  return useMutation({
    mutationKey: [ChecklistQueryKeys.root, 'add'],
    mutationFn: (payload: ChecklistItem) => postChecklistItem({ ...payload }),
  });
};

export const useUpdateChecklistItemMutation = () => {
  return useMutation({
    mutationKey: [ChecklistQueryKeys.root, 'patch'],
    mutationFn: (payload: AddChecklistItemRequest) =>
      postChecklistItem({ ...payload }),
  });
};
