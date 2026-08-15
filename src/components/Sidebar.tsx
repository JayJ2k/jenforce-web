export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">JF</div>

      <nav>
        <a className="active" href="/">
          Dashboard
        </a>
        <a href="/">Chamados</a>
        <a href="/">Usuarios</a>
        <a href="/">Relatorios</a>
        <a href="/">Configuracoes</a>
      </nav>
    </aside>
  );
}
