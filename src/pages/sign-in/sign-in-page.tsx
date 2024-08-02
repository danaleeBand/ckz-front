import { memo } from 'react';
import { SignInHeader } from './sign-in-header';
import { SignInForm } from './form';

export const SignInPage = memo(() => {
  return (
    <div className='w-screen h-screen dark:bg-dark-bg-elevated'>
      <SignInHeader />
      <div className='flex justify-center mt-16'>
        <SignInForm />
      </div>
    </div>
  );
});
