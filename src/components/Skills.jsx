import { motion } from "framer-motion";
import { Bot, Code2, Database, Heart, Languages, Server, Smartphone, Wrench } from "lucide-react";
import { habilidades, habilidadesPersonales, idiomas } from "../data/portfolio";
import { Reveal, Section, TiltCard } from "./ui";

// Diseño "bento": cada categoría ocupa un tamaño distinto en la cuadrícula
const celdas = [
  { nombre: "Frontend", icono: Code2, clase: "md:col-span-2 md:row-span-2", grande: true },
  { nombre: "Backend", icono: Server, clase: "" },
  { nombre: "Bases de datos", icono: Database, clase: "" },
  { nombre: "Automatización", icono: Bot, clase: "md:col-span-2" },
  { nombre: "Móvil", icono: Smartphone, clase: "" },
  { nombre: "Herramientas", icono: Wrench, clase: "md:col-span-2" },
];

function Celda({ titulo, Icono, children, grande }) {
  return (
    <TiltCard className="group flex h-full flex-col p-7">
      <div className="mb-6 flex items-center justify-between">
        <h3 className={`font-title font-bold ${grande ? "text-3xl" : "text-xl"}`}>{titulo}</h3>
        <span className="grid size-11 place-items-center rounded-2xl bg-accent-soft text-accent transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
          <Icono className="size-5" />
        </span>
      </div>
      {children}
    </TiltCard>
  );
}

export default function Skills() {
  return (
    <Section id="habilidades" numero="02" kicker="Habilidades" titulo="Mi caja de herramientas.">
      <div className="grid auto-rows-[minmax(170px,auto)] gap-5 md:grid-cols-4">
        {celdas.map((c, i) => (
          <Reveal key={c.nombre} delay={(i % 4) * 0.08} className={c.clase}>
            <Celda titulo={c.nombre} Icono={c.icono} grande={c.grande}>
              <div className={`mt-auto flex flex-wrap gap-2 ${c.grande ? "gap-3" : ""}`}>
                {habilidades[c.nombre].map((h, j) => (
                  <motion.span
                    key={h}
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + j * 0.05, type: "spring", stiffness: 260, damping: 18 }}
                    whileHover={{ y: -4 }}
                    className={`rounded-full border border-accent/25 bg-accent-soft font-mono font-semibold text-accent ${c.grande ? "px-5 py-2.5 text-base" : "px-3.5 py-1.5 text-sm"}`}
                  >
                    {h}
                  </motion.span>
                ))}
              </div>
              {c.grande && (
                <p className="mt-6 text-sm text-muted">Interfaces rápidas, accesibles y animadas, como este portafolio.</p>
              )}
            </Celda>
          </Reveal>
        ))}

        <Reveal delay={0.1}>
          <Celda titulo="Idiomas" Icono={Languages}>
            <p className="mt-auto text-muted">{idiomas}</p>
          </Celda>
        </Reveal>

        <Reveal className="md:col-span-4" delay={0.15}>
          <Celda titulo="Habilidades personales" Icono={Heart}>
            <div className="mt-auto flex flex-wrap gap-2">
              {habilidadesPersonales.map((h) => (
                <span key={h} className="rounded-full border border-line px-4 py-1.5 text-sm">
                  {h}
                </span>
              ))}
            </div>
          </Celda>
        </Reveal>
      </div>
    </Section>
  );
}
