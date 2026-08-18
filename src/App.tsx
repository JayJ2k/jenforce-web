import { useState } from "react";
import "./App.css";
import { AuthenticatedDashboard } from "./components/AuthenticatedDashboard";
import { AuthScreen } from "./components/AuthScreen";
import type { AuthSession } from "./types/auth";
import { clearStoredSession, getStoredSession, saveStoredSession } from "./utils/authStorage";

function App() {
  const [currentSession, setCurrentSession] = useState<AuthSession | null>(() =>
    getStoredSession(),
  );

  function handleAuthSuccess(session: AuthSession) {
    saveStoredSession(session);
    setCurrentSession(session);
  }

  function handleLogout() {
    clearStoredSession();
    setCurrentSession(null);
  }

  if (currentSession) {
    return (
      <main className="app authenticated-app">
        <AuthenticatedDashboard
          token={currentSession.token}
          user={currentSession.user}
          onLogout={handleLogout}
        />
      </main>
    );
  }

  return (
    <main className="nexus-entry-app">
      <AuthScreen onAuthSuccess={handleAuthSuccess} />
    </main>
  );
}

export default App;
