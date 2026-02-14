import { Service } from "typedi";
import { Types } from "mongoose";
import taskModel, { ITaskModel, TaskStatus } from "../../models/task.model";

@Service()
class TaskQueries {
  public create = async (payload: {
    title: string;
    description?: string;
    dueDate: Date;
    assignedTo: Types.ObjectId;
    team: Types.ObjectId;
  }): Promise<ITaskModel> => {
    return taskModel.create({
      ...payload,
      status: TaskStatus.PENDING,
    });
  };

  public getAllByUser = async (user: string): Promise<ITaskModel[]> => {
    return taskModel
      .find({assignedTo: user})
      .populate('team')
      .populate('assignedTo')
      .lean()
      .exec();
  };
  public getAll = async (): Promise<ITaskModel[]> => {
    return taskModel
      .find()
      .populate('team')
      .populate('assignedTo')
      .lean()
      .exec();
  };

  public updateStatus = async (
    taskId: string,
    status: TaskStatus
  ): Promise<ITaskModel | null> => {
    return taskModel
      .findByIdAndUpdate(taskId, { status }, { new: true })
      .exec();
  };
}

export default TaskQueries;
