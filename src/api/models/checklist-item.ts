export type ChecklistItem = {
  checklistId: number;
  checklistItemId: number;
  title: string;
  memo?: string;
  imageUrl?: string;
  isChecked?: boolean;
};

export type AddChecklistItemRequest = {
  checklistId: number;
  title: string;
};

export type DeleteChecklistItemRequest = {
  checklistId: number;
  checklistItemId: number;
};
