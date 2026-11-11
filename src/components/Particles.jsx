import { useEffect, useRef } from "react";

// Constelación de partículas que se apartan del mouse.
// Se pausa cuando no está en pantalla para no gastar batería.
export default function Particles({ className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const quieto = false; // las animaciones siempre están activas
    const leerColor = () => getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#2dd4bf";
    let color = leerColor();
    let w = 0, h = 0, puntos = [], frame = 0, visible = true;
    const mouse = { x: -9999, y: -9999 };

    // En celular: menos partículas y resolución normal (no 3x), que es lo que más pesa
    const tactil = window.matchMedia("(pointer: coarse)").matches;

    const medir = () => {
      const dpr = tactil ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(tactil ? 25 : 60, Math.floor((w * h) / 20000));
      puntos = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }));
    };

    const dibujar = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      for (const p of puntos) {
        if (!quieto) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
          const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
          if (d < 140 && d > 0) {
            p.x += (dx / d) * 1.6;
            p.y += (dy / d) * 1.6;
          }
        }
      }
      for (let i = 0; i < puntos.length; i++) {
        const a = puntos[i];
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(a.x, a.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
        for (let j = i + 1; j < puntos.length; j++) {
          const b = puntos[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.globalAlpha = (1 - d / 120) * 0.22;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      if (!quieto && visible) frame = requestAnimationFrame(dibujar);
    };

    const alMover = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const alRedimensionar = () => {
      medir();
      if (quieto) dibujar();
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible && !quieto) frame = requestAnimationFrame(dibujar);
    });
    // Cambia de color al cambiar el tema
    const mo = new MutationObserver(() => {
      color = leerColor();
      if (quieto) dibujar();
    });

    medir();
    dibujar();
    io.observe(canvas);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("mousemove", alMover);
    window.addEventListener("resize", alRedimensionar);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("mousemove", alMover);
      window.removeEventListener("resize", alRedimensionar);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none ${className}`} />;
}
