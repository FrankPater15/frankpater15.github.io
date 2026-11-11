import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { estadisticas, perfil, sobreMi } from "../data/portfolio";
import { Card, Reveal, Section } from "./ui";

function Contador({ valor, sufijo }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const control = animate(0, valor, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => control.stop();
  }, [visible, valor]);
  return (
    <span ref={ref}>
      {n.toLocaleString("es-CO")}
      {n === valor ? sufijo : ""}
    </span>
  );
}

export default function About() {
  return (
    <Section id="sobre-mi" numero="01" titulo="Sobre mí">
      <div className="grid items-start gap-10 md:grid-cols-[1.4fr_1fr]">
        <Reveal className="space-y-4 text-lg leading-relaxed text-muted">
          {sobreMi.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>

        <div className="space-y-4">
          {/* Tarjeta estilo terminal */}
          <Reveal delay={0.1}>
            <Card className="overflow-hidden font-mono text-sm">
              <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
                <span className="size-3 rounded-full bg-red-400" />
                <span className="size-3 rounded-full bg-yellow-400" />
                <span className="size-3 rounded-full bg-green-400" />
                <span className="ml-2 text-xs text-muted">frank.json</span>
              </div>
              <pre className="overflow-x-auto p-4 leading-6 text-muted">
{"{\n"}
{"  "}<span className="text-violet-400">"rol"</span>: <span className="text-accent">"Full Stack Jr"</span>,{"\n"}
{"  "}<span className="text-violet-400">"ciudad"</span>: <span className="text-accent">"{perfil.ciudad.split(",")[0]}"</span>,{"\n"}
{"  "}<span className="text-violet-400">"aprendiendo"</span>: <span className="text-accent">"siempre"</span>,{"\n"}
{"  "}<span className="text-violet-400">"disponible"</span>: <span className="text-orange-400">true</span>{"\n"}
{"}"}
              </pre>
            </Card>
          </Reveal>

          {estadisticas.map((e, i) => (
            <Reveal key={e.texto} delay={0.15 + i * 0.1}>
              <Card className="flex items-center gap-4 px-5 py-4">
                <span className="min-w-24 font-title text-3xl font-extrabold text-accent">
                  <Contador valor={e.valor} sufijo={e.sufijo} />
                </span>
                <span className="text-sm leading-snug text-muted">{e.texto}</span>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
