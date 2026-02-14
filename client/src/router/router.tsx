import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "../core/guards/protectedroute";
import AdminRoute from "../core/guards/adminroute";
import DashboardLayout from "../shared/layouts/DashboardLayout";
import { Box, CircularProgress } from "@mui/material";

const Login = lazy(() => import("../modules/auth/pages/login/LoginPage"));

const Register = lazy(
  () => import("../modules/auth/pages/register/RegisterPage")
);

const NotFound = lazy(
  () => import("../modules/common/pages/notfound/NotFoundPage")
);

const DashboardHome = lazy(
  () => import("../modules/common/pages/dashboard/DashboardPage")
);

const TeamsPage = lazy(() => import("../modules/admin/pages/teams/TeamsPage"));

const CreateTeamPage = lazy(
  () => import("../modules/admin/pages/createteam/CreateTeams")
);

const TasksPage = lazy(() => import("../modules/common/pages/tasks/TasksPage"));

const CreateTaskPage = lazy(
  () => import("../modules/common/pages/createtask/CreateTask")
);

const AppRouter = () => {
  return (
    <Suspense
      fallback={
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      }
    >
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />

            {/* Admin Only */}
            <Route element={<AdminRoute />}>
              <Route path="teams" element={<TeamsPage />} />
              <Route path="teams/create" element={<CreateTeamPage />} />
            </Route>

            {/* Shared */}
            <Route path="tasks" element={<TasksPage />} />
            <Route path="create-task" element={<CreateTaskPage />} />
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
