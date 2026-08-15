import type { TicketPreview } from "../data/mockTickets";

type TicketListProps = {
  tickets: TicketPreview[];
};

export function TicketList({ tickets }: TicketListProps) {
  return (
    <div className="ticket-list">
      {tickets.map((ticket) => (
        <article className="ticket-item" key={ticket.id}>
          <div>
            <span className="ticket-id">{ticket.id}</span>
            <h4>{ticket.title}</h4>
            <p>{ticket.category}</p>
          </div>

          <div className="ticket-meta">
            <span className="priority">{ticket.priority}</span>
            <span>{ticket.status}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
