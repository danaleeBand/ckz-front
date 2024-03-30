import React from 'react';

export type TestButtonProps = {
  labelText?: string;
  icon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

export const TestButton = ({
  labelText = '',
  className = '',
  ...restProps
}: TestButtonProps) => {
  return (
    <button
      className={`text-green-700 bg-red-300 px-1.5 py-1 rounded-lg hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 cursor-pointer ${className}`}
      onClick={() => console.log('clicked')}
      {...restProps}
    >
      {labelText}
    </button>
  );
};
