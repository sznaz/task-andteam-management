import axiosInstance from "../../../core/interceptors/axios.interceptor";

export const dashboardService = {
  getAdminStat: async () => {
    const response = await axiosInstance.get("/api/dashboard/admin");
    return response.data;
  },
  getUserStat: async () => {
    const response = await axiosInstance.get("/api/dashboard/user");
    return response.data;
  },

};
