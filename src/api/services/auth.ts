import apiRequest from '../api';

export const getAuthToken = async (provider: string, code: string) => {
  return apiRequest(`/auth/${provider}/token`, {
    method: 'GET',
    params: { code },
  });
};

export const requestLogout = async () => {
  return apiRequest('/auth/logout', {
    method: 'DELETE',
  });
};
