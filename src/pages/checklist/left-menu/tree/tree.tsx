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
import { formatTreeData, getTreeItemType } from '@/utils';
import { TreeItem } from './tree-item';
import { TreeItemDragPreview } from './tree-item-dragging';
import { TreePlaceholder } from './tree-item-placeholder';

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
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  }, [initDataError, initDataResponse, initDataRequestStatus]);

  const handleDrop = (newTreeData: Array<NodeModel<TreeDataProps>>) => {
    setTreeData(newTreeData);
  };

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <div>
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
              monitorProps={
                monitorProps as DragLayerMonitorProps<TreeDataProps>
              }
            />
          )}
          onDrop={handleDrop}
          sort={false}
          insertDroppableFirst
          canDrop={(_, { dragSource, dropTargetId }) => {
            if (
              getTreeItemType(dragSource?.id as string) >
                getTreeItemType(dropTargetId as string) ||
              (getTreeItemType(dragSource?.id as string) === 0 &&
                dropTargetId === 'root')
            ) {
              return true;
            }
            return false;
          }}
          dropTargetOffset={10}
          rootProps={{
            className: 'bg-bg-dark dark:bg-bg-light h-screen max-w-sm pt-2',
          }}
          placeholderRender={(_, { depth }) => (
            <TreePlaceholder depth={depth} />
          )}
          enableAnimateExpand
        />
      </div>
    </DndProvider>
  );
});
