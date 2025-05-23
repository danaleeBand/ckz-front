import apiRequest from '../api';

export const getAuthToken = async (provider: string, code: string) => {
  return apiRequest(`/auth/${provider}/token`, {
    method: 'GET',
    params: { code },
    timeout: 10000,
  });
};

export const requestLogout = async () => {
  return apiRequest('/auth/logout', {
    method: 'DELETE',
  });
};
