export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

export type TicketPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type TicketCategory = "ACCESS" | "SYSTEM" | "HARDWARE" | "NETWORK" | "REQUEST" | "BUG";

export type TicketUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type Ticket = {
  id: string;
  protocol: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  requesterId: string;
  assigneeId?: string | null;
  createdAt: string;
  updatedAt: string;
  requester?: TicketUser;
  assignee?: TicketUser | null;
};

export type TicketListItem = {
  id: string;
  protocol?: string;
  title: string;
  category: string;
  priority: string;
  status: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};
