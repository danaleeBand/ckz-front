import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAuthStore, useUserStore } from '@/stores';
import { useAxios } from '@/hooks';

export const Auth = () => {
  const { provider } = useParams();

  const [jwtAccessToken, setJwtAccessToken] = useState('');
  const mounted = useRef(false);

  const navigate = useNavigate();
  const { setAccessToken } = useAuthStore();
  const { setUserName } = useUserStore();

  const [queryParams] = useSearchParams();
  const code = queryParams.get('code');

  // 1. 소셜 인증 code로 jwt 토큰 가져오기
  const {
    status: tokenRequestStatus,
    response: tokenResponse,
    error: tokenError,
    sendRequest: sendTokenRequest,
  } = useAxios({
    url: `/auth/${provider}/token`,
    method: 'GET',
    params: { code },
  });

  // 컴포넌트 최초 mount 시 jwt 토큰 요청
  useEffect(() => {
    if (!mounted.current) {
      sendTokenRequest();
      mounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  }, [navigate, setAccessToken, tokenError, tokenRequestStatus, tokenResponse]);

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
  }, [jwtAccessToken, sendUserRequest, userApiRequestStatus]);

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
  }, [
    navigate,
    setAccessToken,
    setUserName,
    userApiRequestStatus,
    userApiError,
    userApiResponse,
  ]);

  return null;
};
