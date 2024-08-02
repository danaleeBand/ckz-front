import { memo, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, TextFieldStatus } from '@/components/ui';
import { ProfileImageInput } from './profile-image-input';
import { useUserStore } from '@/stores';
import { useAxios } from '@/hooks';

export const SignInForm = memo(() => {
  const { name: userName, setUserName, setProfileImageUrl } = useUserStore();
  const [imageUrl, setImageUrl] = useState<string>();

  const textInputRef = useRef<HTMLInputElement>(null);
  const [nickname, setNickname] = useState<string>(userName ?? '');
  const [validationResult, setValidationResult] =
    useState<TextFieldStatus>('error');

  const navigate = useNavigate();
  const { status, sendRequest } = useAxios({
    url: '/user',
    method: 'PATCH',
  });

  useEffect(() => {
    textInputRef.current?.focus();
  }, [textInputRef]);

  useEffect(() => {
    if (!nickname || nickname.length < 2) {
      setValidationResult('error');
    } else {
      setValidationResult('confirm');
    }
  }, [nickname]);

  const handleSubmitButtonOnClick = async () => {
    if (validationResult === 'error') {
      textInputRef.current?.focus();
      return;
    }

    if (status === 'idle') {
      sendRequest({
        data: {
          name: nickname,
          profile_image_url: imageUrl,
        },
      });
    }
  };

  useEffect(() => {
    if (status === 'success') {
      setUserName(nickname);
      setProfileImageUrl(imageUrl ?? '');
      // TODO: 다른 화면에서 처리할 듯, alert 말고 모달
      alert('yes!');
      navigate('/');
    } else if (status === 'error') {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  }, [navigate, status]);

  const labelStyle = `
    font-bold text-sm pr-5
    dark:text-dark-text-primary-light
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
