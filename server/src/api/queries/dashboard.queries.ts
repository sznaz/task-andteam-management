import { Service } from "typedi";
import TaskModel, { TaskStatus } from "../../models/task.model";
import TeamModel from "../../models/team.model";

@Service()
class DashboardQueries {

  public countTotalTeams = async (): Promise<number> => {
    return TeamModel.countDocuments().exec();
  };

  public countTotalTasks = async (): Promise<number> => {
    return TaskModel.countDocuments().exec();
  };

  public countPendingTasks = async (): Promise<number> => {
    return TaskModel.countDocuments({
      status: TaskStatus.PENDING,
    }).exec();
  };

  public countCompletedTasks = async (): Promise<number> => {
    return TaskModel.countDocuments({
      status: TaskStatus.COMPLETED,
    }).exec();
  };

  public countUserTasks = async (userId: string): Promise<number> => {
    return TaskModel.countDocuments({
      assignedTo: userId,
    }).exec();
  };

  public countUserPendingTasks = async (userId: string): Promise<number> => {
    return TaskModel.countDocuments({
      assignedTo: userId,
      status: TaskStatus.PENDING,
    }).exec();
  };

  public countUserCompletedTasks = async (userId: string): Promise<number> => {
    return TaskModel.countDocuments({
      assignedTo: userId,
      status: TaskStatus.COMPLETED,
    }).exec();
  };
}

export default DashboardQueries;
