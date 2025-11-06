import axios from "axios";
import { apiDefaultUrl } from "../../constants";
import { useAuthenticationStore } from "../../stores/useAuthenticationStore";

export const api = axios.create({
  baseURL: apiDefaultUrl,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthenticationStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
let pendingQueue: Array<() => void> = [];

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error?.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        await new Promise<void>((resolve) => pendingQueue.push(resolve));
        original._retry = true;
        return api(original);
      }
      original._retry = true;
      isRefreshing = true;
      try {
        const { data } = await api.post<{ access_token: string }>("/auth/refresh");
        useAuthenticationStore.getState().setToken(data.access_token);
        pendingQueue.forEach((fn) => fn());
        pendingQueue = [];
        return api(original);
      } catch (e) {
        useAuthenticationStore.getState().logout();
        throw e;
      } finally {
        isRefreshing = false;
      }
    }
    throw error;
  }
);
