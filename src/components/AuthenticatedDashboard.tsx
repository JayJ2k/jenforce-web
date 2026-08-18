import { Search } from "lucide-react";
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

type StatusFilter = "ALL" | "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

const statusFilters: Array<{
  label: string;
  value: StatusFilter;
}> = [
  {
    label: "Todos",
    value: "ALL",
  },
  {
    label: "Abertos",
    value: "OPEN",
  },
  {
    label: "Em andamento",
    value: "IN_PROGRESS",
  },
  {
    label: "Resolvidos",
    value: "RESOLVED",
  },
  {
    label: "Encerrados",
    value: "CLOSED",
  },
];

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
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");

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
    const activeTickets = tickets.filter((ticket) =>
      ["OPEN", "IN_PROGRESS"].includes(ticket.status),
    ).length;

    const urgentTickets = tickets.filter((ticket) => ticket.priority === "URGENT").length;

    const resolvedToday = countResolvedToday(tickets);

    return {
      activeTickets,
      urgentTickets,
      resolvedToday,
      totalTickets: tickets.length,
    };
  }, [tickets]);

  const filteredTickets = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return tickets.filter((ticket) => {
      const matchesStatus = statusFilter === "ALL" ? true : ticket.status === statusFilter;

      const searchableContent = [
        ticket.protocol,
        ticket.title,
        ticket.description,
        ticket.category,
        ticket.priority,
        ticket.status,
        ticket.requester?.name,
        ticket.requester?.email,
        ticket.assignee?.name,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = normalizedSearch ? searchableContent.includes(normalizedSearch) : true;

      return matchesStatus && matchesSearch;
    });
  }, [searchTerm, statusFilter, tickets]);

  return (
    <section className="dashboard-app authenticated-dashboard-shell">
      <Sidebar />

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <label className="dashboard-search" htmlFor="ticket-search">
            <Search aria-hidden="true" size={18} strokeWidth={2.1} />
            <input
              id="ticket-search"
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar por protocolo, assunto, solicitante..."
              type="search"
              value={searchTerm}
            />
          </label>

          <div className="dashboard-user-actions">
            <div className="dashboard-user-avatar">{user.name.slice(0, 1).toUpperCase()}</div>

            <div className="dashboard-user-info">
              <strong>{user.name}</strong>
              <span>{user.role}</span>
            </div>

            <button className="dashboard-logout-button" onClick={onLogout} type="button">
              Sair
            </button>
          </div>
        </header>

        <section className="dashboard-hero-row">
          <div>
            <p className="eyebrow">Painel autenticado</p>
            <h1>Central de Chamados</h1>
            <p>
              Acompanhe a fila real da operação, priorize demandas e mantenha o suporte organizado.
            </p>
          </div>

          <button
            className="dashboard-primary-action"
            disabled
            title="A abertura de chamados será criada em uma próxima issue."
            type="button"
          >
            Criar novo chamado
          </button>
        </section>

        <section className="metrics-grid" aria-label="Resumo dos chamados">
          <MetricCard
            detail="Chamados em aberto ou andamento"
            label="Meus chamados ativos"
            value={String(metrics.activeTickets)}
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
          <MetricCard
            detail="Retornados pela API"
            label="Total na fila"
            value={String(metrics.totalTickets)}
          />
        </section>

        <section className="tickets-panel">
          <div className="ticket-toolbar">
            <div>
              <p className="eyebrow">Chamados reais</p>
              <h2>Fila conectada à API</h2>
            </div>

            <span className="live-badge">
              {loadStatus === "loading" ? "Carregando" : "API conectada"}
            </span>
          </div>

          <fieldset className="dashboard-filters">
            <legend>Status</legend>

            <div>
              {statusFilters.map((filter) => (
                <button
                  className={statusFilter === filter.value ? "active" : ""}
                  key={filter.value}
                  onClick={() => setStatusFilter(filter.value)}
                  type="button"
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </fieldset>

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
              emptyMessage="Nenhum chamado encontrado para os filtros atuais."
              tickets={filteredTickets}
            />
          )}
        </section>
      </main>
    </section>
  );
}
