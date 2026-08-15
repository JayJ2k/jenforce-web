import { tickets } from "../data/mockTickets";
import { MetricCard } from "./MetricCard";
import { Sidebar } from "./Sidebar";
import { TicketList } from "./TicketList";

export function DashboardPreview() {
  return (
    <section className="dashboard-preview">
      <Sidebar />

      <div className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Visao geral</p>
            <h2>Painel de atendimento</h2>
          </div>

          <button className="secondary-button" type="button">
            Novo chamado
          </button>
        </header>

        <div className="metrics">
          <MetricCard label="Abertos" value="24" />
          <MetricCard label="Urgentes" value="03" />
          <MetricCard label="Resolvidos hoje" value="12" />
        </div>

        <div className="tickets-card">
          <div className="tickets-header">
            <h3>Chamados recentes</h3>
            <span>Atualizado agora</span>
          </div>

          <TicketList tickets={tickets} />
        </div>
      </div>
    </section>
  );
}
