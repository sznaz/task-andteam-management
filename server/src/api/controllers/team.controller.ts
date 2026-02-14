import { Router } from "express";
import { Container } from "typedi";
import { authorizeAdmin } from "../../middlewares/role.middleware";
import { authenticate } from "../../middlewares/auth.middleware";
import TeamService from "../services/team.service";

const router = Router();
const service = Container.get(TeamService);

router.get("/", authenticate, async (req, res, next) => {
  try {
    const response = await service.getTeams();
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/", authenticate, authorizeAdmin, async (req, res, next) => {
  try {
    const response = await service.createTeam(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
