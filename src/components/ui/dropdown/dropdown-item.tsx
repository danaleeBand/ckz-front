import { memo } from 'react';

export type DropdownItemProps = {
  name: string;
  // eslint-disable-next-line react/no-unused-prop-types
  id: number;
  onClick?: () => void;
};

export const DropdownItem = memo(({ name, onClick }: DropdownItemProps) => {
  return (
    <li
      onClick={onClick}
      className='px-3 py-0.5
        cursor-pointer text-xs
      text-text-light dark:text-dark-text-dark 
      active:text-text-primary-dark dark:active:text-dark-text-primary-light
      active:bg-bg-darker dark:active:bg-dark-bg-lighter
      hover:bg-bg-dark dark:hover:bg-dark-bg-light'
    >
      {name}
    </li>
  );
});
