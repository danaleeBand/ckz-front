import apiRequest from '../api';
import { UserGetResponse } from '../models';

export const getUser = async () => {
  const response = await apiRequest('/users', { method: 'GET' });
  return response.data as UserGetResponse;
};

export const patchUser = async (name: string, profileImageUrl: string) => {
  return apiRequest('/users', {
    method: 'PATCH',
    data: { name, profile_image_url: profileImageUrl },
  });
};
