import { apiRoutes } from '@/constants/api';
import apiRequest from '../api';

export type AuthTokenGetResponse = {
  accessToken: string;
  refreshToken: string;
};

export const getAuthToken = async (provider: string, code: string) => {
  return apiRequest(apiRoutes.auth.AUTH_TOKEN, {
    method: 'GET',
    params: { code },
    pathParams: { provider },
  });
};

export const requestLogout = async () => {
  return apiRequest(apiRoutes.auth.LOGOUT, {
    method: 'DELETE',
  });
};
