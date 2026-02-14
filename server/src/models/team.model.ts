import { Schema, model, Document, Types } from "mongoose";

export interface ITeamModel extends Document {
  name: string;
  members: Types.ObjectId[] | string[];
}

const schema = new Schema<ITeamModel>(
  {
    name: { type: String, required: true },
    members: { type: [Schema.Types.ObjectId], ref: "User", required: true },
  },
  { timestamps: true }
);

export default model<ITeamModel>("Team", schema);
