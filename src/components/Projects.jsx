import { ArrowUpRight, Bot, Code2, Lock, Monitor, ScanText, Sparkles } from "lucide-react";
import { proyectos } from "../data/portfolio";
import { AnimacionOCR, AnimacionRPA } from "./ProjectAnimations";
import { GithubIcon, publico, Reveal, Section, TiltCard } from "./ui";

const iconos = { Monitor, Bot, ScanText, Sparkles, Code2 };
// Portadas animadas para proyectos sin captura (campo "animacion" en portfolio.js)
const animaciones = { rpa: AnimacionRPA, ocr: AnimacionOCR };

// Portada en blanco y negro: cuadrícula + mini "ventana" de aplicación
function Portada({ p, i, className = "" }) {
  const Icono = iconos[p.icono] || Code2;
  const Animacion = animaciones[p.animacion];

  // Si el proyecto tiene captura, se muestra la imagen
  if (p.imagen) {
    return (
      <div className={`relative overflow-hidden bg-accent-soft ${className}`}>
        <img
          src={publico(p.imagen)}
          alt={`Captura de ${p.nombre}`}
          loading="lazy"
          className="absolute inset-0 size-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/50 to-transparent" />
        <span className="absolute top-5 left-6 font-mono text-sm text-white/80">0{i + 1}</span>
        <span className="absolute top-5 right-6 rounded-full border border-white/20 bg-black/50 px-3 py-1 font-mono text-xs text-white backdrop-blur">{p.categoria}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-accent-soft ${className}`}>
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse at 30% 20%, black, transparent 75%)",
        }}
      />
      <span className="absolute top-5 left-6 font-mono text-sm text-muted">0{i + 1}</span>
      <span className="absolute top-5 right-6 z-10 rounded-full border border-line bg-bg/60 px-3 py-1 font-mono text-xs backdrop-blur">{p.categoria}</span>
      {Animacion ? (
        <Animacion />
      ) : (
      <div className="absolute right-8 -bottom-1 left-12 rounded-t-2xl border border-line bg-solid p-4 shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-3">
        <div className="mb-3 flex gap-1.5">
          <span className="size-2 rounded-full bg-muted/60" />
          <span className="size-2 rounded-full bg-muted/40" />
          <span className="size-2 rounded-full bg-muted/25" />
        </div>
        <div className="flex items-center gap-4">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-accent text-bg">
            <Icono className="size-7" />
          </span>
          <div className="w-full space-y-2">
            <div className="h-2 w-3/4 rounded-full bg-accent/60" />
            <div className="h-2 w-1/2 rounded-full bg-line" />
            <div className="h-2 w-2/3 rounded-full bg-line" />
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

function Tarjeta({ p, i, destacada = false }) {
  return (
    <TiltCard
      intensidad={destacada ? 3 : 6}
      data-cursor={p.repo ? "Ver" : undefined}
      className={`group flex h-full overflow-hidden ${destacada ? "flex-col md:flex-row" : "flex-col"}`}
    >
      <Portada p={p} i={i} className={destacada ? "h-56 border-b border-line md:h-auto md:w-1/2 md:border-r md:border-b-0" : "h-56 border-b border-line"} />

      <div className={`flex flex-1 flex-col p-7 ${destacada ? "md:p-10" : ""}`}>
        <div className="flex items-start justify-between gap-4">
          <h3 className={`font-title font-bold ${destacada ? "text-3xl md:text-4xl" : "text-2xl"}`}>{p.nombre}</h3>
          {p.repo && (
            <a
              href={p.repo}
              target="_blank"
              rel="noopener"
              aria-label={`Repositorio de ${p.nombre}`}
              className="grid size-10 shrink-0 place-items-center rounded-full border border-line transition duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-bg"
            >
              <ArrowUpRight className="size-4" />
            </a>
          )}
        </div>
        <p className={`mt-3 flex-1 leading-relaxed text-muted ${destacada ? "md:text-lg" : ""}`}>{p.descripcion}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span key={s} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
              {s}
            </span>
          ))}
        </div>
        <div className="mt-5 text-sm">
          {p.privado ? (
            <span className="inline-flex items-center gap-1.5 text-muted italic">
              <Lock className="size-3.5" /> Código privado de la empresa
            </span>
          ) : (
            <a href={p.repo} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline">
              <GithubIcon className="size-4" /> Ver en GitHub
            </a>
          )}
        </div>
      </div>
    </TiltCard>
  );
}

// Cuadrícula normal: el proyecto destacado ocupa todo el ancho
export default function Projects() {
  return (
    <Section id="proyectos" numero="04" kicker="Proyectos" titulo="Cosas que he construido.">
      <div className="grid gap-6 md:grid-cols-2">
        {proyectos.map((p, i) => (
          <Reveal key={p.nombre} delay={p.destacado ? 0 : (i % 2) * 0.1} className={p.destacado ? "md:col-span-2" : ""}>
            <Tarjeta p={p} i={i} destacada={!!p.destacado} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
