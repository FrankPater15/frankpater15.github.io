import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { estadisticas, frase, sobreMi } from "../data/portfolio";
import { Reveal, ScrollText, Section, TiltCard } from "./ui";

function Contador({ valor, sufijo }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const control = animate(0, valor, { duration: 2, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => control.stop();
  }, [visible, valor]);
  return (
    <span ref={ref} className="tabular-nums">
      {n.toLocaleString("es-CO")}
      <span className="text-accent">{sufijo}</span>
    </span>
  );
}

export default function About() {
  return (
    <Section id="sobre-mi" numero="01" kicker="Sobre mí" titulo="Construyo cosas que la gente usa.">
      <ScrollText text={frase} className="max-w-5xl font-title text-3xl leading-[1.2] font-semibold tracking-tight md:text-5xl" />

      <div className="mt-24 grid gap-6 md:grid-cols-3">
        {estadisticas.map((e, i) => (
          <Reveal key={e.texto} delay={i * 0.1}>
            <TiltCard className="p-8">
              <p className="font-title text-6xl font-extrabold tracking-tighter md:text-7xl">
                <Contador valor={e.valor} sufijo={e.sufijo} />
              </p>
              <p className="mt-3 text-muted">{e.texto}</p>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-6 block">
        <TiltCard intensidad={4} className="space-y-4 p-8 text-lg leading-relaxed text-muted">
          {sobreMi.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </TiltCard>
      </Reveal>
    </Section>
  );
}
