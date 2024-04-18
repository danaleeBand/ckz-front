import { useMemo, useState } from 'react';
import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type TextFieldStatus = 'error' | 'warning' | 'confirm';
export type TextFieldType = 'text' | 'number' | 'password';

export type TextFieldProps = {
  type?: TextFieldType;
  validationResult?: TextFieldStatus; // validation 결과
  placeholder?: string;
  value?: string;
  onChange?: (value: string | number) => void;
  helperText?: string;
  textLimit?: number; // value의 글자수 제한
  className?: string;
  width?: number; // tailwindcss width
  disabled?: boolean;
};

export const TextField = ({
  type = 'text',
  value = '',
  onChange,
  placeholder,
  helperText,
  validationResult,
  textLimit,
  className,
  width = 64,
  disabled,
}: TextFieldProps) => {
  const [text, setText] = useState<string>(value);
  const [isFocus, setIsFocus] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newText = `${e.target.value}`;
    if (textLimit && newText.length > textLimit) {
      newText = newText.slice(0, textLimit);
    }
    if (type === 'number') {
      newText = newText.replace(/[^0-9]/g, '');
    }
    if (type === 'password') {
      newText = newText.replace(/[^a-zA-Z0-9!@#$%^*+=-]/g, '');
    }
    setText(newText);
    onChange?.(newText);
  };

  // validation 결과에 따른 스타일, 아이콘
  const statusStyle = useMemo(() => {
    if (!validationResult || !isFocus) {
      return 'border-border-primary ';
    }
    if (validationResult === 'error') {
      return 'pr-7 border-error';
    }
    if (validationResult === 'warning') {
      return 'pr-7 border-warning';
    }
    if (validationResult === 'confirm') {
      return 'pr-7 border-confirm';
    }
    return '';
  }, [validationResult, isFocus]);

  const statusIcon = useMemo(() => {
    const statusIconStyle = `
      ${isFocus ? 'visible' : 'invisible'}
      absolute right-2 top-2
    `;
    if (validationResult === 'error') {
      return (
        <FontAwesomeIcon
          icon={faExclamationCircle}
          className={`${statusIconStyle} text-error`}
        />
      );
    }
    if (validationResult === 'warning') {
      return (
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          className={`${statusIconStyle} text-warning`}
        />
      );
    }
    if (validationResult === 'confirm') {
      return (
        <FontAwesomeIcon
          icon={faCheckCircle}
          className={`${statusIconStyle} text-confirm`}
        />
      );
    }
    return <></>;
  }, [isFocus, validationResult]);

  return (
    <div className={`flex flex-col gap-0.5 w-${width}`}>
      <div className={'relative w-full'}>
        <input
          type={type === 'password' ? 'password' : 'text'}
          placeholder={placeholder}
          className={`
          bg-bg-basic dark:bg-dark-bg-basic
          box-border w-full
          px-2.5 py-1.5 align-middle
          text-basic text-ellipsis text-text-basic dark:text-dark-text-basic
          border-1 border-solid rounded-lg border-border-primary dark:border-dark-border-primary 
          focus:outline-none focus:shadow-md
          ${statusStyle}
          disabled:bg-bg-darker disabled:text-text-lighter
          dark:disabled:bg-dark-bg-light dark:disabled:text-dark-text-dark
          ${className}
        `}
          onChange={handleChange}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          value={text}
          disabled={disabled}
        />
        {validationResult && statusIcon}
      </div>
      <p
        className={'text-xs text-text-lighter dark:text-dark-text-darker px-1'}
      >
        {helperText}
      </p>
    </div>
  );
};
