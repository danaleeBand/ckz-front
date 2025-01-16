import apiRequest from '../api';

export const getUser = async () => {
  return apiRequest('/users', { method: 'GET' });
};

export const patchUser = async (name: string, profileImageUrl: string) => {
  return apiRequest('/users', {
    method: 'PATCH',
    data: { name, profile_image_url: profileImageUrl },
  });
};
