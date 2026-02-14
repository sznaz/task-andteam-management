import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Chip,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { teamService } from "../../services/team.service";
import { userService } from "../../services/user.service";

interface User {
  _id: string;
  name: string;
}

const CreateTeamPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all users for member selection
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await teamService.createTeam({
        name,
        members,
      });

      navigate("/dashboard/teams");
    } catch (error) {
      console.error("Create team failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="flex flex-col items-center justify-center">
      <Typography variant="h4" className="w-full" maxWidth={600} mb={3}>
        Create Team
      </Typography>

      <Box
        component="form"
        className="w-full"
        maxWidth={600}
        onSubmit={handleSubmit}
      >
        <TextField
          fullWidth
          label="Team Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Members</InputLabel>

          <Select
            multiple
            value={members}
            onChange={(e) => setMembers(e.target.value as string[])}
            input={<OutlinedInput label="Members" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                {selected.map((value) => {
                  const user = users.find((u) => u._id === value);
                  return <Chip key={value} label={user?.name} />;
                })}
              </Box>
            )}
          >
            {users.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          disabled={loading}
          fullWidth
        >
          {loading ? "Creating..." : "Create Team"}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateTeamPage;
