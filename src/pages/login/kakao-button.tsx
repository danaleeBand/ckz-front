import { memo } from 'react';
import { Button } from '@/components/ui';
import KakaoLogo from '@/assets/kakao-logo.svg?react';

export const KakaoLoginButton = memo(() => {
  const url = `${import.meta.env.VITE_SERVER_BASE_URL}/auth/kakao`;

  return (
    <Button
      type='outlined'
      size='medium'
      labelText='카카오로 함께하기'
      icon={<KakaoLogo className='w-5 h-5' />}
      className='w-64'
      onClick={() => window.open(url, '_self')}
    />
  );
});
