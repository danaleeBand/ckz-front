export type TreeDataProps = {
  id: string;
  parent: string;
  droppable?: boolean;
  text: string;
  depth: number;
  type: 0 | 1 | 2;
};

export const setTreeItemId = (id: number, depth: number) => {
  return `${depth}-${id}`;
};

export const getTreeItemId = (id: string) => {
  return parseInt(id.split('-')[1], 10);
};

export const getTreeItemType = (id: string) => {
  return parseInt(id.split('-')[0], 10);
};
