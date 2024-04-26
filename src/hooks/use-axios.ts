import { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores';

export const useAxios = (axiosParams: AxiosRequestConfig) => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState<boolean>(true);

  const { accessToken } = useAuthStore();

  const instance = axios.create({
    baseURL: import.meta.env.BASE_URL,
    timeout: 1000,
  });

  instance.interceptors.request.use(
    config => {
      config.headers['Content-Type'] = 'application/json';
      config.headers['access-token'] = accessToken;

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
      return response;
    },
    async error => {
      if (error.response?.status === 401) {
        // TODO: 토큰 말료시 refreshToken으로 accessToken 갱신
        console.log('interceptor 401 error', error);
        return instance.request(error.config);
      }
      return Promise.reject(error);
    },
  );

  const fetchData = async (params: AxiosRequestConfig) => {
    await instance
      .request(params)
      .then(res => {
        setResponse(res);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (axiosParams.method === 'GET' || axiosParams.method === 'get') {
      fetchData(axiosParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendData = () => {
    fetchData(axiosParams);
  };

  return { response, error, loading, sendData };
};
