import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isUserAuthenticated, logout } from '@/utils';
import { getUser } from '@/api';
import { useAuthStore, useUserStore } from '@/stores';

export const IndexRoute = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuthStore();
  const { setUserName, setProfileImageUrl } = useUserStore();

  const getUserInfo = async () => {
    try {
      const userApiResponse = await getUser();
      const {
        name,
        profile_image_url: imageUrl,
        is_checky: isChecky,
      } = userApiResponse;

      setUserName(name);
      setProfileImageUrl(imageUrl);

      if (isChecky) {
        navigate('/checklist');
      } else {
        navigate('/join');
      }
    } catch (error) {
      alert('사용자 정보를 가져오는데 실패했습니다.');
      await logout();
      navigate('/');
    }
  };

  useEffect(() => {
    if (!accessToken || !isUserAuthenticated()) {
      navigate('/login');
    } else {
      getUserInfo();
    }
  }, []);

  return null;
};
