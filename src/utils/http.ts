/*
 * @Author: 桂佳囿
 * @Date: 2025-01-18 16:55:06
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-01-18 20:50:10
 * @Description: http实例
 */

import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosResponse } from "axios";

const http = axios.create({
  baseURL: "http://127.0.0.1:9000/api/",
  timeout: 3000
});

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig ) => {
    const token = localStorage.getItem("token");
    if (token) config.headers!.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response:AxiosResponse) => {
    if(response.status && response.status!==200) return Promise.reject(new Error())
    return response;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

export { http };