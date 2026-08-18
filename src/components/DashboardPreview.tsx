import { motion, useReducedMotion } from "motion/react";
import { tickets } from "../data/mockTickets";
import { MetricCard } from "./MetricCard";
import { Sidebar } from "./Sidebar";
import { TicketList } from "./TicketList";

export function DashboardPreview() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      animate={
        shouldReduceMotion
          ? { opacity: 1, scale: 1, y: 0 }
          : {
              opacity: 1,
              scale: 1,
              y: [0, -10, 0],
              rotate: [0, -0.45, 0],
            }
      }
      className="dashboard-preview product-showcase"
      id="preview"
      initial={{
        opacity: 0,
        scale: shouldReduceMotion ? 1 : 0.96,
        y: shouldReduceMotion ? 0 : 28,
      }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              opacity: { duration: 0.5, ease: "easeOut" },
              scale: { duration: 0.5, ease: "easeOut" },
              y: {
                duration: 7,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
              },
              rotate: {
                duration: 7,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
              },
            }
      }
    >
      <div className="preview-topbar">
        <span />
        <span />
        <span />
        <strong>Preview do produto</strong>
      </div>

      <div className="product-shell">
        <Sidebar />

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="dashboard-content"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.45,
            delay: shouldReduceMotion ? 0 : 0.2,
            ease: "easeOut",
          }}
        >
          <header className="dashboard-header">
            <div>
              <p className="eyebrow">Visao geral</p>
              <h2>Painel de atendimento</h2>
              <span className="dashboard-subtitle">
                Organize chamados, acompanhe prioridades e fortaleça o cuidado com sua comunidade.
              </span>
            </div>

            <button className="secondary-button" type="button">
              Novo chamado
            </button>
          </header>

          <div className="metrics">
            <MetricCard detail="Fila acompanhada" label="Abertos" value="24" />
            <MetricCard detail="Demandas sensiveis" label="Urgentes" value="03" />
            <MetricCard detail="Ultimas 24h" label="Resolvidos hoje" value="12" />
          </div>

          <div className="tickets-card">
            <div className="tickets-header">
              <div>
                <h3>Chamados recentes</h3>
                <p>Previa da fila de atendimento</p>
              </div>

              <span>Atualizado agora</span>
            </div>

            <TicketList tickets={tickets} />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
