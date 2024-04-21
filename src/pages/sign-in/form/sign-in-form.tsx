import { memo, useEffect, useRef, useState } from 'react';
import { Button, TextField, TextFieldStatus } from '@/components/ui';
import { ProfileImageInput } from './profile-image-input';

export const SignInForm = memo(() => {
  const [imageUrl, setImageUrl] = useState<string>();

  const textInputRef = useRef<HTMLInputElement>(null);
  const [nickname, setNickname] = useState<string>();
  const [validationResult, setValidationResult] =
    useState<TextFieldStatus>('error');

  useEffect(() => {
    textInputRef.current?.focus();

    // TODO: 초기에 받은 데이터 세팅
  }, [textInputRef]);

  useEffect(() => {
    if (!nickname || nickname.length < 2) {
      setValidationResult('error');
    } else {
      setValidationResult('confirm');
    }
  }, [nickname]);

  const handleSubmitButtonOnClick = async () => {
    // TODO: validation, api 연결
    if (validationResult === 'error') {
      textInputRef.current?.focus();
      return;
    }
    const postData = {
      nickname,
      imageUrl,
    };

    // TODO: 다른 화면에서 처리할 듯, alert 말고 모달
    alert('yes!');
  };

  const labelStyle = `
    font-bold text-sm pr-5
  `;

  return (
    <div className='flex flex-col w-fit justify-center items-center'>
      <div>
        <p
          className={`text-2xl font-bold mb-6
          text-text-primary-dark dark:text-dark-text-primary-light`}
        >
          기본 정보만 입력하면 첵키가 될 수 있어요
        </p>
      </div>
      <table className='border-separate border-spacing-y-6 mb-8'>
        <tbody>
          <tr>
            <td>
              <p className={labelStyle}>닉네임</p>
            </td>
            <td aria-label='닉네임'>
              <TextField
                type='text'
                value={nickname}
                onChange={value => setNickname(value as string)}
                validationResult={validationResult}
                textLimit={8}
                helperText={
                  validationResult === 'error'
                    ? '닉네임을 두 글자 이상 입력해주세요.'
                    : ''
                }
                ref={textInputRef}
              />
            </td>
          </tr>
          <tr>
            <td>
              <p className={labelStyle}>프로필</p>
            </td>
            <td aria-label='프로필'>
              <ProfileImageInput setImage={setImageUrl} />
            </td>
          </tr>
        </tbody>
      </table>
      <Button
        labelText='Checkuiz~?'
        size='large'
        onClick={handleSubmitButtonOnClick}
        className='w-64'
      />
    </div>
  );
});
