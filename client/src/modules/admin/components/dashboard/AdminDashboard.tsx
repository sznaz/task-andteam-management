import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import StatCard from "../../../../components/statcard/StatCard";
import { dashboardService } from "../../services/dashboard.service";

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
      try {
        const response = await dashboardService.getAdminStat();
        setStats(response.data);
      } catch (error) {
        console.log(error)
      }
    };

    fetchStats();
  }, []);

  return (
    <Grid container spacing={3} mt={1}>
      <Grid size={{ xs: 12, md: 6, lg: 3 }}>
        <StatCard title="Total Teams" value={stats.totalTeams} />
      </Grid>

      <Grid size={{ xs: 12, md: 6, lg: 3 }}>
        <StatCard title="Total Tasks" value={stats.totalTasks} />
      </Grid>

      <Grid size={{ xs: 12, md: 6, lg: 3 }}>
        <StatCard title="Tasks Pending" value={stats.pendingTasks} />
      </Grid>

      <Grid size={{ xs: 12, md: 6, lg: 3 }}>
        <StatCard title="Tasks Completed" value={stats.completedTasks} />
      </Grid>
    </Grid>
  );
};

export default AdminDashboard;
