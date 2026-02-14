import { Service } from "typedi";
import Responses from "../../config/responses";
import { ITaskModel, TaskStatus } from "../../models/task.model";
import { IResponse } from "../../types";
import TaskQueries from "../queries/task.queries";
import { ITeamModel } from "../../models/team.model";
import TeamQueries from "../queries/team.queries";

interface ITaskResponse {
  _id: string;
  title: string;
  description?: string;
  dueTime: Date;
  status: string;
}

@Service()
class TeamService {
  constructor(private readonly _teamQueries: TeamQueries) {}

  public getTeams = async (): Promise<IResponse<ITeamModel[]>> => {
    const teams: ITeamModel[] = await this._teamQueries.getAll();
    return Responses.ok(teams);
  };

  public createTeam = async (payload: {
    name: string;
    members: string[];
  }): Promise<IResponse<ITeamModel | null>> => {
    const team: ITeamModel = await this._teamQueries.create({
      name: payload?.name,
      members: payload?.members,
    });
    return Responses.ok(team);
  };
}

export default TeamService;
