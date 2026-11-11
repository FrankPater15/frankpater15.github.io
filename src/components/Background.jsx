import { motion, useScroll, useTransform } from "framer-motion";

// Fondo fijo y continuo: auroras que giran y cambian según el scroll + grano.
// Así no hay "cortes" entre secciones: todo fluye.
export default function Background() {
  const { scrollYProgress } = useScroll();
  const giro = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "40%"]);
  const x = useTransform(scrollYProgress, [0, 0.5, 1], ["10%", "-25%", "15%"]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ rotate: giro, y }}
        className="absolute top-[-30%] right-[-20%] size-[110vmax] rounded-full bg-[conic-gradient(from_90deg,var(--accent),transparent_30%,var(--accent-2),transparent_70%,var(--accent))] opacity-[0.13] blur-[110px]"
      />
      <motion.div
        style={{ x }}
        className="absolute bottom-[-35%] left-[-15%] size-[70vmax] rounded-full bg-accent-2 opacity-[0.08] blur-[130px]"
      />
      <div className="grain absolute inset-[-50%]" />
    </div>
  );
}
