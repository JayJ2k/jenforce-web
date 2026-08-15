import { type FormEvent, useState } from "react";
import { login, registerUser } from "../services/authService";
import type { AuthMode, AuthSession, AuthStatus } from "../types/auth";

type AuthPanelProps = {
  onAuthSuccess: (session: AuthSession) => void;
};

export function AuthPanel({ onAuthSuccess }: AuthPanelProps) {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<AuthStatus>("idle");
  const [feedback, setFeedback] = useState("");

  const isLoading = status === "loading";
  const isLoginMode = authMode === "login";

  function handleAuthModeChange(mode: AuthMode) {
    if (isLoading) {
      return;
    }

    setAuthMode(mode);
    setStatus("idle");
    setFeedback("");
    setPassword("");
  }

  function getSubmitButtonText() {
    if (isLoading && isLoginMode) {
      return "Entrando...";
    }

    if (isLoading && !isLoginMode) {
      return "Criando conta...";
    }

    if (isLoginMode) {
      return "Acessar Jenforce";
    }

    return "Criar conta CUSTOMER";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedName = name.trim();
    const normalizedEmail = email.trim();

    if (!normalizedEmail || !password) {
      setStatus("error");
      setFeedback("Informe email e senha para continuar.");
      return;
    }

    if (!isLoginMode && !normalizedName) {
      setStatus("error");
      setFeedback("Informe seu nome para criar a conta.");
      return;
    }

    setStatus("loading");
    setFeedback(isLoginMode ? "Validando credenciais..." : "Criando cadastro...");

    try {
      if (isLoginMode) {
        const response = await login({
          email: normalizedEmail,
          password,
        });

        onAuthSuccess({
          token: response.token,
          user: response.user,
        });

        setStatus("success");
        setFeedback(`Acesso liberado. Bem-vindo, ${response.user.name}.`);
        setPassword("");
        return;
      }

      const response = await registerUser({
        name: normalizedName,
        email: normalizedEmail,
        password,
      });

      setAuthMode("login");
      setName("");
      setPassword("");
      setStatus("success");
      setFeedback(`Cadastro criado para ${response.user.name}. Agora faca login para acessar.`);
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Nao foi possivel concluir a acao. Tente novamente.",
      );
    }
  }

  return (
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

      <form className="login-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Acesso seguro</p>
        <h2>{isLoginMode ? "Entrar no painel" : "Criar conta"}</h2>

        <fieldset className="auth-mode-switch">
          <legend className="sr-only">Alternar formulario</legend>

          <button
            className={isLoginMode ? "mode-button active" : "mode-button"}
            disabled={isLoading}
            onClick={() => handleAuthModeChange("login")}
            type="button"
          >
            Login
          </button>

          <button
            className={!isLoginMode ? "mode-button active" : "mode-button"}
            disabled={isLoading}
            onClick={() => handleAuthModeChange("register")}
            type="button"
          >
            Cadastro
          </button>
        </fieldset>

        {!isLoginMode && (
          <label htmlFor="name">
            Nome
            <input
              autoComplete="name"
              disabled={isLoading}
              id="name"
              onChange={(event) => setName(event.target.value)}
              placeholder="Seu nome"
              type="text"
              value={name}
            />
          </label>
        )}

        <label htmlFor="email">
          Email
          <input
            autoComplete="email"
            disabled={isLoading}
            id="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="usuario@empresa.com"
            type="email"
            value={email}
          />
        </label>

        <label htmlFor="password">
          Senha
          <input
            autoComplete={isLoginMode ? "current-password" : "new-password"}
            disabled={isLoading}
            id="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="********"
            type="password"
            value={password}
          />
        </label>

        <button className={isLoading ? "loading" : ""} disabled={isLoading} type="submit">
          {getSubmitButtonText()}
        </button>

        <div
          aria-live="polite"
          className={`feedback-message ${status !== "idle" ? "is-visible" : ""} ${status}`}
          role={status === "error" ? "alert" : "status"}
        >
          {feedback}
        </div>

        <p className="helper-text">
          O cadastro publico cria apenas usuarios CUSTOMER. Perfis internos devem ser gerenciados
          por fluxo controlado.
        </p>
      </form>
    </section>
  );
}
