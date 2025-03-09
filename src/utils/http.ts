/*
 * @Author: 桂佳囿
 * @Date: 2025-01-18 16:55:06
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-03-05 22:45:53
 * @Description: http实例
 */

import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { Storage } from '@/utils/storage'

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
});

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig ) => {
    const token = Storage.getItem('token');
    if (token) config.headers!.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response:AxiosResponse) => {
    if(response.status && response.status !== 200) return Promise.reject(new Error())
    return response;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

export { http };