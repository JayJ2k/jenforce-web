import { tickets } from "../data/mockTickets";
import type { AuthUser } from "../types/auth";
import { MetricCard } from "./MetricCard";
import { Sidebar } from "./Sidebar";
import { TicketList } from "./TicketList";

type AuthenticatedDashboardProps = {
  user: AuthUser;
  onLogout: () => void;
};

export function AuthenticatedDashboard({ user, onLogout }: AuthenticatedDashboardProps) {
  return (
    <section className="dashboard-preview authenticated-dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Sessao autenticada</p>
            <h2>Painel de atendimento</h2>
            <span className="dashboard-subtitle">
              Tecnologia organizada, humana e preparada para apoiar quem cuida da comunidade.
            </span>
          </div>

          <button className="secondary-button danger-button" onClick={onLogout} type="button">
            Sair
          </button>
        </header>

        <section className="user-summary">
          <div>
            <span>Usuario autenticado</span>
            <strong>{user.name}</strong>
          </div>

          <div>
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>

          <div>
            <span>Perfil</span>
            <strong>{user.role}</strong>
          </div>
        </section>

        <div className="metrics">
          <MetricCard detail="Fila acompanhada" label="Abertos" value="24" />
          <MetricCard detail="Demandas sensiveis" label="Urgentes" value="03" />
          <MetricCard detail="Ultimas 24h" label="Resolvidos hoje" value="12" />
        </div>

        <div className="tickets-card">
          <div className="tickets-header">
            <div>
              <h3>Chamados recentes</h3>
              <p>Previa da fila de atendimento</p>
            </div>

            <span>Atualizado agora</span>
          </div>

          <TicketList tickets={tickets} />
        </div>
      </div>
    </section>
  );
}
