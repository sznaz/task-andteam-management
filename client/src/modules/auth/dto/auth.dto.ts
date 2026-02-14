export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  apiError?: string;
}

export interface LoginErrors {
  email?: string;
  password?: string;
  apiError?: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
