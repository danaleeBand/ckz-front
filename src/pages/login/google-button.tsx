import { memo } from 'react';
import { Button } from '@/components/ui';
import GoogleLogo from '@/assets/google-logo.svg?react';

export const GoogleLoginButton = memo(() => {
  const url = `${import.meta.env.VITE_SERVER_BASE_URL}/auth/google`;

  return (
    <Button
      type='outlined'
      size='medium'
      labelText='구글로 함께하기'
      icon={<GoogleLogo className='w-5 h-5' />}
      onClick={() => window.open(url, '_self')}
      className='w-64'
    />
  );
});
