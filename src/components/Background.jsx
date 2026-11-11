import { motion, useScroll, useTransform } from "framer-motion";

// Fondo fijo: dos luces suaves que se desplazan con el scroll + grano.
// Las luces usan radial-gradient (no filter: blur), que es muchísimo más
// liviano: el blur sobre capas gigantes se recalculaba en cada cuadro.
export default function Background() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "40%"]);
  const x = useTransform(scrollYProgress, [0, 0.5, 1], ["10%", "-25%", "15%"]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute top-[-30%] right-[-20%] size-[110vmax] rounded-full bg-[radial-gradient(closest-side,var(--accent),transparent)] opacity-[0.07] will-change-transform"
      />
      <motion.div
        style={{ x }}
        className="absolute bottom-[-35%] left-[-15%] size-[70vmax] rounded-full bg-[radial-gradient(closest-side,var(--accent-2),transparent)] opacity-[0.08] will-change-transform"
      />
      <div className="grain absolute inset-0 hidden md:block" />
    </div>
  );
}
