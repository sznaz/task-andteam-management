import { useEffect, useState } from "react";
import StatCard from "../../../../components/statcard/StatCard";
import { Grid } from "@mui/material";
import { dashboardService } from "../../../admin/services/dashboard.service";

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
      try {
        const response = await dashboardService.getUserStat();
        setStats(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Grid container spacing={3} mt={1}>
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <StatCard title="Total Tasks" value={stats.totalTasks} />
      </Grid>

      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <StatCard title="Tasks Pending" value={stats.pendingTasks} />
      </Grid>

      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <StatCard title="Tasks Completed" value={stats.completedTasks} />
      </Grid>
    </Grid>
  );
};

export default UserDashboard;
