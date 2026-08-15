import type { AuthSession } from "../types/auth";

const AUTH_STORAGE_KEY = "jenforce:auth";

export function getStoredSession(): AuthSession | null {
  const storedSession = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedSession) {
    return null;
  }

  try {
    const parsedSession = JSON.parse(storedSession) as AuthSession;

    if (!parsedSession.token || !parsedSession.user?.email) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }

    return parsedSession;
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function saveStoredSession(session: AuthSession) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function clearStoredSession() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
