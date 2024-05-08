import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Sidebar } from './sidebar';
import { ChecklistDocument } from './checklist-document';

export const Checklist = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='w-screen flex flex-row'>
        <Sidebar />
        <ChecklistDocument />
      </div>
    </DndProvider>
  );
};
