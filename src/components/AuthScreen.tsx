import { HeartHandshake, LayoutDashboard, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { ComponentType } from "react";
import type { AuthSession } from "../types/auth";
import { AuthPanel } from "./AuthPanel";
import { EntryFooter } from "./EntryFooter";
import { InteractiveHeader } from "./InteractiveHeader";
import { NexusHeroVisual } from "./NexusHeroVisual";
import { SideInsightPanel } from "./SideInsightPanel";

type AuthScreenProps = {
  onAuthSuccess: (session: AuthSession) => void;
};

type ValueIcon = ComponentType<{ size?: number; strokeWidth?: number }>;

type EntryValue = {
  title: string;
  description: string;
  icon: ValueIcon;
};

const values: EntryValue[] = [
  {
    title: "Atendimento com pertencimento",
    description: "Apoie pessoas com uma fila mais clara, acolhedora e rastreavel.",
    icon: HeartHandshake,
  },
  {
    title: "Organizacao para equipes reais",
    description: "Priorize chamados, acompanhe demandas e reduza ruídos na operacao.",
    icon: LayoutDashboard,
  },
  {
    title: "Tecnologia humana e responsavel",
    description: "Use dados e processos sem perder o cuidado com quem precisa de suporte.",
    icon: ShieldCheck,
  },
];

export function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <InteractiveHeader />

      <section className="nexus-hero-shell" id="produto">
        <NexusHeroVisual />

        <motion.aside
          animate={{ opacity: 1, y: 0 }}
          className="nexus-login-column"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
            delay: shouldReduceMotion ? 0 : 0.18,
            ease: "easeOut",
          }}
        >
          <AuthPanel onAuthSuccess={onAuthSuccess} />
          <SideInsightPanel />
        </motion.aside>
      </section>

      <section aria-label="Valores do Jenforce" className="nexus-values" id="comunidade">
        {values.map((value, index) => {
          const Icon = value.icon;

          return (
            <motion.article
              animate={{ opacity: 1, y: 0 }}
              className="nexus-value-card"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
              key={value.title}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.34,
                delay: shouldReduceMotion ? 0 : 0.28 + index * 0.08,
                ease: "easeOut",
              }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -5,
                      scale: 1.01,
                    }
              }
            >
              <span className="nexus-value-index">0{index + 1}</span>

              <div className="nexus-value-icon">
                <Icon size={21} strokeWidth={2.4} />
              </div>

              <div className="nexus-value-content">
                <strong>{value.title}</strong>
                <p>{value.description}</p>
              </div>

              <span className="nexus-value-arrow">→</span>
            </motion.article>
          );
        })}
      </section>

      <EntryFooter />
    </>
  );
}
