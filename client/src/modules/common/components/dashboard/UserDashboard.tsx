import { useEffect, useState } from "react";
import axiosInstance from "../../../../core/interceptors/axios.interceptor";
import StatCard from "../../../../components/statcard/StatCard";
import { Grid } from "@mui/material";

interface UserStats {
  totalTasks: number;
  pendingTasks: number;
  completedTasks: number;
}

const UserDashboard = () => {
  const [stats, setStats] = useState<UserStats>({
    totalTasks: 0,
    pendingTasks: 0,
    completedTasks: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const response = await axiosInstance.get(
        "/api/dashboard/user"
      );
      setStats(response.data.data || response.data);
    };

    fetchStats();
  }, []);

  return (
    <Grid container spacing={3} mt={1}>
      <Grid size={{ xs: 12, md: 6, lg: 4 }} >
        <StatCard title="Total Tasks" value={stats.totalTasks} />
      </Grid>

      <Grid size={{ xs: 12, md: 6, lg: 4 }} >
        <StatCard title="Tasks Pending" value={stats.pendingTasks} />
      </Grid>

      <Grid size={{ xs: 12, md: 6, lg: 4 }} >
        <StatCard title="Tasks Completed" value={stats.completedTasks} />
      </Grid>
    </Grid>
  );
};

export default UserDashboard;
