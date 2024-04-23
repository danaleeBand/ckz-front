import { useNavigate } from 'react-router-dom';
import mainLogo from '/images/checkuiz-logo.png';
import darkLogo from '/images/checkuiz-logo-dark.png';
import { useThemeStore } from '@/stores';
import { THEME_TYPES } from '@/constants';

export const SignInHeader = () => {
  const { theme } = useThemeStore();
  const { THEME_DARK } = THEME_TYPES;

  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate('/');
  };

  return (
    <div className='w-full shadow-sm'>
      <img
        src={theme === THEME_DARK ? darkLogo : mainLogo}
        onClick={handleOnClick}
        alt='logo'
        className='h-16 mt-2 ml-6 pb-2 cursor-pointer'
      />
    </div>
  );
};
