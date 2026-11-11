import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase } from "lucide-react";
import { experiencia } from "../data/portfolio";
import { publico, Reveal, Section } from "./ui";

// La columna izquierda se queda fija mientras la línea se "dibuja" con el scroll
function Puesto({ exp }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.55"] });
  const escala = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div ref={ref} className="grid gap-10 md:grid-cols-[1fr_1.5fr] md:gap-16">
      <div className="self-start md:sticky md:top-32">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 font-mono text-xs text-accent backdrop-blur">
            <Briefcase className="size-3.5" /> {exp.fecha}
          </span>
          {exp.logo && (
            // El logo se "pinta" con el color del tema (negro en claro, blanco en oscuro)
            <div
              role="img"
              aria-label={`Logo de ${exp.empresa}`}
              className="mt-6 aspect-[5/2] w-44 bg-ink md:w-52"
              style={{
                maskImage: `url(${publico(exp.logo)})`,
                WebkitMaskImage: `url(${publico(exp.logo)})`,
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "left center",
                WebkitMaskPosition: "left center",
              }}
            />
          )}
          <h3 className="mt-5 font-title text-3xl leading-tight font-bold md:text-4xl">{exp.empresa}</h3>
          <p className="mt-2 text-lg text-muted">{exp.cargo}</p>
        </Reveal>
      </div>

      <div className="relative pl-10">
        <div className="absolute top-0 left-0 h-full w-px bg-line" />
        <motion.div style={{ scaleY: escala }} className="absolute top-0 left-0 h-full w-px origin-top bg-gradient-to-b from-accent to-accent-2" />
        {exp.logros.map((l, i) => (
          <Reveal key={i} className="relative pb-10 last:pb-0">
            <span className="absolute top-1.5 -left-10 -ml-[6px] size-3 rounded-full border-2 border-accent bg-bg shadow-[0_0_12px_var(--accent)]" />
            <span className="font-mono text-xs text-accent">0{i + 1}</span>
            <p className="mt-1 text-lg leading-relaxed md:text-xl">{l}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <Section id="experiencia" numero="03" kicker="Experiencia" titulo="Dónde he trabajado.">
      <div className="space-y-24">
        {experiencia.map((exp) => (
          <Puesto key={exp.cargo} exp={exp} />
        ))}
      </div>
    </Section>
  );
}
