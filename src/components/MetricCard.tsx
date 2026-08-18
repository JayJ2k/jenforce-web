import { motion, useReducedMotion } from "motion/react";

type MetricCardProps = {
  label: string;
  value: string;
  detail?: string;
};

export function MetricCard({ label, value, detail }: MetricCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="metric-card"
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -4,
            }
      }
      whileTap={
        shouldReduceMotion
          ? undefined
          : {
              scale: 0.99,
            }
      }
    >
      <span>{label}</span>
      <strong>{value}</strong>
      {detail && <small>{detail}</small>}
    </motion.div>
  );
}
