import { useEffect, useRef } from 'react';
import { DropdownItem, DropdownItemProps } from './dropdown-item';

export type DropdownProps = {
  items: Array<DropdownItemProps>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  className?: string;
};

export const Dropdown = ({
  items,
  isOpen,
  setIsOpen,
  className,
}: DropdownProps) => {
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <ul
      ref={dropdownRef}
      className={`absolute z-50 mx-1.5 mt-1 py-2 flex flex-col
        bg-bg-basic dark:bg-dark-bg-basic border-border-basic dark:border-dark-border-basic  
        border-1 rounded-md shadow-2xl
        overflow-auto transition-all duration-500 ease-out
        ${className}`}
      style={{
        maxHeight: isOpen ? '500px' : '0px',
        opacity: isOpen ? 1 : 0,
        transition: 'max-height 0.5s ease, opacity 0.1s ease',
        width: 'calc(100% - 12px)',
      }}
    >
      {items.map(item => (
        <DropdownItem key={item.id} {...item} />
      ))}
    </ul>
  );
};
