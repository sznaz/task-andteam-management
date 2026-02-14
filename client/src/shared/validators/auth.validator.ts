import {
  RegisterForm,
  RegisterErrors,
  LoginForm,
  LoginErrors,
} from "../../modules/auth/dto/auth.dto";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateRegister = (form: RegisterForm): RegisterErrors => {
  const errors: RegisterErrors = {};

  if (!form.name.trim()) {
    errors.name = "Name is required";
  } else if (form.name.length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(form.email)) {
    errors.email = "Invalid email format";
  }

  if (!form.password) {
    errors.password = "Password is required";
  } else if (form.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!form.role) {
    errors.role = "Role is required";
  }

  return errors;
};

export const validateLogin = (form: LoginForm): LoginErrors => {
  const errors: LoginErrors = {};

  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(form.email)) {
    errors.email = "Invalid email format";
  }

  if (!form.password) {
    errors.password = "Password is required";
  }

  return errors;
};
