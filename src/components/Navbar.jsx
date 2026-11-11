import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";

const enlaces = [
  { id: "sobre-mi", texto: "Sobre mí" },
  { id: "habilidades", texto: "Habilidades" },
  { id: "experiencia", texto: "Experiencia" },
  { id: "proyectos", texto: "Proyectos" },
  { id: "formacion", texto: "Formación" },
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
      { rootMargin: "-50% 0px -50% 0px" }
    );
    document.querySelectorAll("main section[id]").forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);
  return activa;
}

export default function Navbar() {
  const [abierto, setAbierto] = useState(false);
  const [conFondo, setConFondo] = useState(false);
  const [oscuro, cambiarTema] = useTema();
  const activa = useSeccionActiva();
  const { scrollYProgress } = useScroll();
  const progreso = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  useEffect(() => {
    const onScroll = () => setConFondo(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        conFondo || abierto ? "border-b border-line bg-bg/80 backdrop-blur-xl" : ""
      }`}
    >
      {/* Barra de progreso de lectura */}
      <motion.div style={{ scaleX: progreso }} className="absolute inset-x-0 top-0 h-0.5 origin-left bg-accent" />

      <div className="mx-auto flex h-[70px] w-[min(1100px,100%-32px)] items-center justify-between">
        <a href="#inicio" className="font-mono text-lg font-semibold text-accent">
          &lt;FO /&gt;
        </a>

        <nav className="hidden items-center gap-7 text-sm md:flex">
          {enlaces.map((e) => (
            <a
              key={e.id}
              href={`#${e.id}`}
              className={`relative transition-colors hover:text-accent ${activa === e.id ? "text-accent" : "text-muted"}`}
            >
              {e.texto}
              {activa === e.id && (
                <motion.span layoutId="subrayado" className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded bg-accent" />
              )}
            </a>
          ))}
          <BotonTema oscuro={oscuro} onClick={cambiarTema} />
          <a
            href="#contacto"
            className="rounded-lg border border-accent px-4 py-1.5 font-medium text-accent transition hover:bg-accent-soft"
          >
            Contacto
          </a>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <BotonTema oscuro={oscuro} onClick={cambiarTema} />
          <button
            onClick={() => setAbierto(!abierto)}
            className="rounded-lg p-2 text-accent"
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={abierto}
          >
            {abierto ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {abierto && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 pb-6">
              {[...enlaces, { id: "contacto", texto: "Contacto" }].map((e) => (
                <a
                  key={e.id}
                  href={`#${e.id}`}
                  onClick={() => setAbierto(false)}
                  className={`rounded-lg px-3 py-3 ${activa === e.id ? "bg-accent-soft text-accent" : "text-muted"}`}
                >
                  {e.texto}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function BotonTema({ oscuro, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg border border-line p-2 text-muted transition hover:border-accent hover:text-accent"
      aria-label={oscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={oscuro ? "luna" : "sol"}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="block"
        >
          {oscuro ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
