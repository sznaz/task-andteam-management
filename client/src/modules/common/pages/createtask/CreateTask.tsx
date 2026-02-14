import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { taskService } from "../../services/task.service";
import { teamService } from "../../../admin/services/team.service";

interface Team {
  _id: string;
  name: string;
  members: { _id: string; name: string }[];
}

const CreateTaskPage = () => {
  const navigate = useNavigate();

  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [teamMembers, setTeamMembers] = useState<
    { _id: string; name: string }[]
  >([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch Teams
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await teamService.getAllTeams();
        setTeams(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTeams();
  }, []);

  // Update members when team changes
  useEffect(() => {
    const team = teams.find((t) => t._id === selectedTeam);
    setTeamMembers(team?.members || []);
  }, [selectedTeam, teams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await taskService.createTask({
        title: form.title,
        description: form.description,
        team: selectedTeam,
        assignedTo: form.assignedTo,
        dueDate: form.dueDate,
      });

      navigate("/dashboard/tasks");
    } catch (error) {
      console.error("Create task failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="flex flex-col items-center justify-center">
      <Typography maxWidth={600} variant="h4" gutterBottom>
        Create Task
      </Typography>

      <Box
        component="form"
        maxWidth={600}
        className="flex w-full flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          multiline
          rows={4}
          margin="normal"
        />

        {/* Team Select */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Team</InputLabel>
          <Select
            value={selectedTeam}
            label="Team"
            onChange={(e) => setSelectedTeam(e.target.value)}
          >
            {teams.map((team) => (
              <MenuItem key={team._id} value={team._id}>
                {team.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Assigned To Select */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Assign To</InputLabel>
          <Select
            value={form.assignedTo}
            label="Assign To"
            onChange={(e) =>
              setForm({
                ...form,
                assignedTo: e.target.value,
              })
            }
            disabled={!selectedTeam}
          >
            {teamMembers.map((member) => (
              <MenuItem key={member._id} value={member._id}>
                {member.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Due Date */}
        <TextField
          fullWidth
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          disabled={loading}
          fullWidth
        >
          {loading ? "Creating..." : "Create Task"}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateTaskPage;
