import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";


import axios from "axios";
import { BASE_URL } from ".";

export const controllerInstanceFlow = new AbortController();

const instanceAxios = axios.create({
  baseURL: BASE_URL,
  // signal: controllerInstanceFlow.signal,
});

instanceAxios.interceptors.request.use(async (request) => {
//   const token = await getStorage(USER_TOKEN_STORAGE);

//   if (!token) return request;

//   request.headers.Authorization = `Bearer ${token}`;

  return request;
});

export { instanceAxios };

export const connection = (instance: AxiosInstance = instanceAxios) => {
  return {
    get: async (path: string, params?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<any, any>> => {
      return await instance.get(path, { params });
    },

    post: async (path: string, data?: any, config?: AxiosRequestConfig<any> | undefined) => {
      return await instance.post(path, data, { ...config });
    },

    put: async (path: string, data?: any, config?: AxiosRequestConfig<any> | undefined) => {
      return await instance.put(path, data, { ...config });
    },

    patch: async (path: string, data: any, config?: AxiosRequestConfig<any> | undefined) => {
      return await instance.patch(path, data, { ...config });
    },

    delete: (path: string) => {
      return instance.delete(path);
    },
  };
};