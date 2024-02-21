import type { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'

const request: AxiosInstance = axios.create({
  baseURL: '/',
  // withCredentials: true, // 是否跨站点请求 Access-Control
  timeout: 5000
})

request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

export default request
