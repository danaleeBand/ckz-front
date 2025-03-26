import { UserInfo } from './user';

export type ChecklistItemType = {
  id: number;
  title: string;
  memo: string | null;
  imageUrl: string | null;
  isChecked: boolean;
  checkedBy: UserInfo;
  createdAt: Date;
  createdBy: UserInfo;
  updatedAt: Date;
  updatedBy: UserInfo;
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

export type GetChecklistDetailPayload = {
  id: number;
};

type Checklist = {
  id: number;
  title: string;
  emoji: string | null;
  itemOrder: number[];
  createdAt: Date;
  updatedAt: Date;
  permissionCode: string;
  createdBy: UserInfo;
  updatedBy: UserInfo;
};

type Folder = {
  id: number;
  name: string;
  checklistOrder: number[];
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
  permissionCode: string;
};

type Workspace = {
  id: number;
  name: string;
  folderOrder: number[];
  createdAt: Date;
  updatedAt: Date;
  permissionCode: string;
};

export type GetChecklistDetailResponse = {
  checklist: Checklist;
  folder: Folder;
  workspace: Workspace;
  items: ChecklistItemType[];
};
