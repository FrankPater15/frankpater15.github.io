import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, MapPin } from "lucide-react";
import { perfil } from "../data/portfolio";
import { GithubIcon, publico } from "./ui";

// Efecto de máquina de escribir
function useTypewriter(frases) {
  const [texto, setTexto] = useState("");
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTexto(frases[0]);
      return;
    }
    let i = 0, j = 0, borrando = false, timer;
    const paso = () => {
      const actual = frases[i];
      setTexto(actual.slice(0, j));
      if (!borrando && j < actual.length) { j++; timer = setTimeout(paso, 65); }
      else if (!borrando) { borrando = true; timer = setTimeout(paso, 1800); }
      else if (j > 0) { j--; timer = setTimeout(paso, 30); }
      else { borrando = false; i = (i + 1) % frases.length; timer = setTimeout(paso, 300); }
    };
    paso();
    return () => clearTimeout(timer);
  }, [frases]);
  return texto;
}

const tecnologias = ["C#", "React", ".NET", "Node.js", "SQL", "RPA"];

const aparecer = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

export default function Hero() {
  const rol = useTypewriter(perfil.roles);
  const [sinFoto, setSinFoto] = useState(false);

  return (
    <section id="inicio" className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16">
      {/* Fondo animado */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <motion.div
        className="pointer-events-none absolute -top-32 right-[-10%] size-[500px] rounded-full bg-accent/20 blur-[120px]"
        animate={{ x: [0, -60, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-[-20%] left-[-10%] size-[420px] rounded-full bg-violet-500/15 blur-[120px]"
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid w-[min(1100px,100%-32px)] items-center gap-12 md:grid-cols-[1.3fr_1fr]">
        <div>
          <motion.p {...aparecer(0)} className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-card/60 px-3 py-1 text-sm text-muted backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Disponible para trabajar
          </motion.p>

          <motion.h1 {...aparecer(0.1)} className="font-title text-4xl leading-tight font-extrabold md:text-6xl">
            Hola, soy {perfil.nombre.split(" ")[0]} <span className="inline-block origin-[70%_70%] animate-[wave_2.5s_ease-in-out_infinite]">👋</span>
            <br />
            <span className="bg-gradient-to-r from-accent to-violet-400 bg-clip-text text-transparent">
              {perfil.nombre} {perfil.apellido}
            </span>
          </motion.h1>

          <motion.p {...aparecer(0.2)} className="mt-5 h-8 font-mono text-lg text-accent md:text-xl">
            &gt; {rol}
            <span className="ml-0.5 animate-pulse">▍</span>
          </motion.p>

          <motion.p {...aparecer(0.3)} className="mt-4 max-w-xl text-lg text-muted">
            {perfil.titulo} (SENA). {perfil.descripcion}
          </motion.p>

          <motion.div {...aparecer(0.4)} className="mt-8 flex flex-wrap gap-3">
            <a href="#proyectos" className="group inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-[#062a26] shadow-lg shadow-accent/25 transition hover:-translate-y-0.5">
              Ver proyectos <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </a>
            <a href={publico(perfil.cv)} download="Hoja_de_Vida_Frank_Orono.pdf" className="inline-flex items-center gap-2 rounded-xl border border-accent px-6 py-3 font-semibold text-accent transition hover:-translate-y-0.5 hover:bg-accent-soft">
              <Download className="size-4" /> Descargar CV
            </a>
          </motion.div>

          <motion.div {...aparecer(0.5)} className="mt-8 flex items-center gap-4 text-muted">
            <a href={perfil.github} target="_blank" rel="noopener" aria-label="GitHub" className="rounded-lg border border-line p-2.5 transition hover:-translate-y-0.5 hover:border-accent hover:text-accent">
              <GithubIcon />
            </a>
            <a href={`mailto:${perfil.correo}`} aria-label="Correo" className="rounded-lg border border-line p-2.5 transition hover:-translate-y-0.5 hover:border-accent hover:text-accent">
              <Mail className="size-5" />
            </a>
            <span className="inline-flex items-center gap-1.5 text-sm">
              <MapPin className="size-4" /> {perfil.ciudad}
            </span>
          </motion.div>
        </div>

        {/* Foto con anillo giratorio y tecnologías orbitando */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative order-first mx-auto size-60 md:order-none md:size-80"
        >
          <div className="absolute inset-0 animate-[spin_8s_linear_infinite] rounded-full bg-[conic-gradient(var(--accent),transparent_40%,#a78bfa,transparent_80%,var(--accent))] p-1" />
          <div className="absolute inset-1.5 overflow-hidden rounded-full border-4 border-bg bg-card">
            {sinFoto ? (
              <div className="grid size-full place-items-center font-title text-6xl font-extrabold text-accent md:text-7xl">FO</div>
            ) : (
              <img src={publico(perfil.foto)} alt={`Foto de ${perfil.nombre}`} onError={() => setSinFoto(true)} className="size-full object-cover" />
            )}
          </div>
          {tecnologias.map((t, i) => {
            const angulo = (i / tecnologias.length) * 2 * Math.PI;
            return (
              <motion.span
                key={t}
                className="absolute rounded-lg border border-line bg-card/90 px-2.5 py-1 font-mono text-xs font-semibold text-accent shadow-lg backdrop-blur"
                style={{ left: `${50 + 54 * Math.cos(angulo)}%`, top: `${50 + 54 * Math.sin(angulo)}%`, translate: "-50% -50%" }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
              >
                {t}
              </motion.span>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
