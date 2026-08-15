export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type AuthSession = {
  token: string;
  user: AuthUser;
};

export type AuthStatus = "idle" | "loading" | "success" | "error";

export type AuthMode = "login" | "register";
