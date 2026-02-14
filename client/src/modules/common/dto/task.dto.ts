export interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignedTo?: {
    _id: string;
    name: string;
  };
  team?: {
    _id: string;
    name: string;
  };
  dueDate?: string;
}
export interface CreateTaskPayload {
  title: string;
  description: string;
  team: string;
  assignedTo: string;
  dueDate: string;
}
export type TaskStatus = "pending" | "completed";