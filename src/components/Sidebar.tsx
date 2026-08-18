import { BookOpen, ClipboardList, FolderKanban, Home, Inbox, LifeBuoy, Users } from "lucide-react";

const navigationItems = [
  {
    label: "Dashboard",
    icon: Home,
    active: false,
  },
  {
    label: "Meus chamados",
    icon: Inbox,
    active: false,
  },
  {
    label: "Todos os chamados",
    icon: ClipboardList,
    active: true,
  },
  {
    label: "Triagem",
    icon: FolderKanban,
    active: false,
  },
  {
    label: "Clientes",
    icon: Users,
    active: false,
  },
  {
    label: "Base de apoio",
    icon: BookOpen,
    active: false,
  },
];

export function Sidebar() {
  return (
    <aside className="sidebar dashboard-sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">JF</div>

        <div>
          <strong>Jenforce</strong>
          <span>Service Desk</span>
        </div>
      </div>

      <nav aria-label="Navegação principal">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <a
              aria-current={item.active ? "page" : undefined}
              className={item.active ? "active" : ""}
              href="/"
              key={item.label}
            >
              <Icon aria-hidden="true" size={18} strokeWidth={2.1} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      <div className="sidebar-status">
        <LifeBuoy aria-hidden="true" size={18} strokeWidth={2.1} />
        <div>
          <strong>Comunidade ativa</strong>
          <small>Atendimento humanizado</small>
        </div>
      </div>
    </aside>
  );
}
