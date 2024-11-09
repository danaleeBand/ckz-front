import axios from 'axios';
import { useAuthStore } from '@/stores';

type FailedQueuePromise = {
  resolve: (value?: string | PromiseLike<string>) => void;
  reject: (reason?: unknown) => void;
};
let failedQueue: Array<FailedQueuePromise> = [];
let isRefreshing = false;

const addToFailedQueue = () =>
  new Promise((resolve, reject) => {
    console.log('addToFailedQueue');
    failedQueue.push({ resolve, reject });
  });

const processFailedQueue = (error: unknown, token?: string) => {
  console.log('processFailedQueue');
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  failedQueue = [];
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  timeout: 4000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  config => {
    config.withCredentials = true;
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
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest.retry) {
      console.error('Access token expired');

      originalRequest.retry = true;
      if (isRefreshing) {
        return addToFailedQueue().then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        });
      }
      isRefreshing = true;

      return refreshAccessToken()
        .then(token => {
          processFailedQueue(null, token);
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        })
        .catch(err => {
          processFailedQueue(err);
          return Promise.reject(err);
        })
        .finally(() => {
          isRefreshing = false;
        });
    }
    return Promise.reject(error);
  },
);

const refreshAccessToken = async () => {
  console.log('refreshAccessToken');
  const response = await axios.get(
    `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
    { withCredentials: true },
  );
  const newToken = response.data.accessToken;
  useAuthStore.setState({ accessToken: newToken });
  return newToken;
};

export default axiosInstance;
