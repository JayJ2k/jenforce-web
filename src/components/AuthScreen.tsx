import type { AuthSession } from "../types/auth";
import { AuthPanel } from "./AuthPanel";
import { DashboardPreview } from "./DashboardPreview";

type AuthScreenProps = {
  onAuthSuccess: (session: AuthSession) => void;
};

export function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  return (
    <>
      <AuthPanel onAuthSuccess={onAuthSuccess} />
      <DashboardPreview />
    </>
  );
}
