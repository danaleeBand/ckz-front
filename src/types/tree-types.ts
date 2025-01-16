export type TreeDataProps = {
  id: string;
  parent: string;
  droppable?: boolean;
  text: string;
  data: TreeDataDetailProps;
};

export type TreeDataDetailProps = {
  depth: number;
  type: 0 | 1 | 2;
  isDefaultFolder?: boolean;
  isDefaultFolderItem?: boolean;
  defaultFolderId?: string;
  isEditing?: boolean;
};

export type TreeCheckListItemType = {
  id: number;
  title: string;
  isEditing?: boolean;
};

export type TreeFolderItemType = {
  id: number;
  name: string;
  checklists: Array<TreeCheckListItemType>;
  isEditing?: boolean;
};

export type TreeWorkSpaceItemType = {
  id: number;
  name: string;
  folders: Array<TreeFolderItemType>;
  defaultFolder: TreeFolderItemType;
};

export type SidebarItemType = 'folder' | 'checklist';
export type SidebarAllItemType = SidebarItemType | 'workspace';
