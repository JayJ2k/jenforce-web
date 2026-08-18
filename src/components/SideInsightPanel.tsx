import { Clock3, MessageCircle, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const insights = [
  {
    label: "Tempo médio",
    value: "08 min",
    detail: "Primeira resposta",
    icon: Clock3,
  },
  {
    label: "Fila ativa",
    value: "24",
    detail: "Chamados acompanhados",
    icon: MessageCircle,
  },
  {
    label: "Segurança",
    value: "100%",
    detail: "Acesso protegido",
    icon: ShieldCheck,
  },
];

export function SideInsightPanel() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="side-insight-panel"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.42,
        delay: shouldReduceMotion ? 0 : 0.24,
        ease: "easeOut",
      }}
    >
      <div className="side-insight-header">
        <span>
          <Sparkles size={17} strokeWidth={2.4} />
        </span>

        <div>
          <strong>Operação em movimento</strong>
          <small>Resumo visual da central</small>
        </div>
      </div>

      <div className="side-insight-grid">
        {insights.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.article
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
              key={item.label}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.3,
                delay: shouldReduceMotion ? 0 : 0.32 + index * 0.06,
                ease: "easeOut",
              }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -4,
                      scale: 1.01,
                    }
              }
            >
              <div className="side-insight-icon">
                <Icon size={18} strokeWidth={2.4} />
              </div>

              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <small>{item.detail}</small>
            </motion.article>
          );
        })}
      </div>

      <div className="side-insight-flow">
        <div>
          <span>Entrada</span>
          <strong>Chamado recebido</strong>
        </div>

        <div>
          <span>Triagem</span>
          <strong>Prioridade definida</strong>
        </div>

        <div>
          <span>Resposta</span>
          <strong>Equipe acionada</strong>
        </div>
      </div>

      <div className="side-insight-footer">
        <TrendingUp size={17} strokeWidth={2.4} />
        <span>Atendimento mais claro, rastreável e humano.</span>
      </div>
    </motion.section>
  );
}
