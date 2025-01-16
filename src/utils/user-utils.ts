import { requestLogout } from '@/api';
import { useAuthStore, useChecklistStore, useUserStore } from '@/stores';

export const logout = async () => {
  const { setAccessToken } = useAuthStore.getState();
  const { setUserName, setProfileImageUrl } = useUserStore.getState();
  const { setLastViewedChecklistId } = useChecklistStore.getState();

  // backend 로그아웃 처리
  await requestLogout();

  // store 초기화
  setAccessToken(null);
  setUserName(null);
  setProfileImageUrl(null);
  setLastViewedChecklistId(null);
};
