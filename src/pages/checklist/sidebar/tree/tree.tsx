import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import {
  Tree,
  NodeModel,
  MultiBackend,
  getBackendOptions,
  DragLayerMonitorProps,
} from '@minoru/react-dnd-treeview';
import { TreeDataProps } from '@/types';
import { useAxios } from '@/hooks';
import { formatTreeData, isDroppableTreeItem } from '@/utils';
import { TreeItem } from './tree-item';
import { TreeItemDragPreview } from './tree-item-dragging';
import { TreePlaceholder } from './tree-item-placeholder';

export const TreeMenu = memo(() => {
  const [treeData, setTreeData] = useState<Array<NodeModel<TreeDataProps>>>([]);
  const [defaultOpened, setDefaultOpened] = useState<Array<string>>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string>();

  const params = useParams();
  const { checklistId } = params;

  useEffect(() => {
    setSelectedNodeId(`2-${checklistId}`);
  }, [checklistId]);

  const {
    response: initDataResponse,
    error: initDataError,
    status: initDataRequestStatus,
  } = useAxios(
    {
      url: '/sidebar/tree',
      method: 'GET',
    },
    true,
  );

  useEffect(() => {
    if (initDataRequestStatus === 'success' && initDataResponse) {
      console.log('initDataResponse', initDataResponse);
      const initTreeData = formatTreeData(initDataResponse);
      console.log('initTreeData', initTreeData);
      setTreeData(initTreeData);
      const openedFolder = initTreeData.filter(
        data => data.id === `2-${checklistId}`,
      )[0].parent as string;
      const openedWorkspace = initTreeData.filter(
        data => data.id === openedFolder,
      )[0].parent as string;
      setDefaultOpened([openedWorkspace, openedFolder]);
    }
    if (initDataRequestStatus === 'error' && initDataError) {
      alert('오류가 발생했습니다.'); // TODO: 이후 삭제, 오류처리 연결, 아래 로직 success로 이동
    }
  }, [initDataError, initDataResponse, initDataRequestStatus]);

  const handleDrop = (newTreeData: Array<NodeModel<TreeDataProps>>) => {
    setTreeData(newTreeData);
  };

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        tree={treeData}
        rootId={'root'}
        render={(node, { depth, isOpen, onToggle }) => (
          <TreeItem
            node={node as NodeModel<TreeDataProps>}
            depth={depth}
            isOpen={isOpen}
            isSelected={node.id === selectedNodeId}
            onToggle={onToggle}
          />
        )}
        dragPreviewRender={monitorProps => (
          <TreeItemDragPreview
            monitorProps={monitorProps as DragLayerMonitorProps<TreeDataProps>}
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
          className: `bg-bg-dark dark:bg-bg-light w-full h-screen pt-2 pl-1 border-t-1 
            border-border-lighter dark:border-dark-border-darker`,
        }}
        placeholderRender={(_, { depth }) => <TreePlaceholder depth={depth} />}
        enableAnimateExpand
        initialOpen={defaultOpened}
      />
    </DndProvider>
  );
});
