import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../modules/auth/pages/login/LoginPage";
import Register from "../modules/auth/pages/register/RegisterPage";
import NotFound from "../modules/common/pages/notfound/NotFoundPage";
import ProtectedRoute from "../core/guards/protectedroute";
import AdminRoute from "../core/guards/adminroute";
import DashboardLayout from "../shared/layouts/DashboardLayout";
import DashboardHome from "../modules/common/pages/dashboard/DashboardPage";
import TeamsPage from "../modules/admin/pages/teams/TeamsPage";
import CreateTaskPage from "../modules/common/pages/createtask/CreateTask";
import TasksPage from "../modules/common/pages/tasks/TasksPage";
import CreateTeamPage from "../modules/admin/pages/createteam/CreateTeams";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />

          {/* Admin Only Routes */}
          <Route element={<AdminRoute />}>
            <Route path="teams" element={<TeamsPage />} />
            <Route
              path="teams/create"
              element={<CreateTeamPage />}
            />
          </Route>

          {/* Accessible to all logged users */}
          <Route path="tasks" element={<TasksPage />} />
          <Route path="create-task" element={<CreateTaskPage />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
