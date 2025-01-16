import { SidebarApiResponseType } from '@/api';
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

export const formatTreeData = (apiResponse: SidebarApiResponseType) => {
  const treeData: Array<TreeDataProps> = [];

  apiResponse.workspaces?.forEach((workspaceItem: TreeWorkSpaceItemType) => {
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

    workspaceItem.folders?.forEach((folderItem: TreeFolderItemType) => {
      const folderId = setTreeItemId(folderItem.id, 1);
      treeData.push({
        id: folderId,
        parent: workSpaceId,
        droppable: true,
        text: folderItem.name,
        data: {
          depth: 1,
          type: 1,
          isEditing: folderItem.isEditing ?? false,
        },
      });

      folderItem.checklists?.forEach((checklistItem: TreeCheckListItemType) => {
        treeData.push({
          id: setTreeItemId(checklistItem.id, 2),
          parent: folderId,
          text: checklistItem.title,
          data: {
            depth: 2,
            type: 2,
            isEditing: checklistItem.isEditing ?? false,
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
        isEditing: defaultFolder.isEditing ?? false,
      },
    });

    defaultFolder.checklists?.forEach(
      (checklistItem: TreeCheckListItemType) => {
        treeData.push({
          id: setTreeItemId(checklistItem.id, 2),
          parent: workSpaceId,
          text: checklistItem.title,
          data: {
            depth: 1,
            type: 2,
            isDefaultFolderItem: true,
            isEditing: checklistItem.isEditing ?? false,
          },
        });
      },
    );
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
