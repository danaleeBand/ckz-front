import { memo } from 'react';
import { openPopup } from '@/utils';
import { Button } from '@/components/ui';
import KakaoLogo from '@/assets/kakao-logo.svg?react';

export const KakaoLoginButton = memo(() => {
  const url = `${import.meta.env.VITE_BASE_URL}/auth/kakao`;

  return (
    <Button
      type='outlined'
      size='medium'
      labelText='카카오로 함께하기'
      icon={<KakaoLogo className='w-5 h-5' />}
      className='w-64'
      onClick={() => openPopup(url)}
    />
  );
});
