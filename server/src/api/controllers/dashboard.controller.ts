import { Router } from "express";
import { Container } from "typedi";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorizeAdmin } from "../../middlewares/role.middleware";
import DashboardService from "../services/dashboard.service";

const router = Router();
const service = Container.get(DashboardService);

router.get("/admin", authenticate, authorizeAdmin, async (req, res, next) => {
  try {
    const response = await service.getAdminStats();
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
});
router.get("/user", authenticate, async (req, res, next) => {
  try {
    const response = await service.getUserStats((req as any).user.id);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
});

export default router