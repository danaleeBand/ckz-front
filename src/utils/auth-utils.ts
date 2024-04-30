import { useAuthStore } from '@/stores';

export const isUserAuthenticated = () => {
  const { accessToken } = useAuthStore.getState();
  return !!accessToken;
};
