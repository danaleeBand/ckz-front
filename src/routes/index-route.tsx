import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isUserAuthenticated, logout } from '@/utils';
import { getUser, UserGetResponse } from '@/api';
import { useAuthStore, useUserStore } from '@/stores';
import { pageRoutes } from '@/constants';

export const IndexRoute = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuthStore();
  const { setUserName, setProfileImageUrl } = useUserStore();

  const getUserInfo = async () => {
    const userApiResponse = await getUser();
    if (userApiResponse.success) {
      const {
        name,
        profile_image_url: imageUrl,
        is_checky: isChecky,
      } = userApiResponse.data as UserGetResponse;

      setUserName(name);
      setProfileImageUrl(imageUrl);

      if (isChecky) {
        navigate(pageRoutes.CHECKLIST);
      } else {
        navigate(pageRoutes.JOIN);
      }
    } else {
      alert('사용자 정보를 가져오는데 실패했습니다.');
      logout();
      navigate('/');
    }
  };

  useEffect(() => {
    if (!accessToken || !isUserAuthenticated()) {
      navigate(pageRoutes.LOGIN);
    } else {
      getUserInfo();
    }
  }, []);

  return null;
};
