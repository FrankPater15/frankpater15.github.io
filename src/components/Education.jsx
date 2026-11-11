import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { formacion } from "../data/portfolio";
import { Section } from "./ui";

// Tarjetas que se apilan unas sobre otras mientras bajas
function TarjetaApilada({ f, i, total }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const escala = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - i) * 0.04]);

  return (
    <div ref={ref} className="sticky h-[300px] md:h-[280px]" style={{ top: `calc(110px + ${i * 26}px)` }}>
      <motion.div
        style={{ scale: escala }}
        className="flex h-[260px] origin-top flex-col justify-between rounded-3xl border border-line bg-solid p-7 shadow-2xl shadow-black/40 md:h-[240px] md:p-10"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm text-accent">{f.fecha}</span>
          <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent">
            <GraduationCap className="size-6" />
          </span>
        </div>
        <div>
          <h3 className="font-title text-xl leading-tight font-bold md:text-3xl">{f.titulo}</h3>
          <p className="mt-2 text-muted">{f.lugar}</p>
          {f.extra && <p className="mt-1 text-sm text-accent">{f.extra}</p>}
        </div>
      </motion.div>
    </div>
  );
}

export default function Education() {
  return (
    <Section id="formacion" numero="05" kicker="Formación" titulo="Dónde aprendí.">
      <div className="pb-10">
        {formacion.map((f, i) => (
          <TarjetaApilada key={f.titulo} f={f} i={i} total={formacion.length} />
        ))}
      </div>
    </Section>
  );
}
