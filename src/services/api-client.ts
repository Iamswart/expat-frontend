import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "x-api-key": import.meta.env.VITE_API_KEY,
  },
});

class APIClient {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<R = any>(config?: AxiosRequestConfig) {
    return axiosInstance.get<R>(this.endpoint, config).then((res) => res.data);
  }

  get<R = any>(id: number | string, config?: AxiosRequestConfig) {
    return axiosInstance
      .get<R>(`${this.endpoint}/${id}`, config)
      .then((res) => res.data);
  }

  getWithQuery<R = any>(
    query: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return axiosInstance
      .get<R>(`${this.endpoint}?${query}`, config)
      .then((res) => res.data);
  }

  post<T, R = T>(data: T, config?: AxiosRequestConfig): Promise<R> {
    return axiosInstance
      .post<R>(this.endpoint, data, config)
      .then((res) => res.data);
  }

  put<T, R = T>(id: number | string, data: T, config?: AxiosRequestConfig) {
    return axiosInstance
      .put<R>(`${this.endpoint}/${id}`, data, config)
      .then((res) => res.data);
  }

  patch<T, R = T>(data: T, config?: AxiosRequestConfig): Promise<R> {
    return axiosInstance
      .patch<R>(this.endpoint, data, config)
      .then((res) => res.data);
  }

  delete<R = any>(id: number | string, config?: AxiosRequestConfig) {
    return axiosInstance
      .delete<R>(`${this.endpoint}/${id}`, config)
      .then((res) => res.data);
  }
}

export default APIClient;
