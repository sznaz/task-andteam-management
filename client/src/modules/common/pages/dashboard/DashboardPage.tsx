import { Typography } from "@mui/material";
import AdminDashboard from "../../../admin/components/dashboard/AdminDashboard";
import UserDashboard from "../../components/dashboard/UserDashboard";

const DashboardHome = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name}
      </Typography>

      {user?.role === "admin" ? (
        <AdminDashboard />
      ) : (
        <UserDashboard />
      )}
    </>
  );
};

export default DashboardHome;
