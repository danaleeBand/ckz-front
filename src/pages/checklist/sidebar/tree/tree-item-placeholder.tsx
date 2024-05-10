import { memo } from 'react';

export type TreePlaceholderProps = {
  depth: number;
};

export const TreePlaceholder = memo(({ depth }: TreePlaceholderProps) => {
  const leftStyle = `ml-${depth * 4}`;

  return (
    <div className='w-full'>
      <div className={`bg-bg-primary dark:bg-bg-primary h-0.5 ${leftStyle}`} />
    </div>
  );
});
