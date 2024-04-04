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
    ${
      color === 'primary'
        ? 'bg-primary hover:bg-primary-dark active:bg-primary-darker'
        : 'bg-secondary hover:bg-secondary-dark active:bg-secondary-darker'
    }
    text-text-primary-inverse
    border-none
    shadow-md
  `;

  const outlinedStyle = `
    bg-bg-primary hover:bg-bg-primary-dark active:bg-bg-primary-darker
    ${
      color === 'primary'
        ? 'text-primary border-primary hover:border-primary-dark hover:text-primary-dark active:border-primary-dark active:text-primary-dark'
        : 'text-secondary border-secondary hover:border-secondary-dark hover:text-secondary-dark active:border-secondary-dark active:text-secondary-dark'
    }
  `;

  const sizeStyle = {
    small: 'px-2 py-1 text-xs h-8 rounded-lg min-w-8 min-h-8',
    medium: 'px-2.5 py-1.5 text-basic h-9 rounded-lg min-w-9 min-h-9',
    large: 'px-5 py-2 text-basic h-10 rounded-xl min-w-10 min-h-10',
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
