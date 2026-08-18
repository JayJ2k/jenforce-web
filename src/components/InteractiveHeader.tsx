import {
  ArrowRight,
  BookOpenText,
  HeartHandshake,
  LayoutDashboard,
  LogIn,
  Menu,
  MessageSquareText,
  Route,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import type { ComponentType, CSSProperties, PointerEvent } from "react";
import { useEffect, useState } from "react";

type NavigationLink = {
  label: string;
  href: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
};

type MenuItem = {
  title: string;
  description: string;
  href: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
};

const navigationLinks: NavigationLink[] = [
  {
    label: "Produto",
    href: "#produto",
    icon: LayoutDashboard,
  },
  {
    label: "Comunidade",
    href: "#comunidade",
    icon: HeartHandshake,
  },
  {
    label: "Acessar",
    href: "#login",
    icon: LogIn,
  },
];

const menuItems: MenuItem[] = [
  {
    title: "Fluxo de chamados",
    description: "Entenda como o Jenforce organiza demandas, prioridades e respostas.",
    href: "#produto",
    icon: Route,
  },
  {
    title: "Atendimento humano",
    description: "Tecnologia para apoiar equipes que cuidam de pessoas.",
    href: "#comunidade",
    icon: HeartHandshake,
  },
  {
    title: "Segurança de acesso",
    description: "Login, cadastro CUSTOMER e controle de perfis internos.",
    href: "#login",
    icon: ShieldCheck,
  },
  {
    title: "Base de apoio",
    description: "Espaço para guias, processos e informações recorrentes.",
    href: "#comunidade",
    icon: BookOpenText,
  },
];

export function InteractiveHeader() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.25,
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const [isPointerInside, setIsPointerInside] = useState(false);
  const [hasLogo, setHasLogo] = useState(true);
  const [activeHref, setActiveHref] = useState("#produto");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 16);

      const currentSection = [...navigationLinks].reverse().find((link) => {
        const element = document.querySelector(link.href);

        if (!element) {
          return false;
        }

        return element.getBoundingClientRect().top <= 180;
      });

      setActiveHref(currentSection?.href ?? "#produto");
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const navStyle = {
    "--nav-cursor-x": `${cursorPosition.x}px`,
    "--nav-cursor-y": `${cursorPosition.y}px`,
  } as CSSProperties;

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (shouldReduceMotion) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });

    setIsPointerInside(true);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <>
      <motion.header
        animate={{ opacity: 1, y: 0 }}
        className={`nexus-nav interactive-header ${isScrolled ? "is-scrolled" : ""} ${
          isPointerInside ? "is-pointer-inside" : ""
        }`}
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
        onPointerLeave={() => setIsPointerInside(false)}
        onPointerMove={handlePointerMove}
        style={navStyle}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.42,
          ease: "easeOut",
        }}
      >
        <motion.span className="nexus-nav-progress" style={{ scaleX: progressScale }} />

        <a className="nexus-brand" href="/">
          <span className="nexus-brand-logo-wrap">
            {hasLogo ? (
              <img
                alt=""
                className="nexus-brand-logo"
                onError={() => setHasLogo(false)}
                src="/jenforce-logo.svg"
              />
            ) : (
              <span className="nexus-brand-fallback">JF</span>
            )}
          </span>

          <div>
            <strong>Jenforce</strong>
            <small>Service Desk</small>
          </div>
        </a>

        <nav aria-label="Navegação principal" className="nexus-links">
          {navigationLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeHref === link.href;

            return (
              <motion.a
                className={isActive ? "nexus-nav-link is-active" : "nexus-nav-link"}
                href={link.href}
                key={link.href}
                whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              >
                <Icon size={16} strokeWidth={2.4} />
                {link.label}
                <span className="nav-link-glow" />
              </motion.a>
            );
          })}
        </nav>

        <div className="nexus-header-actions">
          <motion.button
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            className={isMenuOpen ? "nexus-menu-trigger is-open" : "nexus-menu-trigger"}
            onClick={() => setIsMenuOpen((current) => !current)}
            type="button"
            whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.03 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
          >
            <Menu size={21} strokeWidth={2.5} />
          </motion.button>

          <motion.a
            className="nexus-nav-button interactive-nav-button"
            href="#login"
            whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.02 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          >
            Entrar
            <ArrowRight size={17} strokeWidth={2.5} />
          </motion.a>
        </div>
      </motion.header>

      {isMenuOpen && (
        <motion.div
          animate={{ opacity: 1 }}
          className="nexus-command-layer"
          initial={{ opacity: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.2,
            ease: "easeOut",
          }}
        >
          <button
            aria-label="Fechar menu lateral"
            className="nexus-command-backdrop"
            onClick={closeMenu}
            type="button"
          />

          <motion.aside
            animate={{ opacity: 1, x: 0, scale: 1 }}
            aria-label="Menu de funcionalidades do Jenforce"
            className="nexus-command-menu"
            initial={{
              opacity: 0,
              x: shouldReduceMotion ? 0 : 28,
              scale: shouldReduceMotion ? 1 : 0.98,
            }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.32,
              ease: "easeOut",
            }}
          >
            <div className="command-menu-header">
              <div>
                <p>Central Jenforce</p>
                <h2>Explore o service desk</h2>
              </div>

              <button aria-label="Fechar menu" onClick={closeMenu} type="button">
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            <div className="command-menu-status">
              <span>
                <Sparkles size={18} strokeWidth={2.4} />
              </span>

              <div>
                <strong>Operação em visão clara</strong>
                <small>Chamados, comunidade e segurança conectados em um só fluxo.</small>
              </div>
            </div>

            <div className="command-menu-grid">
              {menuItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.a
                    className="command-menu-item"
                    href={item.href}
                    key={item.title}
                    onClick={closeMenu}
                    whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.01 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  >
                    <span className="command-menu-index">0{index + 1}</span>

                    <div className="command-menu-icon">
                      <Icon size={20} strokeWidth={2.4} />
                    </div>

                    <div>
                      <strong>{item.title}</strong>
                      <small>{item.description}</small>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            <div className="command-menu-footer">
              <article>
                <MessageSquareText size={19} strokeWidth={2.4} />
                <div>
                  <strong>24 chamados</strong>
                  <small>Fila em acompanhamento</small>
                </div>
              </article>

              <article>
                <UsersRound size={19} strokeWidth={2.4} />
                <div>
                  <strong>Comunidade ativa</strong>
                  <small>Suporte com pertencimento</small>
                </div>
              </article>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </>
  );
}
