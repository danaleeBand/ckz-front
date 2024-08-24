export type TreeDataProps = {
  id: string;
  parent: string;
  droppable?: boolean;
  text: string;
  depth: number;
  type: 0 | 1 | 2;
};

export type TreeCheckListItemType = {
  id: number;
  title: string;
};

export type TreeFolderItemType = {
  id: number;
  name: string;
  checklist: Array<TreeCheckListItemType>;
};

export type TreeWorkSpaceItemType = {
  id: number;
  name: string;
  folder: Array<TreeFolderItemType>;
  defaultFolder: Array<TreeCheckListItemType>;
};
