import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowUp, ArrowUpRight, Check, Copy, Download, MapPin } from "lucide-react";
import { perfil } from "../data/portfolio";
import { useLenis } from "./SmoothScroll";
import { GithubIcon, Magnetic, publico, Reveal, SplitText } from "./ui";

const horaMedellin = () =>
  new Intl.DateTimeFormat("es-CO", { hour: "2-digit", minute: "2-digit", timeZone: "America/Bogota" }).format(new Date());

function Reloj() {
  const [hora, setHora] = useState(horaMedellin);
  useEffect(() => {
    const id = setInterval(() => setHora(horaMedellin()), 15000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{hora}</span>;
}

export default function Contact() {
  const [copiado, setCopiado] = useState(false);
  const lenis = useLenis();
  const pie = useRef(null);
  const { scrollYProgress } = useScroll({ target: pie, offset: ["start end", "end end"] });
  const yNombre = useTransform(scrollYProgress, [0, 1], ["60%", "0%"]);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(perfil.correo);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      window.location.href = `mailto:${perfil.correo}`;
    }
  };

  const subir = () => (lenis ? lenis.scrollTo(0, { duration: 2 }) : window.scrollTo({ top: 0 }));

  return (
    <section id="contacto" className="relative overflow-hidden pt-32 md:pt-48">
      <div className="container-x">
        <Reveal y={20}>
          <p className="flex items-center gap-3 font-mono text-sm text-accent">
            <span>06</span>
            <span className="h-px w-10 bg-accent" />
            <span className="tracking-[0.2em] uppercase">Contacto</span>
          </p>
        </Reveal>

        <div className="mt-6 grid items-end gap-12 md:grid-cols-[1.6fr_1fr]">
          <div>
            <SplitText as="h2" text="¿Construimos algo juntos?" className="block font-title text-5xl leading-[0.95] font-extrabold tracking-tighter md:text-8xl" />
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-lg text-lg text-muted">
                Estoy buscando mi primera oportunidad como desarrollador. Si tienes una vacante o un proyecto, escríbeme y te respondo pronto.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.3} className="flex justify-start md:justify-end">
            <Magnetic fuerza={0.45}>
              <a
                href={`mailto:${perfil.correo}`}
                className="group relative grid size-44 place-items-center overflow-hidden rounded-full border border-accent bg-accent font-title text-lg font-bold text-bg shadow-[0_20px_80px_-20px_var(--accent)] md:size-56 md:text-xl"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-bg transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
                <span className="relative flex items-center gap-2 transition-colors duration-500 group-hover:text-ink">
                  Escríbeme <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:rotate-45" />
                </span>
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-16 flex flex-wrap gap-3 border-t border-line pt-10">
            <button onClick={copiar} className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-5 py-3 font-mono text-sm backdrop-blur transition hover:border-accent hover:text-accent">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={copiado ? "ok" : "copiar"} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  {copiado ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
                </motion.span>
              </AnimatePresence>
              {copiado ? "¡Correo copiado!" : perfil.correo}
            </button>
            <a href={perfil.github} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-5 py-3 text-sm backdrop-blur transition hover:border-accent hover:text-accent">
              <GithubIcon className="size-4" /> GitHub
            </a>
            <a href={publico(perfil.cv)} download="Hoja_de_Vida_Frank_Orono.pdf" className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-5 py-3 text-sm backdrop-blur transition hover:border-accent hover:text-accent">
              <Download className="size-4" /> Hoja de vida
            </a>
          </div>
        </Reveal>
      </div>

      {/* Footer */}
      <footer ref={pie} className="relative mt-24">
        <div className="container-x flex flex-wrap items-center justify-between gap-4 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" /> Medellín, <Reloj /> (hora local)
          </span>
          <span>© {new Date().getFullYear()} · Hecho con React, Lenis y Framer Motion</span>
          <Magnetic>
            <button onClick={subir} className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 transition hover:border-accent hover:text-accent">
              Volver arriba <ArrowUp className="size-4" />
            </button>
          </Magnetic>
        </div>
        <div className="overflow-hidden">
          <motion.p
            style={{ y: yNombre }}
            aria-hidden
            className="mt-6 bg-gradient-to-b from-ink/25 to-transparent bg-clip-text text-center font-title text-[13.5vw] leading-[0.8] font-extrabold tracking-tighter whitespace-nowrap text-transparent select-none"
          >
            FRANK ORONO
          </motion.p>
        </div>
      </footer>
    </section>
  );
}
