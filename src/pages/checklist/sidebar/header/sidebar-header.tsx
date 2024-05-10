import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui';
import { useAuthStore, useUserStore } from '@/stores';

export const SidebarHeader = () => {
  const { name } = useUserStore();
  const { setAccessToken } = useAuthStore();
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();

  const handleClick = () => {
    setAccessToken(null);
    navigate('/login');
  };

  return (
    <div>
      {name} {accessToken} <Button labelText='로그아웃' onClick={handleClick} />
    </div>
  );
};
