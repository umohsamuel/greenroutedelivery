type Role = "client" | "admin";
type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

export interface SignupResponse {
  success: true;
  data: {
    token: string;
    user: User;
  };
}

export interface ErrorResponse {
  success: false;
  error: string;
}

export interface LoginResponse {
  success: true;
  token: string;
  user: User;
}
