import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Cursor personalizado: un punto y un anillo que lo sigue con retraso.
// Crece sobre enlaces/botones y muestra texto con data-cursor="Ver".
export default function Cursor() {
  const [activo, setActivo] = useState(false);
  const [sobre, setSobre] = useState(false);
  const [texto, setTexto] = useState("");
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const anilloX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const anilloY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });

  useEffect(() => {
    const conMouse = window.matchMedia("(pointer: fine)").matches;
    if (!conMouse) return;

    setActivo(true);
    document.documentElement.classList.add("custom-cursor");
    const mover = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const objetivo = e.target.closest?.("a, button, [data-cursor]");
      setSobre(!!objetivo);
      setTexto(objetivo?.dataset?.cursor || "");
    };
    const salir = () => setVisible(false);
    window.addEventListener("mousemove", mover);
    document.addEventListener("mouseleave", salir);
    return () => {
      window.removeEventListener("mousemove", mover);
      document.removeEventListener("mouseleave", salir);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [x, y]);

  if (!activo) return null;

  return (
    <>
      <motion.div
        style={{ x, y, opacity: visible ? 1 : 0 }}
        animate={{ scale: sobre ? 0 : 1 }}
        className="pointer-events-none fixed top-0 left-0 z-[999] -mt-1 -ml-1 size-2 rounded-full bg-accent"
      />
      <motion.div
        style={{ x: anilloX, y: anilloY, opacity: visible ? 1 : 0 }}
        animate={{
          width: texto ? 88 : sobre ? 56 : 36,
          height: texto ? 88 : sobre ? 56 : 36,
          backgroundColor: texto ? "var(--accent)" : sobre ? "var(--accent-soft)" : "rgba(0,0,0,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="pointer-events-none fixed top-0 left-0 z-[998] grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-accent"
      >
        {texto && <span className="text-xs font-semibold text-bg">{texto}</span>}
      </motion.div>
    </>
  );
}
