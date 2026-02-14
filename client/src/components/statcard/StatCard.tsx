import { Paper, Typography } from "@mui/material";

interface StatCardProps {
  title: string;
  value: number;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
      }}
    >
      <Typography variant="subtitle2" color="text.secondary">
        {title}
      </Typography>

      <Typography variant="h4" fontWeight={600} mt={1}>
        {value}
      </Typography>
    </Paper>
  );
};

export default StatCard;
