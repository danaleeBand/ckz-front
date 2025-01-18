export type ChecklistItemType = {
  id: number;
  title: string;
  memo?: string;
  imageUrl?: string;
  isChecked?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type AddChecklistItemRequest = {
  checklistId: number;
  title: string;
};

export type UpdateChecklistItemRequest = {
  checklistId: number;
  checklistItemId: number;
  title: string;
  memo?: string;
  imageUrl?: string;
  isChecked?: boolean;
};

export type DeleteChecklistItemRequest = {
  checklistId: number;
  checklistItemId: number;
};
