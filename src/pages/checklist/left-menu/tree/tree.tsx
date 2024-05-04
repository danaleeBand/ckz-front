import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import {
  Tree,
  NodeModel,
  MultiBackend,
  getBackendOptions,
  DragLayerMonitorProps,
} from '@minoru/react-dnd-treeview';
import { TreeDataProps, getTreeItemType } from './util';
import { TreeItem } from './tree-item';
import { TreeItemDragPreview } from './tree-item-dragging';
import { TreePlaceholder } from './tree-item-placeholder';
import { mockData } from './data';

export const TreeMenu = () => {
  const [treeData, setTreeData] =
    useState<Array<NodeModel<TreeDataProps>>>(mockData);
  const [selectedNodeId, setSelectedNodeId] = useState<string>();

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
          // eslint-disable-next-line react/no-unstable-nested-components
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
          // eslint-disable-next-line react/no-unstable-nested-components
          placeholderRender={(_, { depth }) => (
            <TreePlaceholder depth={depth} />
          )}
          enableAnimateExpand
        />
      </div>
    </DndProvider>
  );
};
