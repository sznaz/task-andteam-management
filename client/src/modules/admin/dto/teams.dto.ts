export interface Team {
  _id: string;
  name: string;
  members: { _id: string; name: string; email: string }[];
}

export interface CreateTeamPayload {
  name: string;
  members: string[]; // member IDs
}