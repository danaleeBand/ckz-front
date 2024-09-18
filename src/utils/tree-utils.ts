import { TreeApiResponseType } from '@/api';
import {
  TreeCheckListItemType,
  TreeDataProps,
  TreeFolderItemType,
  TreeWorkSpaceItemType,
} from '@/types';

export const setTreeItemId = (id: number, itemType: number) => {
  return `${itemType}-${id}`;
};

export const getTreeItemId = (id: string) => {
  return parseInt(id.split('-')[1], 10);
};

export const getTreeItemType = (id: string) => {
  if (!id || !id.includes('-')) {
    return -999;
  }
  if (id === 'root') {
    return -1;
  }
  return parseInt(id.split('-')[0], 10);
};

export const formatTreeData = (apiResponse: TreeApiResponseType) => {
  const treeData: Array<TreeDataProps> = [];

  apiResponse.data.workspace.forEach((workspaceItem: TreeWorkSpaceItemType) => {
    const workSpaceId = setTreeItemId(workspaceItem.id, 0);
    const defaultFolder = { ...workspaceItem.defaultFolder };
    const defaultFolderId = setTreeItemId(defaultFolder.id, 1);

    treeData.push({
      id: workSpaceId,
      parent: 'root',
      droppable: true,
      text: workspaceItem.name,
      data: {
        depth: 0,
        type: 0,
        defaultFolderId,
      },
    });

    workspaceItem.folder?.forEach((folderItem: TreeFolderItemType) => {
      const folderId = setTreeItemId(folderItem.id, 1);
      treeData.push({
        id: folderId,
        parent: workSpaceId,
        droppable: true,
        text: folderItem.name,
        data: {
          depth: 1,
          type: 1,
        },
      });

      folderItem.checklist?.forEach((checklistItem: TreeCheckListItemType) => {
        treeData.push({
          id: setTreeItemId(checklistItem.id, 2),
          parent: folderId,
          text: checklistItem.title,
          data: {
            depth: 2,
            type: 2,
          },
        });
      });
    });

    treeData.push({
      id: defaultFolderId,
      parent: workSpaceId,
      text: '기본 폴더',
      data: {
        depth: 1,
        type: 1,
        isDefaultFolder: true,
      },
    });

    defaultFolder.checklist?.forEach((checklistItem: TreeCheckListItemType) => {
      treeData.push({
        id: setTreeItemId(checklistItem.id, 2),
        parent: workSpaceId,
        text: checklistItem.title,
        data: {
          depth: 1,
          type: 2,
          isDefaultFolderItem: true,
        },
      });
    });
  });
  return treeData;
};

export const isDroppableTreeItem = (
  dropTargetId: string,
  dragSourceId: string,
) => {
  const dropTargetType = getTreeItemType(dropTargetId);
  const dragSourceType = getTreeItemType(dragSourceId);

  if (dropTargetType < 0 && dragSourceType === 0) {
    return true;
  }
  if (dropTargetType >= 0 && dragSourceType > dropTargetType) {
    return true;
  }
  return false;
};
