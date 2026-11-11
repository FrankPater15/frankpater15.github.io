import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Lock, Sparkles } from "lucide-react";
import { proyectos } from "../data/portfolio";
import { Card, GithubIcon, Section } from "./ui";

const filtros = ["Todos", "Laboral", "Académico", "Personal"];

export default function Projects() {
  const [filtro, setFiltro] = useState("Todos");
  const lista = filtro === "Todos" ? proyectos : proyectos.filter((p) => p.categoria === filtro);

  return (
    <Section id="proyectos" numero="04" titulo="Proyectos" alt>
      <div className="mb-8 flex flex-wrap gap-2">
        {filtros.map((f) => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              filtro === f ? "border-accent bg-accent text-[#062a26]" : "border-line text-muted hover:border-accent hover:text-accent"
            }`}
          >
            {f}
            <span className="ml-1.5 opacity-60">
              {f === "Todos" ? proyectos.length : proyectos.filter((p) => p.categoria === f).length}
            </span>
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {lista.map((p) => (
            <motion.div
              key={p.nombre}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -6 }}
              className={p.destacado ? "md:col-span-2 lg:col-span-1" : ""}
            >
              <Card className="flex h-full flex-col p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-xs text-accent">{p.categoria}</span>
                  <div className="flex items-center gap-2 text-muted">
                    {p.destacado && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-xs text-accent">
                        <Sparkles className="size-3" /> Destacado
                      </span>
                    )}
                    {p.repo && (
                      <a href={p.repo} target="_blank" rel="noopener" aria-label={`Repositorio de ${p.nombre}`} className="transition hover:text-accent">
                        <GithubIcon />
                      </a>
                    )}
                  </div>
                </div>
                <h3 className="mb-2 font-title text-lg font-bold">{p.nombre}</h3>
                <p className="flex-1 text-sm leading-relaxed text-muted">{p.descripcion}</p>
                <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted">
                  {p.stack.map((s) => (
                    <span key={s}>#{s}</span>
                  ))}
                </div>
                <div className="mt-4 border-t border-line pt-4 text-sm">
                  {p.privado ? (
                    <span className="inline-flex items-center gap-1.5 text-muted italic">
                      <Lock className="size-3.5" /> Código privado de la empresa
                    </span>
                  ) : (
                    <a href={p.repo} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 font-semibold text-accent hover:underline">
                      Ver repositorio <ExternalLink className="size-3.5" />
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
