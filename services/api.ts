import axios from 'axios';
import { useRuntimeConfig } from '#app';

export const createApiClient = () => {
  const config = useRuntimeConfig();
  
  return axios.create({
    baseURL: config.public.apiBaseUrl,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

// 使用範例
export const apiClient = createApiClient(); 