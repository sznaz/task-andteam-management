import { Service } from "typedi";
import bcrypt from "bcryptjs";
import Responses from "../../config/responses";
import { ITaskModel, TaskStatus } from "../../models/task.model";
import { IUserModel, UserRole } from "../../models/user.model";
import { IResponse } from "../../types";
import TaskQueries from "../queries/task.queries";
import UserQueries from "../queries/user.queries";
import TeamQueries from "../queries/team.queries";

@Service()
class TaskService {
  constructor(
    private readonly _userQueries: UserQueries,
    private readonly _teamQueries: TeamQueries,
    private readonly _taskQueries: TaskQueries
  ) {}

  public createTask = async (payload: {
    title: string;
    description?: string;
    dueDate: Date;
    assignedTo: string;
    team: string;
    status: string;
  }): Promise<IResponse<ITaskModel | null>> => {
    const user = await this._userQueries.findById(payload.assignedTo);

    if (!user || user.role !== UserRole.USER) {
      return Responses.badRequest("Invalid User");
    }
    const team = await this._teamQueries.findById(payload.team);

    if (!team?._id) {
      return Responses.badRequest("Invalid Team");
    }

    const task: ITaskModel = await this._taskQueries.create({
      title: payload?.title,
      description: payload?.description as string,
      dueDate: payload?.dueDate,
      assignedTo: user?._id,
      team: team._id,
    });

    return Responses.ok(task);
  };
  public updateTaskStatus = async (
    taskId: string,
    status: TaskStatus
  ): Promise<IResponse<ITaskModel | null>> => {
    const task = await this._taskQueries.updateStatus(taskId, status);
    return Responses.ok(task);
  };
  public getAllByUser = async (
    id: string
  ): Promise<IResponse<ITaskModel[] | null>> => {
    const users = await this._taskQueries.getAllByUser(id);
    return Responses.ok(users);
  };
  public getAll = async (): Promise<IResponse<ITaskModel[] | null>> => {
    const users = await this._taskQueries.getAll();
    return Responses.ok(users);
  };
}

export default TaskService;
