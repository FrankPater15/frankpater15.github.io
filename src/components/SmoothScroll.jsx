import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";

// Scroll suave con inercia (Lenis). Los enlaces "#seccion" también se deslizan suave.
const LenisContext = createContext(null);
export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {

    const instancia = new Lenis({
      lerp: 0.12, // inercia suave pero ágil (antes se sentía "pesado")
      smoothWheel: true,
    });
    let frame;
    const raf = (time) => {
      instancia.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    setLenis(instancia);

    const alHacerClic = (e) => {
      const enlace = e.target.closest?.('a[href^="#"]');
      if (!enlace) return;
      const destino = enlace.getAttribute("href");
      const elemento = destino === "#inicio" || destino === "#" ? 0 : document.querySelector(destino);
      if (elemento === null) return;
      e.preventDefault();
      instancia.scrollTo(elemento, { offset: 0, duration: 1.6 });
      history.replaceState(null, "", destino);
    };
    document.addEventListener("click", alHacerClic);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", alHacerClic);
      instancia.destroy();
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
