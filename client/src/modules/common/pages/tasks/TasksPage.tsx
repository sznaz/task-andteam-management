import {
  Typography,
  Box,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  TablePagination,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Task, TaskStatus } from "../../dto/task.dto";
import { taskService } from "../../services/task.service";

const TasksPage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "completed"
  >("all");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      let data;

      if (user?.role === "admin") {
        data = await taskService.getAllTasks();
      } else {
        data = await taskService.getMyTasks();
      }

      setTasks(data.data || data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    try {
      await taskService.updateStatus(taskId, newStatus);

      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const filteredTasks = useMemo(() => {
    if (statusFilter === "all") return tasks;

    return tasks.filter((task) => task.status === statusFilter);
  }, [tasks, statusFilter]);

  const paginatedTasks = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredTasks.slice(start, start + rowsPerPage);
  }, [filteredTasks, page, rowsPerPage]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event: SelectChangeEvent<"all" | TaskStatus>) => {
    setStatusFilter(event.target.value as "all" | TaskStatus);
    setPage(0);
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Task List</Typography>

        <Box display="flex" gap={2}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={handleFilterChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={() => navigate("/dashboard/create-task")}
          >
            Create Task
          </Button>
        </Box>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Due Date</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedTasks.map((task) => (
              <TableRow key={task._id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.team?.name || "-"}</TableCell>
                <TableCell>{task.assignedTo?.name || "-"}</TableCell>
                <TableCell>
                  <Select
                    size="small"
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(task._id, e.target.value)
                    }
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "-"}
                </TableCell>
              </TableRow>
            ))}

            {!loading && filteredTasks.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No tasks found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filteredTasks.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>
    </Box>
  );
};

export default TasksPage;
