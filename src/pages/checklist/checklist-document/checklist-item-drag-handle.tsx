import { GripVerticalIcon, PlusIcon } from 'lucide-react';

export const ChecklistItemDragHandle = () => {
  return (
    <div className='flex justify-center items-center'>
      <button className='p-1 rounded-full hover:bg-grey-50 cursor-pointer focus:outline-none'>
        <PlusIcon className='h-4 w-4 text-text-lighter' />
      </button>
      <button className='p-1 rounded-full hover:bg-grey-50 cursor-pointer focus:outline-none'>
        <GripVerticalIcon className='h-4 w-4 text-text-lighter' />
      </button>
    </div>
  );
};
