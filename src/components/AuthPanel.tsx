import { Eye, EyeOff, LoaderCircle, LockKeyhole, Mail, ShieldCheck, UserRound } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { type FormEvent, useMemo, useState } from "react";
import { login, registerUser } from "../services/authService";
import type { AuthMode, AuthSession, AuthStatus } from "../types/auth";

type AuthPanelProps = {
  onAuthSuccess: (session: AuthSession) => void;
};

export function AuthPanel({ onAuthSuccess }: AuthPanelProps) {
  const shouldReduceMotion = useReducedMotion();
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<AuthStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isLoading = status === "loading";
  const isLoginMode = authMode === "login";

  const passwordScore = useMemo(() => {
    let score = 0;

    if (password.length >= 6) {
      score += 1;
    }

    if (/[A-Z]/.test(password)) {
      score += 1;
    }

    if (/\d/.test(password)) {
      score += 1;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      score += 1;
    }

    return score;
  }, [password]);

  function handleAuthModeChange(mode: AuthMode) {
    if (isLoading) {
      return;
    }

    setAuthMode(mode);
    setStatus("idle");
    setFeedback("");
    setPassword("");
    setShowPassword(false);
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
      setShowPassword(false);
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
    <motion.form
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="nexus-login-card interactive-login-card"
      id="login"
      initial={{
        opacity: 0,
        scale: shouldReduceMotion ? 1 : 0.98,
        y: shouldReduceMotion ? 0 : 16,
      }}
      onSubmit={handleSubmit}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.42,
        ease: "easeOut",
      }}
    >
      <div className="login-card-topline">
        <div>
          <p>Acesso seguro</p>
          <h2>{isLoginMode ? "Entrar no painel" : "Criar conta"}</h2>
        </div>

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  rotate: status === "success" ? [0, -8, 8, 0] : 0,
                  scale: status === "success" ? [1, 1.08, 1] : 1,
                }
          }
          className="login-security-icon"
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <ShieldCheck size={20} strokeWidth={2.4} />
        </motion.div>
      </div>

      <fieldset className="nexus-mode-switch interactive-mode-switch">
        <legend className="sr-only">Alternar formulario</legend>

        <motion.span
          animate={{ x: isLoginMode ? "0%" : "100%" }}
          className="nexus-mode-indicator"
          transition={{
            duration: shouldReduceMotion ? 0 : 0.26,
            ease: "easeOut",
          }}
        />

        <button
          className={isLoginMode ? "active" : ""}
          disabled={isLoading}
          onClick={() => handleAuthModeChange("login")}
          type="button"
        >
          Login
        </button>

        <button
          className={!isLoginMode ? "active" : ""}
          disabled={isLoading}
          onClick={() => handleAuthModeChange("register")}
          type="button"
        >
          Cadastro
        </button>
      </fieldset>

      {!isLoginMode && (
        <label className="interactive-field" htmlFor="name">
          Nome
          <div className="field-control">
            <UserRound size={18} strokeWidth={2.3} />
            <input
              autoComplete="name"
              disabled={isLoading}
              id="name"
              onChange={(event) => setName(event.target.value)}
              placeholder="Seu nome"
              type="text"
              value={name}
            />
          </div>
        </label>
      )}

      <label className="interactive-field" htmlFor="email">
        Email
        <div className="field-control">
          <Mail size={18} strokeWidth={2.3} />
          <input
            autoComplete="email"
            disabled={isLoading}
            id="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="usuario@empresa.com"
            type="email"
            value={email}
          />
        </div>
      </label>

      <label className="interactive-field" htmlFor="password">
        Senha
        <div className="field-control">
          <LockKeyhole size={18} strokeWidth={2.3} />
          <input
            autoComplete={isLoginMode ? "current-password" : "new-password"}
            disabled={isLoading}
            id="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="********"
            type={showPassword ? "text" : "password"}
            value={password}
          />

          <button
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            className="password-toggle"
            disabled={isLoading}
            onClick={() => setShowPassword((current) => !current)}
            type="button"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </label>

      {!isLoginMode && password.length > 0 && (
        <div className="password-strength" data-score={passwordScore}>
          <div>
            <span />
            <span />
            <span />
            <span />
          </div>
          <small>
            {passwordScore <= 1 && "Senha simples"}
            {passwordScore === 2 && "Senha razoavel"}
            {passwordScore === 3 && "Senha boa"}
            {passwordScore >= 4 && "Senha forte"}
          </small>
        </div>
      )}

      <motion.button
        className={isLoading ? "loading" : ""}
        disabled={isLoading}
        type="submit"
        whileHover={shouldReduceMotion || isLoading ? undefined : { y: -2, scale: 1.01 }}
        whileTap={shouldReduceMotion || isLoading ? undefined : { scale: 0.98 }}
      >
        {isLoading && <LoaderCircle className="button-spinner" size={18} strokeWidth={2.5} />}
        {getSubmitButtonText()}
      </motion.button>

      <div
        aria-live="polite"
        className={`feedback-message ${status !== "idle" ? "is-visible" : ""} ${status}`}
        role={status === "error" ? "alert" : "status"}
      >
        {feedback}
      </div>

      <small>
        Cadastro público cria apenas usuários CUSTOMER. Perfis internos devem seguir fluxo
        controlado.
      </small>
    </motion.form>
  );
}
