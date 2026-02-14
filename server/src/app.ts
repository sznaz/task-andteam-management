import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import taskController from "./api/controllers/task.controller";
import authController from "./api/controllers/auth.controller";
import teamController from "./api/controllers/team.controller";
import userController from "./api/controllers/user.controller";
import dashboardController from "./api/controllers/dashboard.controller";
import errorMiddleware from "./middlewares/error.middleware";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(limiter);
app.use(helmet());
app.use(express.json({ limit: "10kb" }));

app.use("/api/auth", authController);
app.use("/api/dashboard", dashboardController);
app.use("/api/tasks", taskController);
app.use("/api/teams", teamController);
app.use("/api/users", userController);

app.use(errorMiddleware);

export default app;
