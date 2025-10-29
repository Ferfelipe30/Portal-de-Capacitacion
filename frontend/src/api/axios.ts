import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL,
});

let isRefreshing = false;
let failedQueue: { resolve: (v?: unknown) => void; reject: (e?: unknown) => void; config: any }[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      if (token && prom.config) {
        prom.config.headers["Authorization"] = `Bearer ${token}`;
      }
      prom.resolve(api(prom.config));
    }
  });
  failedQueue = [];
};

api.interceptors.request.use((config) => {
  const access = localStorage.getItem("access");
  if (access) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${access}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      isRefreshing = true;
      const refresh = localStorage.getItem("refresh");

      if (!refresh) {
        isRefreshing = false;
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh/`, { refresh });
        const newAccess = data.access as string;
        localStorage.setItem("access", newAccess);

        processQueue(null, newAccess);
        return api(originalRequest);
      } catch (err) {
        processQueue(err as unknown, null);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;