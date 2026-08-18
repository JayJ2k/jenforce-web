import { motion, useReducedMotion } from "motion/react";
import type { TicketPreview } from "../data/mockTickets";

type TicketListProps = {
  tickets: TicketPreview[];
};

export function TicketList({ tickets }: TicketListProps) {
  const shouldReduceMotion = useReducedMotion();

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
            <span className="ticket-id">{ticket.id}</span>
            <h4>{ticket.title}</h4>
            <p>{ticket.category}</p>
          </div>

          <div className="ticket-meta">
            <span className="priority">{ticket.priority}</span>
            <span className="status-pill">{ticket.status}</span>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
