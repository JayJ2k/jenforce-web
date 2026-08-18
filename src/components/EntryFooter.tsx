import {
  ArrowUpRight,
  ChevronDown,
  Globe2,
  Mail,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const usefulLinks = [
  "Central de chamados",
  "Triagem de demandas",
  "Atendimento com pertencimento",
  "Segurança de acesso",
  "Base de apoio",
  "Boas práticas",
];

export function EntryFooter() {
  const shouldReduceMotion = useReducedMotion();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <footer className="compact-footer-v2">
      <motion.section
        animate={{ opacity: 1, y: 0 }}
        className="compact-footer-v2-shell"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.36,
          ease: "easeOut",
        }}
      >
        <div className="compact-footer-v2-main">
          <a className="compact-footer-v2-brand" href="/">
            <img alt="" src="/jenforce-logo.svg" />

            <span>
              <strong>Jenforce</strong>
              <small>Service Desk</small>
            </span>
          </a>

          <p>
            Centralize atendimentos, acompanhe demandas e ofereça suporte com mais clareza,
            segurança e cuidado.
          </p>

          <div className="compact-footer-v2-actions">
            <a href="mailto:contato@jenforce.dev">
              <Mail size={17} strokeWidth={2.4} />
              Contato
            </a>

            <a href="#login">
              <MessageCircle size={17} strokeWidth={2.4} />
              Suporte
            </a>

            <button
              aria-expanded={isExpanded}
              className="compact-footer-v2-toggle"
              onClick={() => setIsExpanded((current) => !current)}
              type="button"
            >
              Links úteis
              <ChevronDown size={17} strokeWidth={2.4} />
            </button>
          </div>
        </div>

        {isExpanded && (
          <motion.nav
            animate={{ opacity: 1, height: "auto", y: 0 }}
            aria-label="Links úteis"
            className="compact-footer-v2-links"
            initial={{ opacity: 0, height: 0, y: shouldReduceMotion ? 0 : -8 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.26,
              ease: "easeOut",
            }}
          >
            {usefulLinks.map((link) => (
              <a href="#produto" key={link}>
                {link}
                <ArrowUpRight size={14} strokeWidth={2.4} />
              </a>
            ))}
          </motion.nav>
        )}

        <div className="compact-footer-v2-bottom">
          <span>
            <Globe2 size={16} strokeWidth={2.4} />
            Brasil
          </span>

          <p>© 2026 Jenforce. Tecnologia responsável, suporte e pertencimento.</p>

          <span>
            <ShieldCheck size={16} strokeWidth={2.4} />
            Acesso seguro
          </span>
        </div>
      </motion.section>

      <a className="compact-footer-v2-floating" href="#login">
        <Sparkles size={17} strokeWidth={2.4} />
        Falar com suporte
      </a>
    </footer>
  );
}
