import { useCallback, useState } from 'react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuthStore } from '@/stores';

export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

export const useAxios = (baseConfig: AxiosRequestConfig) => {
  const [status, setStatus] = useState<RequestStatus>('idle');
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError>();

  const { accessToken } = useAuthStore();

  const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_BASE_URL,
    timeout: 4000,
  });

  instance.interceptors.request.use(
    config => {
      config.headers['Content-Type'] = 'application/json';
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
    error => {
      console.error('axios request error', error);
      return Promise.reject(error);
    },
  );
  instance.interceptors.response.use(
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

  const sendRequest = useCallback(
    async (config?: AxiosRequestConfig) => {
      console.log('fetchData', baseConfig);
      setStatus('loading');
      const finalConfig = {
        ...baseConfig,
        ...config,
      };
      await instance
        .request(finalConfig)
        .then(res => {
          console.log('res', res.data);
          setResponse(res);
          setStatus('success');
          return res;
        })
        .catch(err => {
          setError(err);
          setStatus('error');
        });
    },
    [baseConfig, instance],
  );

  return { status, response, error, sendRequest };
};
