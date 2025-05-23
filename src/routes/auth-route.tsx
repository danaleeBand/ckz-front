import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '@/stores';
import { resetUserInfo } from '@/utils';
import { AuthTokenGetResponse, getAuthToken } from '@/api';

export const AuthRoute = () => {
  const { provider } = useParams();
  const [queryParams] = useSearchParams();
  const code = queryParams.get('code');
  const navigate = useNavigate();

  const { setAccessToken } = useAuthStore();

  // 로그인 처리
  const handleLogin = async () => {
    if ((provider !== 'kakao' && provider !== 'google') || !code) {
      alert('잘못된 요청입니다.');
      navigate('/');
      return;
    }

    // 소셜 인증 code로 jwt 토큰 가져오기
    const tokenResponse = await getAuthToken(provider, code);
    console.log(tokenResponse); // TODO: 삭제
    if (tokenResponse.success) {
      const { accessToken } = tokenResponse.data as AuthTokenGetResponse;
      setAccessToken(accessToken);
    } else {
      alert('로그인에 실패했습니다.');
      resetUserInfo();
    }
    navigate('/');
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return null;
};
