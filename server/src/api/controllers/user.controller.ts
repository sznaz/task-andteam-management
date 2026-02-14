import { Router } from "express";
import { Container } from "typedi";
import { authorizeAdmin } from "../../middlewares/role.middleware";
import { authenticate } from "../../middlewares/auth.middleware";
import TeamService from "../services/team.service";
import UserService from "../services/user.service";

const router = Router();
const service = Container.get(UserService);

router.get("/", authenticate, authorizeAdmin, async (req, res, next) => {
  try {
    const response = await service.getUsers();
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
});


export default router;
