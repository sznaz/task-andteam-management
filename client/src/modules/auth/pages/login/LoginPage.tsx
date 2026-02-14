import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Link as MuiLink,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { validateLogin } from "../../../../shared/validators/auth.validator";
import { LoginForm, LoginErrors } from "../../dto/auth.dto";
import { authService } from "../../services/auth.service";
import { decodeToken } from "../../../../shared/utils/toke.utils";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginErrors>({});
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

    const validationErrors = validateLogin(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      const response = await authService.login(form);
      localStorage.setItem("token", response.data.token);
      const decodedUser = decodeToken(response.data.token);

      if (decodedUser) {
        localStorage.setItem("user", JSON.stringify(decodedUser));
      }

      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        setErrors((prev) => ({
          ...prev,
          apiError: error.response.data.message || "Something went wrong",
        }));
      } else {
        console.error("Unexpected error:", error);
      }
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
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
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
            autoComplete="off"
            value={form.password}
            onChange={handleChange}
            margin="normal"
            error={!!errors.password}
            helperText={errors.password || " "}
          />
          <Box sx={{ minHeight: 24 }}>
            <Typography variant="body2" color="error" textAlign="center">
              {errors.apiError || " "}
            </Typography>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Box>
        <Typography variant="body2" textAlign="center" mt={2}>
          Don’t have an account?{" "}
          <MuiLink component={Link} to="/register">
            Register
          </MuiLink>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
