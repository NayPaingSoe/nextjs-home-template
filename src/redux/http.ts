import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { store } from "../redux/store";
import { clearToken } from "./features/AuthSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCookie, getCookie, removeCookie } from "@/utils/cookie";

const http = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_APP_BASE_URL}`,
});

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const state = store.getState();
    const token = state.auth.token;
    console.log("token", token);
    if (token) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    if (config.headers) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    if (error.response && error.response.status === 422) {
      return error.response;
    }
    return Promise.reject(error);
  }
);

const ensureToken = async () => {
  const res = await getCookie("userInfo");
  const response = res
    ? (JSON.parse(res) as {
        status: number;
        data: { userData: { token: string } };
      })
    : null;
  if (response?.status === 200) {
    const userInfo = response.data.userData;
    const token = userInfo.token;

    if (!token) {
      throw new Error("Token not available");
    }
    return token;
  } else {
    throw new Error("Token not available");
  }
};

export const login = async (uri: string, data: FormData) => {
  try {
    const response: AxiosResponse<{
      user: { id: string; name: string; email: string; status: string };
      token: string;
    }> = await http.post(uri, data);
    if (response.status === 422) {
      return response;
    }
    const apiFormData = new FormData();
    const user = response.data.user;
    apiFormData.append("token", response.data.token);
    apiFormData.append("id", user.id);
    apiFormData.append("name", user.name);
    apiFormData.append("email", user.email);
    apiFormData.append("status", user.status);

    setCookie("userInfo", apiFormData);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 422) {
      return error.response;
    }
    throw error;
  }
};
export const register = async (uri: string, data: FormData) => {
  try {
    const response: AxiosResponse<{
      user: { id: string; name: string; email: string; status: string };
      token: string;
    }> = await http.post(uri, data);
    if (response.status === 422) {
      return response;
    }
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 422) {
      return error.response;
    }
    throw error;
  }
};
export const verifycode = async (uri: string, data: FormData) => {
  try {
    const response: AxiosResponse<{
      user: {
        id: number;
        name: string;
        email: string;
        status: string;
        profile_status: string | null;
      };
      token: string;
    }> = await http.post(uri, data);
    if (response.status === 422) {
      return response;
    }
    const apiFormData = new FormData();
    const user = response.data.user;
    apiFormData.append("token", response.data.token);
    apiFormData.append("id", user.id.toString());
    apiFormData.append("name", user.name);
    apiFormData.append("email", user.email);
    apiFormData.append("status", user.status);

    setCookie("userInfo", apiFormData);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 422) {
      return error.response;
    }
    throw error;
  }
};

export const fetchDataWithToken = async (uri: string) => {
  try {
    await ensureToken();
    const response = await http.get(uri);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

export const postDataWithToken = async (uri: string, data: FormData) => {
  try {
    await ensureToken();
    const response = await http.post(uri, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

export const useLogout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await http.post("/logout");
      dispatch(clearToken());
      await removeCookie("userInfo");
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return logout;
};

const api = {
  http,
  login,
  register,
  verifycode,
  fetchDataWithToken,
  postDataWithToken,
};
export default api;
