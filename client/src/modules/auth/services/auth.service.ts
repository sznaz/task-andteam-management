import axiosInstance from "../../../core/interceptors/axios.interceptor";
import { LoginPayload, RegisterPayload } from "../dto/auth.dto";

export const authService = {
  register: async (payload: RegisterPayload) => {
    const response = await axiosInstance.post(
      "/api/auth/register",
      payload
    );
    return response.data;
  },

  login: async (payload: LoginPayload) => {
    const response = await axiosInstance.post(
      "/api/auth/login",
      payload
    );
    return response.data;
  },
};
