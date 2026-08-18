import {
  ArrowDown,
  Headphones,
  Network,
  ShieldCheck,
  Sparkles,
  TicketCheck,
  UsersRound,
} from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { ComponentType } from "react";
import { useEffect } from "react";

type IconComponent = ComponentType<{ size?: number; strokeWidth?: number }>;

type FloatingCard = {
  title: string;
  value: string;
  className: string;
  icon: IconComponent;
};

const cards: FloatingCard[] = [
  {
    title: "Chamados",
    value: "24 ativos",
    className: "one",
    icon: TicketCheck,
  },
  {
    title: "Triagem",
    value: "03 urgentes",
    className: "two",
    icon: ShieldCheck,
  },
  {
    title: "Comunidade",
    value: "Suporte humanizado",
    className: "three",
    icon: UsersRound,
  },
];

export function NexusHeroVisual() {
  const shouldReduceMotion = useReducedMotion();

  const buttonX = useMotionValue(0);
  const buttonY = useMotionValue(0);
  const springX = useSpring(buttonX, { stiffness: 180, damping: 16 });
  const springY = useSpring(buttonY, { stiffness: 180, damping: 16 });

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    function handleMouseMove(event: MouseEvent) {
      const hero = document.querySelector(".nexus-hero-content");

      if (!hero) {
        return;
      }

      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.018;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.018;

      buttonX.set(x);
      buttonY.set(y);
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [buttonX, buttonY, shouldReduceMotion]);

  return (
    <section className="nexus-hero-content">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="nexus-kicker"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: "easeOut" }}
      >
        <span />
        Tecnologia com comunidade
      </motion.div>

      <h1 className="nexus-headline hero-headline-fixed">
        <motion.span
          animate={{ opacity: 1, y: 0 }}
          className="hero-title-line is-solid"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 42 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: "easeOut" }}
        >
          Organize o suporte.
        </motion.span>

        <motion.span
          animate={{ opacity: 1, y: 0 }}
          className="hero-title-line is-outline"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 42 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.55,
            delay: shouldReduceMotion ? 0 : 0.12,
            ease: "easeOut",
          }}
        >
          Fortaleça
        </motion.span>

        <motion.span
          animate={{ opacity: 1, y: 0 }}
          className="hero-title-line is-outline"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 42 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.55,
            delay: shouldReduceMotion ? 0 : 0.22,
            ease: "easeOut",
          }}
        >
          quem atende.
        </motion.span>
      </h1>

      <motion.p
        animate={{ opacity: 1, y: 0 }}
        className="nexus-description"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
        transition={{
          delay: shouldReduceMotion ? 0 : 0.45,
          duration: shouldReduceMotion ? 0 : 0.45,
          ease: "easeOut",
        }}
      >
        Uma central de chamados para equipes que cuidam de pessoas, acompanham demandas e constroem
        suporte com clareza, pertencimento e responsabilidade.
      </motion.p>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="nexus-actions"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
        transition={{
          delay: shouldReduceMotion ? 0 : 0.58,
          duration: shouldReduceMotion ? 0 : 0.42,
          ease: "easeOut",
        }}
      >
        <motion.a
          className="nexus-primary-link nexus-magnetic-link"
          href="#login"
          style={{ x: springX, y: springY }}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.035 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
        >
          <Sparkles size={18} strokeWidth={2.4} />
          Acessar plataforma
        </motion.a>

        <motion.a
          className="nexus-secondary-link"
          href="#comunidade"
          whileHover={shouldReduceMotion ? undefined : { y: -2 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
        >
          Ver proposta
        </motion.a>
      </motion.div>

      <div className="nexus-stage">
        <div className="nexus-stage-grid" />

        <motion.div
          animate={shouldReduceMotion ? undefined : { rotate: 360 }}
          aria-hidden="true"
          className="nexus-orbit-text"
          transition={{
            duration: 26,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          <svg aria-labelledby="nexus-orbit-title" role="img" viewBox="0 0 120 120">
            <title id="nexus-orbit-title">
              Mensagem circular do Jenforce sobre comunidade, suporte e cuidado
            </title>
            <path
              d="M 60, 60 m -46, 0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
              fill="transparent"
              id="nexus-circle"
            />
            <text>
              <textPath href="#nexus-circle">Jenforce · Comunidade · Suporte · Cuidado ·</textPath>
            </text>
          </svg>
        </motion.div>

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, -8, 0],
                  rotate: [0, -0.8, 0],
                }
          }
          className="nexus-core-card"
          transition={{
            duration: 6,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.025, y: -6 }}
        >
          <span>
            <Network size={21} strokeWidth={2.5} />
          </span>
          <strong>Centro de atendimento</strong>
          <small>Chamados, prioridades e acompanhamento em um só fluxo.</small>
        </motion.div>

        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.article
              animate={
                shouldReduceMotion
                  ? { opacity: 1, y: 0 }
                  : {
                      opacity: 1,
                      y: [0, index % 2 === 0 ? -10 : 10, 0],
                    }
              }
              className={`nexus-floating-card ${card.className}`}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
              key={card.title}
              transition={{
                opacity: {
                  duration: shouldReduceMotion ? 0 : 0.36,
                  delay: shouldReduceMotion ? 0 : 0.72 + index * 0.08,
                  ease: "easeOut",
                },
                y: {
                  duration: 5.4 + index * 0.35,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                },
              }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 1.04,
                      y: -6,
                    }
              }
            >
              <div className="nexus-card-icon">
                <Icon size={18} strokeWidth={2.4} />
              </div>

              <span>{card.title}</span>
              <strong>{card.value}</strong>
            </motion.article>
          );
        })}

        <motion.div
          animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
          className="nexus-scroll-cue"
          transition={{
            duration: 2.2,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
          aria-hidden="true"
        >
          <ArrowDown size={20} strokeWidth={2.4} />
        </motion.div>

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: [0.35, 0.8, 0.35],
                  scale: [1, 1.08, 1],
                }
          }
          className="nexus-pulse-dot"
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
          aria-hidden="true"
        >
          <Headphones size={18} strokeWidth={2.4} />
        </motion.div>
      </div>
    </section>
  );
}

