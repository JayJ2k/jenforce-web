export type TicketPreview = {
  id: string;
  title: string;
  category: string;
  priority: string;
  status: string;
};

export const tickets: TicketPreview[] = [
  {
    id: "JF-2026-001",
    title: "Erro ao acessar sistema interno",
    category: "Acesso",
    priority: "Alta",
    status: "Em analise",
  },
  {
    id: "JF-2026-002",
    title: "Solicitacao de novo equipamento",
    category: "Hardware",
    priority: "Media",
    status: "Aberto",
  },
  {
    id: "JF-2026-003",
    title: "Instabilidade na rede",
    category: "Rede",
    priority: "Urgente",
    status: "Em andamento",
  },
];
