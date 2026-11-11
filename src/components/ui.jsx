import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

// Aparece suavemente al entrar en pantalla
export function Reveal({ children, delay = 0, y = 40, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// Texto que sube palabra por palabra desde una "máscara"
// play: true/false para controlarlo, o undefined para que arranque al verse
// (la detección va en el contenedor: las palabras escondidas bajo la máscara
//  no cuentan como "visibles" para el navegador)
const palabraVariantes = {
  oculto: { y: "115%", rotate: 6 },
  visible: (i) => ({ y: "0%", rotate: 0, transition: { duration: 0.9, delay: i, ease: EASE } }),
};
export function SplitText({ text, as = "span", className = "", delay = 0, play }) {
  const Tag = motion[as];
  const palabras = text.split(" ");
  const controlado = play !== undefined;
  return (
    <Tag
      className={className}
      aria-label={text}
      initial="oculto"
      {...(controlado ? { animate: play ? "visible" : "oculto" } : { whileInView: "visible", viewport: { once: true, amount: 0.4 } })}
    >
      {palabras.map((p, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span className="inline-block" variants={palabraVariantes} custom={delay + i * 0.07}>
            {p}
            {i < palabras.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

// Igual, pero letra por letra (para títulos gigantes)
export function SplitChars({ text, className = "", delay = 0, play = true }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((c, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={play ? { y: "0%" } : undefined}
            transition={{ duration: 1, delay: delay + i * 0.05, ease: EASE }}
          >
            {c === " " ? " " : c}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Texto que se ilumina palabra por palabra mientras haces scroll
export function ScrollText({ text, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const palabras = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {palabras.map((p, i) => (
        <Palabra key={i} progreso={scrollYProgress} rango={[i / palabras.length, (i + 1) / palabras.length]}>
          {p}
        </Palabra>
      ))}
    </p>
  );
}
function Palabra({ children, progreso, rango }) {
  const opacity = useTransform(progreso, rango, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{" "}
    </motion.span>
  );
}

// Botón magnético: se "pega" al mouse cuando te acercas
export function Magnetic({ children, fuerza = 0.35, className = "" }) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 180, damping: 14, mass: 0.2 });
  const y = useSpring(0, { stiffness: 180, damping: 14, mass: 0.2 });
  const mover = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * fuerza);
    y.set((e.clientY - (r.top + r.height / 2)) * fuerza);
  };
  const soltar = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div ref={ref} onMouseMove={mover} onMouseLeave={soltar} style={{ x, y }} className={`inline-block ${className}`}>
      {children}
    </motion.div>
  );
}

// Tarjeta con inclinación 3D + luz que sigue al mouse
export function TiltCard({ children, className = "", intensidad = 8, ...props }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(ry, { stiffness: 200, damping: 20 });
  const mover = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * intensidad * 2);
    rx.set(-(py - 0.5) * intensidad * 2);
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  const soltar = () => {
    rx.set(0);
    ry.set(0);
  };
  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        onMouseMove={mover}
        onMouseLeave={soltar}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`spotlight h-full rounded-3xl border border-line bg-card backdrop-blur-xl transition-colors duration-300 hover:border-accent/40 ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Encabezado y contenedor de cada sección
export function Section({ id, numero, kicker, titulo, children, className = "" }) {
  return (
    <section id={id} className={`relative py-24 md:py-40 ${className}`}>
      <div className="container-x">
        <Encabezado numero={numero} kicker={kicker} titulo={titulo} />
        {children}
      </div>
    </section>
  );
}

export function Encabezado({ numero, kicker, titulo }) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal y={20}>
        <p className="flex items-center gap-3 font-mono text-sm text-accent">
          <span>{numero}</span>
          <span className="h-px w-10 bg-accent" />
          <span className="uppercase tracking-[0.2em]">{kicker}</span>
        </p>
      </Reveal>
      <SplitText as="h2" text={titulo} className="mt-4 block font-title text-4xl leading-[1.05] font-bold tracking-tight md:text-7xl" />
    </div>
  );
}

// Ícono de GitHub (lucide ya no incluye logos de marcas)
export function GithubIcon({ className = "size-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.82 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

// Ruta a archivos de /public que funciona en cualquier despliegue
export const publico = (archivo) => import.meta.env.BASE_URL + archivo;
