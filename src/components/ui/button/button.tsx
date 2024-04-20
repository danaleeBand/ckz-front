import React from 'react';

export type ButtonProps = {
  type?: 'contained' | 'outlined';
  color?: 'primary' | 'secondary';
  labelText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export const Button = ({
  type = 'contained',
  color = 'primary',
  labelText = '',
  icon,
  iconPosition = 'start',
  size = 'medium',
  className,
  onClick,
  disabled,
}: ButtonProps) => {
  const containedStyle = `
    text-white border-none shadow-md
    ${
      color === 'primary'
        ? `bg-primary hover:bg-primary-dark active:bg-primary-darker
           dark:bg-dark-primary dark:hover:bg-dark-primary-dark dark:active:bg-dark-primary-darker`
        : `bg-secondary hover:bg-secondary-dark active:bg-secondary-darker
           dark:bg-dark-secondary dark:hover:bg-dark-secondary-dark dark:active:bg-dark-secondary-darker`
    }
  `;

  const outlinedStyle = `
    bg-bg-basic active:bg-bg-dark
    dark:bg-dark-bg-elevated dark:hover:bg-dark-bg-basic dark:active:bg-dark-bg-basic
    ${
      color === 'primary'
        ? `text-text-primary border-border-primary 
           hover:text-text-primary-dark hover:border-border-primary-dark
           active:text-text-primary-dark active:border-primary-dark
           dark:text-dark-text-primary dark:border-dark-border-primary
           dark:hover:text-dark-text-primary-light dark:hover:border-dark-border-primary-light
           dark:active:text-dark-text-primary-light dark:active:border-dark-border-primary-light`
        : `text-text-secondary border-border-secondary 
           hover:border-border-secondary-dark hover:text-text-secondary-dark
           active:border-border-secondary-dark active:text-text-secondary-dark
           dark:text-dark-text-secondary dark:border-dark-border-secondary
           dark:hover:border-dark-border-secondary-light dark:hover:text-dark-text-secondary-light
           dark:active:border-dark-border-secondary-light dark:active:text-dark-text-secondary-light`
    }
  `;

  const sizeStyle = {
    small: 'px-2 py-1 text-xs h-7 rounded-lg min-w-7 min-h-7',
    medium: 'px-2.5 py-1.5 text-basic h-8 rounded-lg min-w-8 min-h-8',
    large: 'px-5 py-2 text-basic h-9 rounded-xl min-w-9 min-h-9',
  } as Record<string, string>;

  const customStyle = `
    flex flex-row items-center justify-center 
    gap-1.5
    box-border
    font-bold
    border-1 border-solid 
    cursor-pointer
    ${sizeStyle[size]}
    ${type === 'contained' ? containedStyle : outlinedStyle}
  `;

  return (
    <button
      className={`${customStyle} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && iconPosition === 'start' && icon}
      <div className='flex justify-center items-center'>{labelText}</div>
      {icon && iconPosition === 'end' && icon}
    </button>
  );
};
