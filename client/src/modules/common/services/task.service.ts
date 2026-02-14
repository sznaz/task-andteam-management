import axiosInstance from "../../../core/interceptors/axios.interceptor";
import { CreateTaskPayload } from "../dto/task.dto";

export const taskService = {
  getAllTasks: async () => {
    const response = await axiosInstance.get("/api/tasks");
    return response.data;
  },
  getMyTasks: async () => {
    const response = await axiosInstance.get("/api/tasks/user");
    return response.data;
  },

  updateStatus: async (id: string, status: string) => {
    const response = await axiosInstance.put(
      `/api/tasks/${id}/status`,
      { status }
    );
    return response.data;
  },
  createTask: async (payload: CreateTaskPayload) => {
  const response = await axiosInstance.post(
    "/api/tasks",
    payload
  );
  return response.data;
},
};
