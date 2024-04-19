import { memo } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Button } from '@/components/ui';
import GoogleLogo from '@/assets/google-logo.svg?react';

export const GoogleLoginButton = memo(() => {
  const googleSocialLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async ({ code }) => {
      console.log(code);
      // 백앤드 api 연결
      // axios.post('http://localhost:어쩌구', { code }).then(({ data }) => {
      //   console.log(data);
      // });
      // 데이터 받아서 페이지 연결해줘야할듯
    },
    onError: errorResponse => {
      console.error(errorResponse);
    },
  });

  return (
    <Button
      type='outlined'
      size='medium'
      labelText='구글로 함께하기'
      icon={<GoogleLogo className='w-5 h-5' />}
      onClick={googleSocialLogin}
      className='w-64'
    />
  );
});
