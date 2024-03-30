import { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';

axios.defaults.baseURL = ''; // TODO: BASE API URL

export const useAxios = (axiosParams: AxiosRequestConfig) => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async (params: AxiosRequestConfig) => {
    await axios
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
  }, []);

  const sendData = () => {
    fetchData(axiosParams);
  };

  return { response, error, loading, sendData };
};
