import { Service } from "typedi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Responses from "../../config/responses";
import { IUserModel, UserRole } from "../../models/user.model";
import { IResponse } from "../../types";
import UserQueries from "../queries/user.queries";
import { IRegisterDTO } from "../dto/user.dto";
import { generateAccessToken } from "../../utils/token.utils";

@Service()
class AuthService {
  constructor(private readonly _userQueries: UserQueries) {}
  public register = async (
    payload: IRegisterDTO
  ): Promise<IResponse<IUserModel | null>> => {
    const existingUser: IUserModel | null = await this._userQueries.findByEmail(
      payload.email
    );

    if (existingUser) {
      return Responses.badRequest("Email already exists");
    }

    const hashedPassword: string = await bcrypt.hash(payload.password, 10);

    const user: IUserModel = await this._userQueries.create({
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role: payload.role,
    });

    return Responses.ok(user);
  };
  public login = async (
    email: string,
    password: string
  ): Promise<IResponse<{ token: string } | null>> => {
    const user: IUserModel | null = await this._userQueries.findByEmail(email);
    if (!user) {
      return Responses.notFound("User not found");
    }

    const isMatch: boolean = await bcrypt.compare(password, user.password);
    console.log(isMatch)
    if (!isMatch) {
      return Responses.unauthorized("Invalid credentials");
    }

    const token: string = generateAccessToken({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    });
    console.log(token)
    return Responses.ok({ token });
  };
}

export default AuthService;
