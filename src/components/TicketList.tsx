import { motion, useReducedMotion } from "motion/react";
import type { TicketListItem } from "../types/ticket";

type TicketListProps = {
  tickets: TicketListItem[];
  emptyMessage?: string;
};

const statusLabels: Record<string, string> = {
  OPEN: "Aberto",
  IN_PROGRESS: "Em atendimento",
  RESOLVED: "Resolvido",
  CLOSED: "Encerrado",
};

const priorityLabels: Record<string, string> = {
  LOW: "Baixa",
  MEDIUM: "Média",
  HIGH: "Alta",
  URGENT: "Urgente",
};

const categoryLabels: Record<string, string> = {
  ACCESS: "Acesso",
  SYSTEM: "Sistema",
  HARDWARE: "Hardware",
  NETWORK: "Rede",
  REQUEST: "Solicitação",
  BUG: "Erro/Bug",
};

function formatValue(labels: Record<string, string>, value: string) {
  return labels[value] ?? value;
}

export function TicketList({
  tickets,
  emptyMessage = "Nenhum chamado encontrado.",
}: TicketListProps) {
  const shouldReduceMotion = useReducedMotion();

  if (tickets.length === 0) {
    return (
      <div className="ticket-empty-state">
        <strong>Fila vazia</strong>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="ticket-list">
      {tickets.map((ticket, index) => (
        <motion.article
          animate={{ opacity: 1, x: 0 }}
          className="ticket-item"
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 12 }}
          key={ticket.id}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.3,
            delay: shouldReduceMotion ? 0 : index * 0.06,
            ease: "easeOut",
          }}
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  x: 3,
                }
          }
        >
          <div>
            <span className="ticket-id">{ticket.protocol ?? ticket.id}</span>
            <h4>{ticket.title}</h4>
            <p>{formatValue(categoryLabels, ticket.category)}</p>
          </div>

          <div className="ticket-meta">
            <span className="priority">{formatValue(priorityLabels, ticket.priority)}</span>
            <span className="status-pill">{formatValue(statusLabels, ticket.status)}</span>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
