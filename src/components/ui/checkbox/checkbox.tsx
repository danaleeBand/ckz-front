import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';

export type CheckboxProps = {
  checked: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  className?: string;
};

export const Checkbox = ({
  checked = false,
  indeterminate = false,
  onChange,
  className,
  label,
}: CheckboxProps) => {
  const checkBoxRef = useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  useEffect(() => {
    if (checkBoxRef?.current) {
      checkBoxRef.current.indeterminate = indeterminate;
      checkBoxRef.current.checked = checked;
    }
  }, [indeterminate, checked]);

  return (
    <div className='flex gap-1 h-5 items-center'>
      <input
        type='checkbox'
        ref={checkBoxRef}
        id='custom-checkbox-input'
        className={`
        appearance-none shrink-0 
        w-4 h-4 bg-bg-primary
        rounded-sm border-text-primary-lighter border-1 border-solid
      checked:bg-primary checked:border-0 
      checked:hover:bg-primary-light
      indeterminate:bg-primary indeterminate:border-0
      indeterminate:hover:bg-primary-light
        cursor-pointer
        ${className}
      `}
        onChange={event => {
          setIsChecked(event.target?.checked);
          onChange?.(event.target?.checked);
        }}
      />
      {isChecked && !indeterminate && (
        <FontAwesomeIcon
          className='absolute w-4 h-4 text-white pointer-events-none peer-checked:block outline-none'
          icon={faCheck}
        />
      )}
      {indeterminate && (
        <FontAwesomeIcon
          className='absolute w-4 h-4 text-white pointer-events-none peer-checked:block outline-none'
          icon={faMinus}
        />
      )}
      {label && (
        <label
          className='cursor-pointer h-5 text-text-primary text-sm align-middle'
          htmlFor={'custom-checkbox-input'}
        >
          {label}
        </label>
      )}
    </div>
  );
};
