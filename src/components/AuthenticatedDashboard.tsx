import { useEffect, useMemo, useState } from "react";
import { listTickets } from "../services/ticketService";
import type { AuthUser } from "../types/auth";
import type { Ticket } from "../types/ticket";
import { MetricCard } from "./MetricCard";
import { Sidebar } from "./Sidebar";
import { TicketList } from "./TicketList";

type AuthenticatedDashboardProps = {
  user: AuthUser;
  token: string;
  onLogout: () => void;
};

type LoadStatus = "idle" | "loading" | "success" | "error";

function countResolvedToday(tickets: Ticket[]) {
  const today = new Date().toISOString().slice(0, 10);

  return tickets.filter((ticket) => {
    const updatedAt = ticket.updatedAt?.slice(0, 10);

    return ticket.status === "RESOLVED" && updatedAt === today;
  }).length;
}

export function AuthenticatedDashboard({ user, token, onLogout }: AuthenticatedDashboardProps) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loadStatus, setLoadStatus] = useState<LoadStatus>("idle");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadTickets() {
      try {
        setLoadStatus("loading");
        setFeedback("");

        const response = await listTickets(token);

        if (!isMounted) {
          return;
        }

        setTickets(response.tickets);
        setLoadStatus("success");
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setLoadStatus("error");
        setFeedback(
          error instanceof Error ? error.message : "Não foi possível carregar os chamados.",
        );
      }
    }

    loadTickets();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const metrics = useMemo(() => {
    const openTickets = tickets.filter((ticket) =>
      ["OPEN", "IN_PROGRESS"].includes(ticket.status),
    ).length;

    const urgentTickets = tickets.filter((ticket) => ticket.priority === "URGENT").length;

    const resolvedToday = countResolvedToday(tickets);

    return {
      openTickets,
      urgentTickets,
      resolvedToday,
    };
  }, [tickets]);

  return (
    <section className="dashboard-app">
      <Sidebar />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Painel autenticado</p>
            <h1>Olá, {user.name}</h1>
            <p>Tecnologia organizada, humana e preparada para apoiar quem cuida da operação.</p>
          </div>

          <div className="user-card">
            <span>{user.role}</span>
            <strong>{user.email}</strong>
            <button onClick={onLogout} type="button">
              Sair
            </button>
          </div>
        </header>

        <section className="metrics-grid" aria-label="Resumo dos chamados">
          <MetricCard
            detail="Fila acompanhada"
            label="Abertos"
            value={String(metrics.openTickets)}
          />
          <MetricCard
            detail="Demandas críticas"
            label="Urgentes"
            value={String(metrics.urgentTickets).padStart(2, "0")}
          />
          <MetricCard
            detail="Atualizados hoje"
            label="Resolvidos hoje"
            value={String(metrics.resolvedToday).padStart(2, "0")}
          />
        </section>

        <section className="tickets-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Chamados reais</p>
              <h2>Fila conectada à API</h2>
            </div>

            <span className="live-badge">
              {loadStatus === "loading" ? "Carregando" : "API conectada"}
            </span>
          </div>

          {loadStatus === "loading" && (
            <div className="ticket-state-card">
              <strong>Carregando chamados...</strong>
              <p>Buscando a fila atual na Jenforce API.</p>
            </div>
          )}

          {loadStatus === "error" && (
            <div className="ticket-state-card is-error">
              <strong>Não foi possível carregar os chamados.</strong>
              <p>{feedback}</p>
            </div>
          )}

          {loadStatus !== "loading" && loadStatus !== "error" && (
            <TicketList
              emptyMessage="Ainda não existem chamados para exibir nesta conta."
              tickets={tickets}
            />
          )}
        </section>
      </main>
    </section>
  );
}
