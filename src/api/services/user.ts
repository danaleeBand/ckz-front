import apiRequest from '../api';

export type UserGetResponse = {
  name: string;
  profile_image_url: string;
  is_checky: boolean;
};

export const getUser = async () => {
  return apiRequest('/users', { method: 'GET' });
};

export const patchUser = async (name: string, profileImageUrl: string) => {
  return apiRequest('/users', {
    method: 'PATCH',
    data: { name, profile_image_url: profileImageUrl },
  });
};
