import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAuthStore, useUserStore } from '@/stores';
import { useAxios } from '@/hooks';

export const AuthRoute = () => {
  const { provider } = useParams();
  const [queryParams] = useSearchParams();
  const code = queryParams.get('code');
  const navigate = useNavigate();

  const { setAccessToken } = useAuthStore();
  const { setUserName } = useUserStore();
  const [jwtAccessToken, setJwtAccessToken] = useState('');

  useEffect(() => {
    if (provider !== 'kakao' && provider !== 'google') {
      alert('잘못된 접근입니다.');
      navigate('/');
    }
  }, [provider]);

  // 1. 소셜 인증 code로 jwt 토큰 가져오기
  const {
    status: tokenRequestStatus,
    response: tokenResponse,
    error: tokenError,
  } = useAxios(
    {
      url: `/auth/${provider}/token`,
      method: 'GET',
      params: { code },
    },
    true,
  );

  // jwt 토큰 저장
  useEffect(() => {
    if (tokenRequestStatus === 'success' && tokenResponse) {
      const { accessToken } = tokenResponse.data;
      setAccessToken(accessToken);
      setJwtAccessToken(accessToken);
    } else if (tokenRequestStatus === 'error' && tokenError) {
      alert('로그인에 실패했습니다.');
      setAccessToken(null);
      navigate('/');
    }
  }, [tokenError, tokenRequestStatus, tokenResponse]);

  // 2. 사용자 정보 가져오기
  const {
    status: userApiRequestStatus,
    response: userApiResponse,
    error: userApiError,
    sendRequest: sendUserRequest,
  } = useAxios({
    url: '/user',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwtAccessToken}`,
    },
  });

  // 사용자 정보 요청
  useEffect(() => {
    if (jwtAccessToken && userApiRequestStatus === 'idle') {
      sendUserRequest();
    }
  }, [jwtAccessToken, userApiRequestStatus]);

  // 사용자 정보 저장
  useEffect(() => {
    if (userApiRequestStatus === 'success' && userApiResponse) {
      const { name, is_checky: isChecky } = userApiResponse.data;
      setUserName(name);
      navigate(isChecky ? '/' : '/join');
    } else if (userApiRequestStatus === 'error' && userApiError) {
      alert('사용자 정보를 가져오는 데 실패했습니다.');
      setAccessToken(null);
      setUserName(null);
      navigate('/');
    }
  }, [userApiRequestStatus, userApiError, userApiResponse]);

  return null;
};
