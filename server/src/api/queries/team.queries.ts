import { Service } from "typedi";
import teamModel, { ITeamModel } from "../../models/team.model";

@Service()
class TeamQueries {
  public create = async (payload: Partial<ITeamModel>): Promise<ITeamModel> => {
    return teamModel.create(payload);
  };
  public findById = async (id: string): Promise<ITeamModel | null> => {
    return teamModel.findById(id).exec();
  };
  public getAll = async (): Promise<ITeamModel[]> => {
    return teamModel.find().populate('members').exec();
  };
}

export default TeamQueries;
