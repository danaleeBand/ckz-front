import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '@/stores';

export const isUserAuthenticated = () => {
  const { accessToken } = useAuthStore.getState();

  if (!accessToken) {
    return false;
  }
  // accessToken 유효성 검사
  try {
    const { exp } = jwtDecode(accessToken) as { exp: number };
    return Date.now() < exp * 1000;
  } catch {
    return false;
  }
};
