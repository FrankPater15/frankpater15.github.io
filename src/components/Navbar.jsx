import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { perfil } from "../data/portfolio";
import { useLenis } from "./SmoothScroll";
import { EASE } from "./ui";

const enlaces = [
  { id: "sobre-mi", texto: "Sobre mí" },
  { id: "habilidades", texto: "Habilidades" },
  { id: "experiencia", texto: "Experiencia" },
  { id: "proyectos", texto: "Proyectos" },
  { id: "formacion", texto: "Formación" },
  { id: "certificados", texto: "Certificados" },
];

function useTema() {
  const [oscuro, setOscuro] = useState(() => document.documentElement.classList.contains("dark"));
  useEffect(() => {
    document.documentElement.classList.toggle("dark", oscuro);
    try {
      localStorage.setItem("tema", oscuro ? "oscuro" : "claro");
    } catch {}
  }, [oscuro]);
  return [oscuro, () => setOscuro((v) => !v)];
}

function useSeccionActiva() {
  const [activa, setActiva] = useState("");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entradas) => entradas.forEach((e) => e.isIntersecting && setActiva(e.target.id)),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    document.querySelectorAll("main section[id]").forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);
  return activa;
}

export default function Navbar({ listo }) {
  const [abierto, setAbierto] = useState(false);
  const [oculto, setOculto] = useState(false);
  const [oscuro, cambiarTema] = useTema();
  const activa = useSeccionActiva();
  const lenis = useLenis();
  const { scrollY, scrollYProgress } = useScroll();
  const progreso = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  // Se esconde al bajar y aparece al subir
  useMotionValueEvent(scrollY, "change", (v) => {
    const anterior = scrollY.getPrevious() ?? 0;
    setOculto(v > anterior && v > 250);
  });

  // Congela el scroll con el menú abierto
  useEffect(() => {
    if (!lenis) return;
    abierto ? lenis.stop() : lenis.start();
  }, [abierto, lenis]);

  return (
    <>
      <motion.div style={{ scaleX: progreso }} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-accent to-accent-2" />

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={listo ? { y: oculto && !abierto ? -110 : 0, opacity: 1 } : undefined}
        transition={{ duration: 0.6, ease: EASE }}
        className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      >
        <nav className="pointer-events-auto flex items-center gap-1 rounded-full border border-line bg-card p-1.5 pl-5 shadow-2xl shadow-black/20 backdrop-blur-2xl">
          <a href="#inicio" className="mr-3 font-mono text-sm font-semibold text-accent">
            &lt;FP /&gt;
          </a>

          <div className="hidden items-center md:flex">
            {enlaces.map((e) => (
              <a
                key={e.id}
                href={`#${e.id}`}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${activa === e.id ? "text-ink" : "text-muted hover:text-ink"}`}
              >
                {activa === e.id && (
                  <motion.span layoutId="nav-activo" className="absolute inset-0 -z-10 rounded-full bg-accent-soft" transition={{ type: "spring", bounce: 0.25, duration: 0.6 }} />
                )}
                {e.texto}
              </a>
            ))}
          </div>

          <button
            onClick={cambiarTema}
            className="grid size-9 place-items-center rounded-full text-muted transition hover:bg-accent-soft hover:text-accent"
            aria-label={oscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={oscuro ? "sol" : "luna"} initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: 90, scale: 0 }} transition={{ duration: 0.25 }}>
                {oscuro ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </motion.span>
            </AnimatePresence>
          </button>

          <a href="#contacto" className="hidden rounded-full bg-accent px-5 py-2 text-sm font-semibold text-bg transition hover:brightness-110 md:inline-block">
            Hablemos
          </a>

          <button
            onClick={() => setAbierto(!abierto)}
            className="grid size-9 place-items-center rounded-full bg-accent text-bg md:hidden"
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={abierto}
          >
            {abierto ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </nav>
      </motion.header>

      {/* Menú de pantalla completa en celular */}
      <AnimatePresence>
        {abierto && (
          <motion.div
            initial={{ clipPath: "circle(0% at 90% 40px)" }}
            animate={{ clipPath: "circle(150% at 90% 40px)" }}
            exit={{ clipPath: "circle(0% at 90% 40px)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-bg px-6 pt-28 pb-10 md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {[...enlaces, { id: "contacto", texto: "Contacto" }].map((e, i) => (
                <div key={e.id} className="overflow-hidden">
                  <motion.a
                    href={`#${e.id}`}
                    onClick={() => setAbierto(false)}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.06, ease: EASE }}
                    className={`flex items-baseline gap-4 font-title text-4xl font-bold ${activa === e.id ? "text-accent" : ""}`}
                  >
                    <span className="font-mono text-sm text-muted">0{i + 1}</span>
                    {e.texto}
                  </motion.a>
                </div>
              ))}
            </nav>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-sm text-muted">
              <p>{perfil.correo}</p>
              <p>{perfil.ciudad}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
