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
  isValid?: TextFieldStatus; // validation 결과
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
  isValid,
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
    if (isValid === 'error') {
      return 'pr-7 border-error';
    }
    if (isValid === 'warning') {
      return 'pr-7 border-warning';
    }
    if (isValid === 'confirm') {
      return 'pr-7 border-confirm';
    }
    return '';
  }, [isValid]);

  const statusIcon = useMemo(() => {
    const statusIconStyle = `
      ${isFocus ? 'visible' : 'invisible'}
      absolute right-2 top-2
    `;
    if (isValid === 'error') {
      return (
        <FontAwesomeIcon
          icon={faExclamationCircle}
          className={`${statusIconStyle} text-error`}
        />
      );
    }
    if (isValid === 'warning') {
      return (
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          className={`${statusIconStyle} text-warning`}
        />
      );
    }
    if (isValid === 'confirm') {
      return (
        <FontAwesomeIcon
          icon={faCheckCircle}
          className={`${statusIconStyle} text-confirm`}
        />
      );
    }
    return <></>;
  }, [isFocus, isValid]);

  return (
    <div className={`flex flex-col gap-0.5 w-${width}`}>
      <div className={'relative'}>
        <input
          type={type === 'password' ? 'password' : 'text'}
          placeholder={placeholder}
          className={`
        bg-bg-primary
          box-border w-full
          px-2.5 py-1.5
          text-basic text-ellipsis
          border-1 border-solid border-primary rounded-lg
          focus:outline-none focus:shadow-md
          ${isValid && isFocus ? statusStyle : ''}
          disabled:bg-bg-primary-darker disabled:text-text-primary-light disabled:border-primary-lighter
          ${className}
        `}
          onChange={handleChange}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          value={text}
          disabled={disabled}
        />
        {isValid && statusIcon}
      </div>
      <p className={'text-xs text-text-primary-light px-1'}>{helperText}</p>
    </div>
  );
};
