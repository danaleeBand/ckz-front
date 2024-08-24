import apiRequest from '../api';

export type AuthTokenGetResponse = {
  accessToken: string;
  refreshToken: string;
};

export const getAuthToken = async (provider: string, code: string) => {
  return apiRequest(`/auth/${provider}/token`, {
    method: 'GET',
    params: { code },
  });
};
