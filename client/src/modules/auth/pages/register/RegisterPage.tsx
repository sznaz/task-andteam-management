import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  MenuItem,
  Link as MuiLink,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { validateRegister } from "../../../../shared/validators/auth.validator";
import { RegisterForm, RegisterErrors } from "../../dto/auth.dto";
import { authService } from "../../services/auth.service";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [errors, setErrors] = useState<RegisterErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      apiError: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateRegister(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      await authService.register(form);

      navigate("/login");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrors((prev) => ({
        ...prev,
        apiError:
          error?.response?.data?.message ||
          "Registration failed. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f3f4f6"
    >
      <Paper elevation={4} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" textAlign="center" mb={3}>
          Create Account
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            margin="normal"
            autoComplete="off"
            error={!!errors.name}
            helperText={errors.name || " "}
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={form.email}
            autoComplete="off"
            onChange={handleChange}
            margin="normal"
            error={!!errors.email}
            helperText={errors.email || " "}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            margin="normal"
            autoComplete="off"
            error={!!errors.password}
            helperText={errors.password || " "}
          />

          <TextField
            select
            fullWidth
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            margin="normal"
            error={!!errors.role}
            helperText={errors.role || " "}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>

          <Box sx={{ minHeight: 24 }}>
            <Typography
              variant="body2"
              color="error"
              textAlign="center"
            >
              {errors.apiError || " "}
            </Typography>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </Box>

        <Typography variant="body2" textAlign="center" mt={2}>
          Already have an account?{" "}
          <MuiLink component={Link} to="/login">
            Login
          </MuiLink>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
