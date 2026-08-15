import "./App.css";

const tickets = [
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

function App() {
  return (
    <main className="app">
      <section className="auth-panel">
        <div className="brand">
          <div className="brand-icon">JF</div>

          <div>
            <p className="eyebrow">Central de operacoes</p>
            <h1>Jenforce</h1>
            <p className="brand-description">
              Sistema de chamados para suporte tecnico e atendimento interno.
            </p>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-card-header">
            <span>Status da operacao</span>
            <strong>Online</strong>
          </div>

          <div className="hero-grid">
            <div>
              <strong>24</strong>
              <span>chamados ativos</span>
            </div>

            <div>
              <strong>08</strong>
              <span>em analise</span>
            </div>

            <div>
              <strong>96%</strong>
              <span>SLA previsto</span>
            </div>
          </div>
        </div>

        <form className="login-card">
          <p className="eyebrow">Acesso seguro</p>
          <h2>Entrar no painel</h2>

          <label>
            Email
            <input type="email" placeholder="usuario@empresa.com" />
          </label>

          <label>
            Senha
            <input type="password" placeholder="********" />
          </label>

          <button type="button">Acessar Jenforce</button>

          <p className="helper-text">
            Interface visual inicial. A integracao com a API sera feita em uma proxima etapa.
          </p>
        </form>
      </section>

      <section className="dashboard-preview">
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

        <div className="dashboard-content">
          <header className="dashboard-header">
            <div>
              <p className="eyebrow">Visao geral</p>
              <h2>Painel de atendimento</h2>
            </div>

            <button type="button" className="secondary-button">
              Novo chamado
            </button>
          </header>

          <div className="metrics">
            <div className="metric-card">
              <span>Abertos</span>
              <strong>24</strong>
            </div>

            <div className="metric-card">
              <span>Urgentes</span>
              <strong>03</strong>
            </div>

            <div className="metric-card">
              <span>Resolvidos hoje</span>
              <strong>12</strong>
            </div>
          </div>

          <div className="tickets-card">
            <div className="tickets-header">
              <h3>Chamados recentes</h3>
              <span>Atualizado agora</span>
            </div>

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
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
