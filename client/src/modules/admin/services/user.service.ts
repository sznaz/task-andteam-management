import axiosInstance from "../../../core/interceptors/axios.interceptor";

export const userService = {
  getAllUsers: async () => {
    const response = await axiosInstance.get("/api/users");
    return response.data;
  },
};
