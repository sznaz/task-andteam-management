import { Service } from "typedi";
import Responses from "../../config/responses";
import { IResponse } from "../../types";
import UserQueries from "../queries/user.queries";
import { IUserModel } from "../../models/user.model";

interface ITaskResponse {
  _id: string;
  title: string;
  description?: string;
  dueTime: Date;
  status: string;
}

@Service()
class UserService {
  constructor(private readonly _userQueries: UserQueries) {}

  public getUsers = async (): Promise<IResponse<IUserModel[]>> => {
    const teams: IUserModel[] = await this._userQueries.getAll();
    return Responses.ok(teams);
  };
}

export default UserService;
