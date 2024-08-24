import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, TextFieldStatus } from '@/components/ui';
import { ProfileImageInput } from './profile-image-input';
import { useUserStore } from '@/stores';
import { patchUser } from '@/api';

export const SignInForm = memo(() => {
  const navigate = useNavigate();
  const { name: userName, setUserName, setProfileImageUrl } = useUserStore();

  const textInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string>();
  const [nickname, setNickname] = useState<string>(userName ?? '');
  const [validationResult, setValidationResult] = useState<TextFieldStatus>(
    userName && userName.length >= 2 ? 'confirm' : 'error',
  );

  useEffect(() => {
    textInputRef.current?.focus();
  }, [textInputRef]);

  const handleInputOnChange = (value: string) => {
    setNickname(value);

    if (!value || value.length < 2) {
      setValidationResult('error');
    } else {
      setValidationResult('confirm');
    }
  };

  const handleSubmitButtonOnClick = async () => {
    if (validationResult === 'error') {
      textInputRef.current?.focus();
      return;
    }
    const response = await patchUser(nickname, imageUrl ?? '');
    if (response.success) {
      setUserName(nickname);
      setProfileImageUrl(imageUrl ?? '');
      alert('yes!');
    } else {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
    navigate('/');
  };

  const labelStyle = useMemo(() => {
    return `
    font-bold text-sm pr-5
    dark:text-dark-text-primary-light
  `;
  }, []);

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
                onChange={handleInputOnChange}
                validationResult={validationResult}
                textLimit={15}
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
