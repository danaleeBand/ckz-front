import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import {
  Tree,
  NodeModel,
  MultiBackend,
  getBackendOptions,
  DragLayerMonitorProps,
} from '@minoru/react-dnd-treeview';
import { useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { SidebarItemType, TreeDataDetailProps, TreeDataProps } from '@/types';
import { getTreeItemId, getTreeItemType, isDroppableTreeItem } from '@/utils';
import { TreeItem } from './tree-item';
import { TreeItemDragPreview } from './tree-item-dragging';
import { TreePlaceholder } from './tree-item-placeholder';
import {
  SidebarApiResponseType,
  SidebarQueryKeys,
  useAddSidebarItemMutation,
  useSidebarQuery,
} from '@/api';
import { TreeItemEditing } from './tree-item-editing';

export const TreeMenu = memo(() => {
  const navigate = useNavigate();
  const params = useParams();
  const { checklistId } = params;

  const queryClient = useQueryClient();
  const { data: treeData } = useSidebarQuery(true);
  const { mutate: addItemMutate } = useAddSidebarItemMutation();

  const [defaultOpened, setDefaultOpened] = useState<Array<string>>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string>();

  const updateDefaultOpen = (newData: Array<string>) => {
    setDefaultOpened(prevDefaultOpened => {
      return [...prevDefaultOpened, ...newData];
    });
  };

  const handleDrop = useCallback(
    (newTreeData: Array<NodeModel<TreeDataDetailProps>>) => {
      // TODO: 순서 바꾸기 api 추가
    },
    [],
  );

  const handleNewItem = useCallback(
    (node: TreeDataProps, type: SidebarItemType) => {
      const isFolder = type === 'folder';
      const isDefaultFolderItem = !isFolder && node.data.type === 0;

      const parent = isDefaultFolderItem ? node.data.defaultFolderId : node.id;
      const parentId = getTreeItemId(parent as string);

      addItemMutate(
        { type, parentId, name: '제목 없음' },
        {
          onSuccess: response => {
            if (!isFolder) {
              navigate(`/${response.id}`);
            }
            queryClient.invalidateQueries({
              queryKey: [SidebarQueryKeys.root],
            });
          },
          onError: () => alert('오류가 발생했습니다.'),
        },
      );
    },
    [],
  );

  const handleEditItem = useCallback(
    (nodeId: string, isEditing: boolean, itemName?: string) => {
      const itemId = getTreeItemId(nodeId);
      const itemType = getTreeItemType(nodeId) === 2 ? 'checklist' : 'folder';

      queryClient.setQueryData(
        [SidebarQueryKeys.root, SidebarQueryKeys.sidebar],
        (prevData: SidebarApiResponseType) => {
          if (!prevData) return prevData;

          const newData = produce(prevData, draft => {
            draft.workspaces.forEach(workspace => {
              if (itemType === 'checklist') {
                workspace.defaultFolder.checklists.forEach(checklist => {
                  if (checklist.id === itemId) {
                    checklist.isEditing = isEditing;
                    checklist.title = itemName ?? checklist.title;
                  }
                });

                workspace.folders.forEach(folder => {
                  folder.checklists.forEach(checklist => {
                    if (checklist.id === itemId) {
                      checklist.isEditing = isEditing;
                      checklist.title = itemName ?? checklist.title;
                    }
                  });
                });
              }

              if (itemType === 'folder') {
                workspace.folders.forEach(folder => {
                  if (folder.id === itemId) {
                    folder.isEditing = isEditing;
                    folder.name = itemName ?? folder.name;
                  }
                });
              }
            });
          });
          return newData;
        },
      );
    },
    [],
  );

  const handleDeleteItem = useCallback((nodeId: string) => {
    if (selectedNodeId === nodeId) {
      setSelectedNodeId(undefined);
    }
  }, []);

  const handleDefaultOpen = useCallback(
    (newData: Array<NodeModel<TreeDataDetailProps>>) => {
      const openedFolder = newData.filter(
        data => data.id === `2-${checklistId}`,
      )[0]?.parent as string;
      const openedWorkspace = newData.filter(
        data => data.id === openedFolder,
      )[0]?.parent as string;
      updateDefaultOpen([openedWorkspace, openedFolder]);
    },
    [treeData, checklistId],
  );

  useEffect(() => {
    if (treeData && checklistId) {
      handleDefaultOpen(treeData);
      setSelectedNodeId(`2-${checklistId}`);
    }
  }, [treeData, checklistId]);

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        tree={treeData ?? []}
        rootId={'root'}
        render={(node, { depth, isOpen, onToggle }) =>
          node.data?.isDefaultFolder ? (
            <></>
          ) : node.data?.isEditing ? (
            <TreeItemEditing
              node={node as TreeDataProps}
              onEndEdit={itemName =>
                handleEditItem(node.id as string, false, itemName)
              }
              depth={depth}
            />
          ) : (
            <TreeItem
              node={node as TreeDataProps}
              depth={depth}
              isOpen={isOpen}
              isSelected={node.id === selectedNodeId}
              onToggle={onToggle}
              onNewItem={(node, type) =>
                handleNewItem(node as TreeDataProps, type)
              }
              onEditItem={() => handleEditItem(node.id as string, true)}
              onDeleteItem={() => handleDeleteItem(node.id as string)}
            />
          )
        }
        dragPreviewRender={monitorProps => (
          <TreeItemDragPreview
            monitorProps={
              monitorProps as DragLayerMonitorProps<TreeDataDetailProps>
            }
          />
        )}
        onDrop={handleDrop}
        sort={false}
        insertDroppableFirst
        canDrop={(_, { dragSource, dropTargetId }) => {
          return isDroppableTreeItem(
            dropTargetId as string,
            dragSource?.id as string,
          );
        }}
        dropTargetOffset={10}
        rootProps={{
          className: `bg-bg-dark dark:bg-bg-light w-full py-2 pl-1 border-t-1 
            border-border-lighter dark:border-dark-border-light overflow-y-auto`,
        }}
        placeholderRender={(_, { depth }) => <TreePlaceholder depth={depth} />}
        enableAnimateExpand
        initialOpen={defaultOpened}
      />
    </DndProvider>
  );
});
