import { SidebarItemType } from '@/types';

export type PostSidebarItemResponse = {
  id: number;
};

export type PostSidebarItemPayload = {
  type: SidebarItemType;
  parentId: number;
  name: string;
};

export type PatchSidebarItemPayload = {
  type: SidebarItemType;
  id: number;
  name: string;
};

export type DeleteSidebarItemPayload = {
  type: SidebarItemType;
  id: number;
};
