import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Pantalla de carga: contador 0 → 100 y una cortina que se levanta
export default function Preloader({ alTerminar }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    // Contador propio con requestAnimationFrame (exacto y cancelable)
    const DURACION = 1800;
    const suavizar = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    let inicio = null;
    let frame;
    let espera;
    const paso = (ahora) => {
      if (inicio === null) inicio = ahora;
      const t = Math.min(1, (ahora - inicio) / DURACION);
      setN(Math.round(suavizar(t) * 100));
      if (t < 1) frame = requestAnimationFrame(paso);
      else espera = setTimeout(alTerminar, 300);
    };
    frame = requestAnimationFrame(paso);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(espera);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[1000] flex flex-col justify-between bg-bg p-6 md:p-10"
    >
      <div className="flex justify-between font-mono text-sm text-muted">
        <span className="text-accent">&lt;FP /&gt;</span>
        <span>Portafolio · {new Date().getFullYear()}</span>
      </div>

      <div className="overflow-hidden">
        <motion.p
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-title text-2xl font-semibold md:text-4xl"
        >
          Frank Javier Orono Paternina
        </motion.p>
        <motion.p
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-muted md:text-lg"
        >
          Desarrollador Full Stack Junior
        </motion.p>
      </div>

      <div>
        <div className="flex items-end justify-between">
          <span className="font-mono text-sm text-muted">Cargando experiencia</span>
          <span className="font-title text-7xl leading-none font-extrabold tabular-nums md:text-[10rem]">
            {n}
            <span className="text-accent">%</span>
          </span>
        </div>
        <div className="mt-4 h-px w-full bg-line">
          <div className="h-px bg-accent" style={{ width: `${n}%` }} />
        </div>
      </div>
    </motion.div>
  );
}
