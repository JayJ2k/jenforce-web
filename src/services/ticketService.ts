import type { Ticket } from "../types/ticket";
import { apiRequest } from "./api";

type ListTicketsResponse = {
  tickets: Ticket[];
};

export function listTickets(token: string) {
  return apiRequest<ListTicketsResponse>("/tickets", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
