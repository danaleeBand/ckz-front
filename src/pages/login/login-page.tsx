import { GoogleLoginButton } from './google-button';
import { KakaoLoginButton } from './kakao-button';

export const LoginPage = () => {
  return (
    <div className='flex flex-row w-screen h-screen'>
      <div
        className={`flex flex-col gap-6 w-2/5 pt-60 shadow-2xl z-10 
        bg-bg-elevated dark:bg-dark-bg-elevated`}
      >
        <div className='flex justify-center'>
          <img src='/images/checkuiz-logo.png' alt='logo' className='w-96' />
        </div>
        <div className='flex flex-col justify-center items-center gap-1.5 mr-8'>
          <GoogleLoginButton />
          <KakaoLoginButton />
        </div>
      </div>
      <div className='flex bg-primary w-3/5 h-full z-0 justify-center items-center'>
        <img
          src='/images/index_image.png'
          alt='login-example'
          className='w-full px-20'
        />
      </div>
    </div>
  );
};
