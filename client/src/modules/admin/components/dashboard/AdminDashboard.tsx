import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../core/interceptors/axios.interceptor";
import StatCard from "../../../../components/statcard/StatCard";

interface AdminStats {
  totalTeams: number;
  totalTasks: number;
  pendingTasks: number;
  completedTasks: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalTeams: 0,
    totalTasks: 0,
    pendingTasks: 0,
    completedTasks: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const response = await axiosInstance.get(
        "/api/dashboard/admin"
      );
      setStats(response.data.data || response.data);
    };

    fetchStats();
  }, []);

  return (
    <Grid container spacing={3} mt={1}>
      <Grid size={{ xs: 12, md: 6, lg: 3 }} >
        <StatCard title="Total Teams" value={stats.totalTeams} />
      </Grid>

      <Grid size={{ xs: 12, md: 6, lg: 3 }} >
        <StatCard title="Total Tasks" value={stats.totalTasks} />
      </Grid>

      <Grid size={{ xs: 12, md: 6, lg: 3 }} >
        <StatCard title="Tasks Pending" value={stats.pendingTasks} />
      </Grid>

      <Grid size={{ xs: 12, md: 6, lg: 3 }} >
        <StatCard title="Tasks Completed" value={stats.completedTasks} />
      </Grid>
    </Grid>
  );
};

export default AdminDashboard;
