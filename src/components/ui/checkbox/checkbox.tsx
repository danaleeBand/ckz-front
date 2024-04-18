import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';

export type CheckboxProps = {
  checked: boolean;
  indeterminate?: boolean;
  onChange?: (_: boolean) => void;
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
        w-4 h-4 bg-bg-basic dark:bg-dark-bg-basic
        hover:bg-bg-dark dark:hover:bg-dark-bg-light
        rounded-sm border-border-primary border-1 border-solid
      checked:bg-bg-primary dark:checked:bg-dark-bg-primary checked:border-0 
      checked:hover:bg-bg-primary-light dark:checked:hover:bg-dark-bg-primary-light
      indeterminate:bg-bg-primary dark:indeterminate:bg-dark-bg-primary indeterminate:border-0
      indeterminate:hover:bg-bg-primary-light dark:indeterminate:hover:bg-dark-bg-primary-light
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
          className={`absolute w-4 h-4 text-text-inverse dark:text-dark-text-inverse 
            pointer-events-none peer-checked:block outline-none`}
          icon={faCheck}
        />
      )}
      {indeterminate && (
        <FontAwesomeIcon
          className={`absolute w-4 h-4 text-text-inverse dark:text-dark-text-inverse 
            pointer-events-none peer-checked:block outline-none`}
          icon={faMinus}
        />
      )}
      {label && (
        <label
          className='cursor-pointer h-5 text-text-basic dark:text-dark-text-basic text-sm align-middle'
          htmlFor={'custom-checkbox-input'}
        >
          {label}
        </label>
      )}
    </div>
  );
};
