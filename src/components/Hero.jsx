import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { perfil } from "../data/portfolio";
import Particles from "./Particles";
import { EASE, GithubIcon, Magnetic, publico, SplitChars } from "./ui";

// Efecto "scramble": las letras se revuelven antes de formar la palabra
function Scramble({ frases, play }) {
  const [texto, setTexto] = useState("");
  useEffect(() => {
    if (!play) return;
    const simbolos = "!<>-_\\/[]{}=+*^?#01";
    let i = 0, frame, espera, cancelado = false;
    const correr = () => {
      const objetivo = frases[i % frases.length];
      let f = 0;
      const paso = () => {
        if (cancelado) return;
        const listos = Math.floor(f / 1.6);
        const resto = Array.from({ length: Math.max(0, objetivo.length - listos) }, () => simbolos[Math.floor(Math.random() * simbolos.length)]).join("");
        setTexto(objetivo.slice(0, listos) + resto);
        f++;
        if (listos < objetivo.length) frame = requestAnimationFrame(paso);
        else {
          i++;
          espera = setTimeout(correr, 2600);
        }
      };
      paso();
    };
    correr();
    return () => {
      cancelado = true;
      cancelAnimationFrame(frame);
      clearTimeout(espera);
    };
  }, [play, frases]);
  return <span>{texto}</span>;
}

const tecnologias = ["C#", "React", ".NET", "Node.js", "SQL", "RPA"];

export default function Hero({ listo }) {
  const ref = useRef(null);
  const [sinFoto, setSinFoto] = useState(false);

  // Parallax: al bajar, el nombre se abre hacia los lados y la foto se aleja
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 260]);
  const escalaFoto = useTransform(scrollYProgress, [0, 1], [1, 0.75]);
  const yFoto = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacidad = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const desenfoque = useTransform(scrollYProgress, [0, 0.75], ["blur(0px)", "blur(10px)"]);

  const aparecer = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: listo ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section id="inicio" ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20">
      <Particles className="absolute inset-0 size-full opacity-70" />

      <motion.div style={{ opacity: opacidad, filter: desenfoque }} className="container-x relative grid items-center gap-12 md:grid-cols-[1.35fr_1fr]">
        <div>
          <motion.div {...aparecer(0.3)} className="mb-6 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              Disponible para trabajar
            </span>
            <span className="inline-flex items-center gap-1.5 text-muted">
              <MapPin className="size-3.5" /> {perfil.ciudad}
            </span>
          </motion.div>

          <motion.p {...aparecer(0.4)} className="mb-2 font-mono text-sm text-muted md:text-base">
            {perfil.nombre} {perfil.apellido}
          </motion.p>

          <h1 className="font-title text-[15.5vw] md:text-[7.8vw] xl:text-[6.4rem] leading-[0.88] font-extrabold tracking-tighter">
            <motion.span style={{ x: x1 }} className="block">
              <SplitChars text="FRANK" play={listo} delay={0.15} />
            </motion.span>
            <motion.span style={{ x: x2 }} className="block text-outline">
              <SplitChars text="PATERNINA" play={listo} delay={0.3} />
            </motion.span>
          </h1>

          <motion.p {...aparecer(0.6)} className="mt-6 h-7 font-mono text-base text-accent md:text-xl">
            &gt; <Scramble frases={perfil.roles} play={listo} />
            <span className="ml-0.5 animate-pulse">▍</span>
          </motion.p>

          <motion.p {...aparecer(0.7)} className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            {perfil.titulo} (SENA). {perfil.descripcion}
          </motion.p>

          <motion.div {...aparecer(0.8)} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href="#proyectos" className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-bg shadow-[0_10px_40px_-10px_var(--accent)] transition hover:brightness-110">
                Ver proyectos <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={publico(perfil.cv)} download="Hoja_de_Vida_Frank_Orono.pdf" className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-7 py-3.5 font-semibold backdrop-blur transition hover:border-accent hover:text-accent">
                <Download className="size-4" /> Descargar CV
              </a>
            </Magnetic>
            <Magnetic fuerza={0.5}>
              <a href={perfil.github} target="_blank" rel="noopener" aria-label="GitHub" className="grid size-12 place-items-center rounded-full border border-line bg-card backdrop-blur transition hover:border-accent hover:text-accent">
                <GithubIcon />
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Foto con anillo giratorio y tecnologías flotando */}
        <motion.div style={{ scale: escalaFoto, y: yFoto }} className="relative order-first mx-auto md:order-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
            animate={listo ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
            transition={{ duration: 1.3, delay: 0.2, ease: EASE }}
            className="relative size-56 md:size-80"
          >
            <div className="absolute -inset-6 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute inset-0 animate-[spin_10s_linear_infinite] rounded-full bg-[conic-gradient(var(--accent),transparent_35%,var(--accent-2),transparent_75%,var(--accent))] p-1" />
            <div className="absolute inset-1.5 overflow-hidden rounded-full border-4 border-bg bg-card">
              {sinFoto ? (
                <div className="grid size-full place-items-center font-title text-6xl font-extrabold text-accent">FP</div>
              ) : (
                <img src={publico(perfil.foto)} alt={`Foto de ${perfil.nombre}`} onError={() => setSinFoto(true)} className="size-full scale-105 object-cover" />
              )}
            </div>
            {tecnologias.map((t, i) => {
              const angulo = (i / tecnologias.length) * 2 * Math.PI - Math.PI / 2;
              return (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={listo ? { opacity: 1, scale: 1, y: [0, -8, 0] } : undefined}
                  transition={{
                    opacity: { delay: 0.9 + i * 0.08 },
                    scale: { delay: 0.9 + i * 0.08, type: "spring" },
                    y: { duration: 3, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" },
                  }}
                  className="absolute rounded-full border border-line bg-card px-3 py-1 font-mono text-xs font-semibold text-accent shadow-lg backdrop-blur-xl"
                  style={{ left: `${50 + 56 * Math.cos(angulo)}%`, top: `${50 + 56 * Math.sin(angulo)}%`, translate: "-50% -50%" }}
                >
                  {t}
                </motion.span>
              );
            })}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.a
        href="#sobre-mi"
        initial={{ opacity: 0 }}
        animate={listo ? { opacity: 1 } : undefined}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs tracking-[0.3em] text-muted uppercase md:flex"
      >
        Desliza
        <span className="relative h-12 w-px overflow-hidden bg-line">
          <motion.span className="absolute inset-x-0 top-0 h-1/2 bg-accent" animate={{ y: ["-100%", "200%"] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} />
        </span>
      </motion.a>
    </section>
  );
}
