import axios from 'axios';
import axiosInstance from './axios-instance';

type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  status: number;
  message?: string;
};

type ApiRequestOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: unknown;
  params?: unknown;
};

const apiRequest = async <T = unknown>(
  url: string,
  options: ApiRequestOptions,
): Promise<ApiResponse<T>> => {
  try {
    const response = await axiosInstance.request({
      url,
      ...options,
    });
    console.log('response', response);
    return {
      success: true,
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    console.error('API Request Error:', error);
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        status: error.response?.status || 500,
        message: error.response?.data.message,
      };
    }
    return {
      success: false,
      status: 500,
      message: '알 수 없는 오류가 발생했습니다.',
    };
  }
};

export default apiRequest;
