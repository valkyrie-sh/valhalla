import axios from 'axios';
import { Configuration, DefaultApi } from "@/api-client";

const config = new Configuration({
  basePath: `${process.env.NEXT_PUBLIC_ODIN_API_URL}/api`,
});

const axiosInstance = axios.create({
  baseURL: config.basePath,
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};
    config.headers['Content-Type'] = 'application/json';
    config.headers['X-Auth-Token'] = process.env.NEXT_PUBLIC_ODIN_AUTH_TOKEN;    
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export const api = new DefaultApi(config, config.basePath, axiosInstance);