import axios from 'axios';
import { useAuthStore } from '@/stores';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  timeout: 4000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json';
    config.headers.Authorization = `Bearer ${useAuthStore.getState().accessToken}`;
    return config;
  },
  error => {
    console.error('axios request error', error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    // TODO: 오류 페이지 interceptor 추가
    console.log('interceptor response', response);
    return response;
  },
  async error => {
    console.log('error', error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
