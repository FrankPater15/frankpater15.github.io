import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Code2, Database, Server, Smartphone, Wrench } from "lucide-react";
import { habilidades, habilidadesPersonales, idiomas } from "../data/portfolio";
import { Card, Reveal, Section } from "./ui";

const iconos = {
  Backend: Server,
  Frontend: Code2,
  "Bases de datos": Database,
  Móvil: Smartphone,
  Automatización: Bot,
  Herramientas: Wrench,
};

export default function Skills() {
  const categorias = Object.keys(habilidades);
  const [activa, setActiva] = useState(categorias[0]);

  return (
    <Section id="habilidades" numero="02" titulo="Habilidades" alt>
      {/* Pestañas */}
      <Reveal className="mb-8 flex flex-wrap gap-2">
        {categorias.map((c) => {
          const Icono = iconos[c];
          const seleccionada = c === activa;
          return (
            <button
              key={c}
              onClick={() => setActiva(c)}
              className={`relative inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                seleccionada ? "text-[#062a26]" : "text-muted hover:text-accent"
              }`}
            >
              {seleccionada && (
                <motion.span layoutId="pestana" className="absolute inset-0 rounded-xl bg-accent" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
              )}
              <Icono className="relative size-4" />
              <span className="relative">{c}</span>
            </button>
          );
        })}
      </Reveal>

      <Reveal>
        <Card className="min-h-40 p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activa}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-wrap gap-3"
            >
              {habilidades[activa].map((h, i) => (
                <motion.span
                  key={h}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="rounded-xl border border-accent/30 bg-accent-soft px-5 py-3 font-mono text-base font-semibold text-accent"
                >
                  {h}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
        </Card>
      </Reveal>

      <div className="mt-8 grid gap-4 md:grid-cols-[2fr_1fr]">
        <Reveal>
          <Card className="h-full p-6">
            <h3 className="mb-4 font-title font-semibold">Habilidades personales</h3>
            <div className="flex flex-wrap gap-2">
              {habilidadesPersonales.map((h) => (
                <span key={h} className="rounded-full border border-line px-3 py-1 text-sm">
                  {h}
                </span>
              ))}
            </div>
          </Card>
        </Reveal>
        <Reveal delay={0.1}>
          <Card className="h-full p-6">
            <h3 className="mb-4 font-title font-semibold">Idiomas</h3>
            <p className="text-muted">{idiomas}</p>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
