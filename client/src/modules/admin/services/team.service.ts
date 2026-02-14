import axiosInstance from "../../../core/interceptors/axios.interceptor";
import { CreateTeamPayload } from "../dto/teams.dto";

export const teamService = {
  getAllTeams: async () => {
    const response = await axiosInstance.get("/api/teams");
    return response.data;
  },

  createTeam: async (payload: CreateTeamPayload) => {
    const response = await axiosInstance.post(
      "/api/teams",
      payload
    );
    return response.data;
  },
};
