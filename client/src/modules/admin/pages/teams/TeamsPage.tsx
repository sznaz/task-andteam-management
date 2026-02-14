import {
  Typography,
  Box,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
} from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Team } from "../../dto/teams.dto";
import { teamService } from "../../services/team.service";

const TeamsPage = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const data = await teamService.getAllTeams();
      setTeams(data.data || data);
    } catch (error) {
      console.error("Failed to fetch teams", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const paginatedTeams = useMemo(() => {
    const start = page * rowsPerPage;
    return teams.slice(start, start + rowsPerPage);
  }, [teams, page, rowsPerPage]);

  const handleChangePage = (
    _: unknown,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
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
        <Typography variant="h4">
          Team Management
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/dashboard/teams/create")}
        >
          Create New Team
        </Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-bold!">Team Name</TableCell>
              <TableCell className="font-bold!">Members Count</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedTeams.map((team) => (
              <TableRow key={team._id}>
                <TableCell>{team.name}</TableCell>
                <TableCell>
                  {team.members?.length || 0}
                </TableCell>
              </TableRow>
            ))}

            {!loading && teams.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  No teams found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={teams.length}
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

export default TeamsPage;
