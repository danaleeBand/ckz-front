import { useAuthStore, useChecklistStore, useUserStore } from '@/stores';

export const logout = () => {
  const { setAccessToken } = useAuthStore.getState();
  const { setUserName, setProfileImageUrl } = useUserStore.getState();
  const { setLastViewedChecklistId } = useChecklistStore.getState();

  // TODO: 서버에 로그아웃 요청 보내기

  setAccessToken(null);
  setUserName(null);
  setProfileImageUrl(null);
  setLastViewedChecklistId(null);
};
