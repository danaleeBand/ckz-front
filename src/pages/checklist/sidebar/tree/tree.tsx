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
import { TreeDataDetailProps, TreeDataProps } from '@/types';
import {
  formatTreeData,
  getTreeItemId,
  getTreeItemType,
  isDroppableTreeItem,
} from '@/utils';
import { TreeItem } from './tree-item';
import { TreeItemDragPreview } from './tree-item-dragging';
import { TreePlaceholder } from './tree-item-placeholder';
import {
  CreateChecklistResponseType,
  CreateFolderResponseType,
  getSidebarTree,
  postChecklist,
  postFolder,
  TreeApiResponseType,
} from '@/api';
import { TreeItemEditing } from './tree-item-editing';

export const TreeMenu = memo(() => {
  const [treeData, setTreeData] = useState<
    Array<NodeModel<TreeDataDetailProps>>
  >([]);
  const [defaultOpened, setDefaultOpened] = useState<Array<string>>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string>();

  const navigate = useNavigate();
  const params = useParams();
  const { checklistId } = params;

  const updateTreeData = (newData: TreeDataProps) => {
    setTreeData(prevTreeData => {
      return [...prevTreeData, newData];
    });
  };

  const handleDrop = useCallback(
    (newTreeData: Array<NodeModel<TreeDataDetailProps>>) => {
      setTreeData(newTreeData);
    },
    [],
  );

  const handleNewItem = useCallback(
    async (node: TreeDataProps, type: 'folder' | 'checklist') => {
      let response;

      const isFolder = type === 'folder';
      const isDefaultFolderItem = !isFolder && node.data.type === 0;
      const parent = isDefaultFolderItem ? node.data.defaultFolderId : node.id;
      const parentId = getTreeItemId(parent as string);

      if (isFolder) {
        response = await postFolder(parentId, '제목 없음');
      } else {
        response = await postChecklist(parentId, '제목 없음');
      }

      if (response.success) {
        let returnData;
        if (isFolder) {
          returnData = response.data as CreateFolderResponseType;
        } else {
          returnData = response.data as CreateChecklistResponseType;
        }

        const newItem: TreeDataProps = {
          id: `${isFolder ? 1 : 2}-${returnData.id}`,
          parent: node.id,
          droppable: isFolder,
          text: '제목 없음',
          data: {
            depth: getTreeItemType(node.id) + 1,
            type: isFolder ? 1 : 2,
            isDefaultFolderItem,
          },
        };

        updateTreeData(newItem);

        if (!isFolder) {
          navigate(`/${returnData.id}`);
        }
      } else {
        alert('오류가 발생했습니다.'); // TODO: 이후 삭제, 오류처리 연결
      }
    },
    [treeData],
  );

  const handleEditItem = useCallback(
    (nodeId: string, isEditing: boolean, itemName?: string) => {
      const newTreeData: Array<TreeDataProps> = treeData.map(data => {
        if (data.id === nodeId) {
          return {
            ...data,
            text: itemName || data.text,
            data: {
              ...data.data,
              isEditing,
            },
          } as TreeDataProps;
        }
        return data as TreeDataProps;
      });
      setTreeData(newTreeData);
    },
    [treeData],
  );

  const handleDefaultOpen = useCallback(
    (newData: Array<NodeModel<TreeDataDetailProps>>) => {
      const openedFolder = newData.filter(
        data => data.id === `2-${checklistId}`,
      )[0]?.parent as string;
      const openedWorkspace = newData.filter(
        data => data.id === openedFolder,
      )[0]?.parent as string;
      setDefaultOpened([...defaultOpened, openedWorkspace, openedFolder]);
    },
    [treeData, checklistId],
  );

  const handleTreeData = useCallback(async () => {
    const response = await getSidebarTree();
    if (response.success) {
      const initTreeData = formatTreeData(response as TreeApiResponseType);
      setTreeData(initTreeData);
    } else {
      alert('오류가 발생했습니다.'); // TODO: 이후 삭제, 오류처리 연결, 아래 로직 success로 이동
    }
  }, []);

  useEffect(() => {
    handleTreeData();
  }, []);

  useEffect(() => {
    if (treeData && checklistId) {
      handleDefaultOpen(treeData);
      setSelectedNodeId(`2-${checklistId}`);
    }
  }, [treeData, checklistId]);

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        tree={treeData}
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
