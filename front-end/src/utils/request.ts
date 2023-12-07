import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "./utils";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 3000,
  headers: {},
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<unknown>) => {
    if (getAccessToken()) {
      config.headers["Authorization"] = `Bearer ${getAccessToken()}`;
    }
    return config;
  }
);

export async function fetcher<T = unknown>(
  config: AxiosRequestConfig,
  fullResult?: boolean
): Promise<T> {
  let result = null;
  let error: Error | null = null;

  try {
    const { data } = await instance({ ...config });

    if (data.statusCode >= 0) {
      // 默认: 仅返回 result 数据字段
      result = fullResult ? data : data.result;
    } else {
      error = new Error(data.message);
    }
  } catch (err: any) {
    console.log(err, "rerer");
    if (err.response?.status === 401 && config.url !== "/auth/login") {
      history.
      console.log("您离上次登录已经超过1小时， 请尝试重新登录！！！");
      alert("您离上次登录已经超过1小时， 请尝试重新登录！！！");
    }

    error = new Error(err.response?.data?.message ?? err.message);
  }

  if (error) {
    alert(error.message);
  }

  return result;
}

export default instance;
