import { apiRequest } from "./api";

type LoginPayload = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type LoginResponse = {
  message: string;
  token: string;
  user: AuthUser;
};

export function login(payload: LoginPayload) {
  return apiRequest<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
