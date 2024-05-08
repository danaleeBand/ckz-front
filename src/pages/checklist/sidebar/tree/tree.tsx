import { memo, useEffect, useState } from 'react';
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
import { apiDataExample } from './data';

export const TreeMenu = memo(() => {
  const [treeData, setTreeData] = useState<Array<NodeModel<TreeDataProps>>>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string>();

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
      const initTreeData = formatTreeData(initDataResponse);
      setTreeData(initTreeData);
    }
    if (initDataRequestStatus === 'error' && initDataError) {
      console.log('오류가 발생했습니다. mockData 보여줌.'); // TODO: 이후 삭제, 오류처리 연결
      const initTreeData = formatTreeData(apiDataExample);
      setTreeData(initTreeData);
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
            onSelect={newNode => setSelectedNodeId(newNode)}
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
          className: 'bg-bg-dark dark:bg-bg-light w-full h-screen pt-2 pr-2',
        }}
        placeholderRender={(_, { depth }) => <TreePlaceholder depth={depth} />}
        enableAnimateExpand
      />
    </DndProvider>
  );
});
