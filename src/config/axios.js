import axios from "axios";
import { getAccessToken, removeAccessToken } from "../utils/local-storage";

axios.defaults.url = "http://localhost:3000";

axios.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${getAccessToken()}`;
  }
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      if (getAccessToken()) {
        removeAccessToken();
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  }
);

export default axios;
