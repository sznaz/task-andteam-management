import { Schema, model, Document, Types } from "mongoose";

export enum TaskStatus {
  PENDING = "pending",
  COMPLETED = "completed"
}

export interface ITaskModel extends Document {
  title: string;
  description?: string;
  dueDate: Date;
  assignedTo: Types.ObjectId;
  team: Types.ObjectId;
  status: TaskStatus;
}

const schema = new Schema<ITaskModel>(
  {
    title: { type: String, required: true },
    description: String,
    dueDate: { type: Date, required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User", required: true },
    team: { type: Schema.Types.ObjectId, ref: "Team", required: true },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.PENDING
    }
  },
  { timestamps: true }
);

export default model<ITaskModel>("Task", schema);
