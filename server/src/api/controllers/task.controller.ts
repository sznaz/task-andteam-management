import { Router } from "express";
import { Container } from "typedi";
import { authenticate } from "../../middlewares/auth.middleware";
import TaskService from "../services/task.service";

const router = Router();
const service = Container.get(TaskService);

router.get("/", authenticate, async (req, res, next) => {
  try {
    const response = await service.getAll();
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
});
router.get("/user", authenticate, async (req, res, next) => {
  try {
    const response = await service.getAllByUser((req as any).user.id);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
});
router.post("/", authenticate, async (req, res, next) => {
  try {
    const response = await service.createTask(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
});
router.put("/:id/status", authenticate, async (req, res, next) => {
  try {
    const response = await service.updateTaskStatus(req.params.id as string, req?.body?.status);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
