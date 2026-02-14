import jwt, { SignOptions } from "jsonwebtoken";
import { UserRole } from "../models/user.model";

export interface IJwtPayload {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export const generateAccessToken = (payload: IJwtPayload): string => {
  const JWT_SECRET = process.env.JWT_SECRET as string;
  const expiresIn: SignOptions["expiresIn"] =
  (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || "1h";
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyAccessToken = (token: string): IJwtPayload => {
  const JWT_SECRET = process.env.JWT_SECRET as string;
  return jwt.verify(token, JWT_SECRET) as IJwtPayload;
};
