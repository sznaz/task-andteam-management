import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IJwtPayload } from "../types";
import { verifyAccessToken } from "../utils/token.utils";

export interface AuthRequest extends Request {
  user?: IJwtPayload;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = verifyAccessToken(token)

    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
