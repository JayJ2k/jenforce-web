const navigationItems = ["Dashboard", "Chamados", "Solicitacoes", "Base de apoio", "Relatorios"];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">JF</div>

        <div>
          <strong>Jenforce</strong>
          <span>Service Desk</span>
        </div>
      </div>

      <nav aria-label="Navegacao principal">
        {navigationItems.map((item) => (
          <a className={item === "Dashboard" ? "active" : ""} href="/" key={item}>
            <span>{item}</span>
          </a>
        ))}
      </nav>

      <div className="sidebar-status">
        <span className="status-dot" />
        <div>
          <strong>Comunidade ativa</strong>
          <small>Atendimento humanizado</small>
        </div>
      </div>
    </aside>
  );
}
