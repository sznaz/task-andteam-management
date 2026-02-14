import { Service } from "typedi";
import Responses from "../../config/responses";
import { IResponse } from "../../types";
import DashboardQueries from "../queries/dashboard.queries";

interface IAdminDashboardStats {
  totalTeams: number;
  totalTasks: number;
  pendingTasks: number;
  completedTasks: number;
}

interface IUserDashboardStats {
  totalTasks: number;
  pendingTasks: number;
  completedTasks: number;
}

@Service()
class DashboardService {
  constructor(
    private readonly _dashboardQueries: DashboardQueries
  ) {}

  public getAdminStats = async (): Promise<
    IResponse<IAdminDashboardStats>
  > => {
    const [
      totalTeams,
      totalTasks,
      pendingTasks,
      completedTasks,
    ] = await Promise.all([
      this._dashboardQueries.countTotalTeams(),
      this._dashboardQueries.countTotalTasks(),
      this._dashboardQueries.countPendingTasks(),
      this._dashboardQueries.countCompletedTasks(),
    ]);

    return Responses.ok({
      totalTeams,
      totalTasks,
      pendingTasks,
      completedTasks,
    });
  };

  public getUserStats = async (
    userId: string
  ): Promise<IResponse<IUserDashboardStats>> => {
    const [
      totalTasks,
      pendingTasks,
      completedTasks,
    ] = await Promise.all([
      this._dashboardQueries.countUserTasks(userId),
      this._dashboardQueries.countUserPendingTasks(userId),
      this._dashboardQueries.countUserCompletedTasks(userId),
    ]);

    return Responses.ok({
      totalTasks,
      pendingTasks,
      completedTasks,
    });
  };
}

export default DashboardService;
