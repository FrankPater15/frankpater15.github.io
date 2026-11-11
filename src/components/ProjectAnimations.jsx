import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Check, MousePointer2 } from "lucide-react";

// ------------------------------------------------------------
//  Animaciones en bucle para las portadas de proyectos sin captura.
//  Usan los colores del tema (bg-accent, bg-line...), así que se ven
//  bien en modo claro y oscuro. Solo se animan cuando están en pantalla
//  y respetan "reducir movimiento" del sistema (muestran el estado final).
// ------------------------------------------------------------

// Devuelve las props de animación de un elemento en bucle.
// values/times: fotogramas clave (times va de 0 a 1 dentro del ciclo).
function useBucle(duracion) {
  const ref = useRef(null);
  const visible = useInView(ref, { amount: 0.3 });
  const reducir = useReducedMotion();

  const anim = (props, times, ease = "easeInOut") => {
    if (reducir) {
      // Estado "terminado": el fotograma más cercano al 90 % del ciclo
      const i = Math.max(0, times.findLastIndex((t) => t <= 0.9));
      return { initial: false, animate: Object.fromEntries(Object.entries(props).map(([k, v]) => [k, v[i]])) };
    }
    const inicial = Object.fromEntries(Object.entries(props).map(([k, v]) => [k, v[0]]));
    return {
      initial: inicial,
      animate: visible ? props : inicial,
      transition: { duration: duracion, times, ease, repeat: Infinity },
    };
  };
  return { ref, anim };
}

// Ventana tipo app (igual a la de las demás portadas)
function Ventana({ titulo, children, refContenido }) {
  return (
    <div className="absolute top-14 right-8 -bottom-1 left-12 flex flex-col rounded-t-2xl border border-line bg-solid p-4 shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-3">
      <div className="mb-3 flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-muted/60" />
        <span className="size-2 rounded-full bg-muted/40" />
        <span className="size-2 rounded-full bg-muted/25" />
        <span className="ml-2 font-mono text-[10px] text-muted">{titulo}</span>
      </div>
      <div ref={refContenido} className="relative flex-1">
        {children}
      </div>
    </div>
  );
}

// ============================================================
//  1. Robot RPA: el cursor llena un formulario, marca el captcha
//     y hace clic en "Radicar".
// ============================================================
const DUR_RPA = 7;
// Momentos (0–1) en que el cursor hace clic en cada elemento
const CLICS = [0.1, 0.27, 0.44, 0.6, 0.73];

export function AnimacionRPA() {
  const { ref, anim } = useBucle(DUR_RPA);

  // Recorrido del cursor: [izquierda %, arriba %] en cada clic
  const puntos = [
    [88, 92], // inicio, fuera del formulario
    [30, 14], // campo 1
    [30, 46], // campo 2
    [30, 78], // campo 3
    [62, 22], // captcha
    [80, 62], // botón
    [88, 92], // vuelve
  ];
  const tiemposCursor = [0, ...CLICS, 0.92];

  // Pequeño "golpe" del cursor en cada clic
  const clicTimes = [0, ...CLICS.flatMap((t) => [t - 0.015, t, t + 0.02]), 1];
  const clicScale = [1, ...CLICS.flatMap(() => [1, 0.8, 1]), 1];
  const ondaOpacidad = [0, ...CLICS.flatMap(() => [0, 0.7, 0]), 0];
  const ondaEscala = [0.4, ...CLICS.flatMap(() => [0.4, 1, 1.8]), 0.4];

  // Barra de texto que se escribe dentro de cada campo
  const llenar = (inicio, fin) => anim({ scaleX: [0, 0, 1, 1, 0] }, [0, inicio, fin, 0.95, 1], "linear");

  return (
    <Ventana titulo="bot_radicacion.exe" refContenido={ref}>
      <div className="grid h-full grid-cols-[1.4fr_1fr] gap-4">
        {/* Formulario */}
        <div className="flex flex-col justify-between">
          {[
            [CLICS[0], "w-3/4"],
            [CLICS[1], "w-1/2"],
            [CLICS[2], "w-2/3"],
          ].map(([t, ancho], i) => (
            <div key={i} className="space-y-1">
              <div className="h-1 w-8 rounded-full bg-muted/40" />
              <div className="flex h-5 items-center rounded-md border border-line px-1.5">
                <motion.div className={`h-1.5 origin-left rounded-full bg-accent/70 ${ancho}`} {...llenar(t + 0.02, t + 0.13)} />
              </div>
            </div>
          ))}
        </div>

        {/* Captcha, botón y estado */}
        <div className="flex flex-col justify-between">
          <div className="flex items-center gap-1.5 rounded-md border border-line p-1.5">
            <span className="relative grid size-3.5 place-items-center rounded-sm border border-muted/60">
              <motion.span className="absolute inset-0 grid place-items-center rounded-sm bg-accent text-bg" {...anim({ scale: [0, 0, 1, 1, 0] }, [0, CLICS[3] + 0.01, CLICS[3] + 0.04, 0.95, 1])}>
                <Check className="size-2.5" strokeWidth={4} />
              </motion.span>
            </span>
            <span className="font-mono text-[9px] leading-none text-muted">no soy un robot</span>
          </div>

          <motion.div
            className="grid h-6 place-items-center rounded-md bg-accent font-mono text-[10px] font-semibold text-bg"
            {...anim({ scale: [1, 1, 0.9, 1, 1] }, [0, CLICS[4] - 0.005, CLICS[4] + 0.01, CLICS[4] + 0.04, 1])}
          >
            Radicar
          </motion.div>

          <motion.div
            className="flex items-center gap-1 font-mono text-[10px] text-ink"
            {...anim({ opacity: [0, 0, 1, 1, 0], y: [4, 4, 0, 0, 4] }, [0, CLICS[4] + 0.04, CLICS[4] + 0.08, 0.95, 1])}
          >
            <Check className="size-3 text-accent" strokeWidth={3} /> Radicado
          </motion.div>
        </div>
      </div>

      {/* Cursor */}
      <motion.div
        className="pointer-events-none absolute z-10 -translate-x-[3px] -translate-y-[2px]"
        {...anim({ left: puntos.map((p) => `${p[0]}%`), top: puntos.map((p) => `${p[1]}%`) }, tiemposCursor)}
      >
        <motion.span
          className="absolute -top-2.5 -left-2.5 size-5 rounded-full border border-accent"
          {...anim({ opacity: ondaOpacidad, scale: ondaEscala }, clicTimes, "easeOut")}
        />
        <motion.span className="block" {...anim({ scale: clicScale }, clicTimes)}>
          <MousePointer2 className="size-4 fill-accent text-bg drop-shadow" strokeWidth={1.5} />
        </motion.span>
      </motion.div>
    </Ventana>
  );
}

// ============================================================
//  2. OCR: una línea escanea el documento y los datos aparecen
//     extraídos y validados a la derecha.
// ============================================================
const DUR_OCR = 6;
const ESCANEO = [0.08, 0.55]; // inicio y fin del barrido

// Momento en que la línea pasa por una altura (0–1) del documento
const pasoPor = (y) => ESCANEO[0] + (ESCANEO[1] - ESCANEO[0]) * y;

export function AnimacionOCR() {
  const { ref, anim } = useBucle(DUR_OCR);

  // Líneas de texto del documento: [altura relativa, ancho]
  const lineas = [
    [0.2, "w-3/5"],
    [0.4, "w-4/5"],
    [0.58, "w-1/2"],
    [0.76, "w-2/3"],
  ];
  const campos = ["RUT", "NIT", "Nombre"];

  return (
    <Ventana titulo="validar_documento.py" refContenido={ref}>
      <div className="grid h-full grid-cols-[1.1fr_1fr] gap-4">
        {/* Documento con marco de escaneo */}
        <div className="relative">
          {/* Esquinas del visor */}
          {["top-0 left-0 border-t-2 border-l-2 rounded-tl-md", "top-0 right-0 border-t-2 border-r-2 rounded-tr-md", "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-md", "right-0 bottom-0 border-r-2 border-b-2 rounded-br-md"].map((c) => (
            <span key={c} className={`absolute size-3 border-accent ${c}`} />
          ))}

          <div className="absolute inset-1.5 overflow-hidden rounded-md border border-line bg-accent-soft p-2">
            {/* Foto del documento */}
            <div className="absolute top-2 right-2 size-6 rounded-sm bg-line" />
            {lineas.map(([y, ancho]) => (
              <motion.div
                key={y}
                className={`absolute left-2 h-1.5 rounded-full ${ancho}`}
                style={{ top: `${y * 100}%` }}
                {...anim(
                  { backgroundColor: ["var(--border)", "var(--border)", "var(--accent)", "var(--accent)", "var(--border)"] },
                  [0, pasoPor(y), pasoPor(y) + 0.03, 0.95, 1]
                )}
              />
            ))}

            {/* Línea de escaneo */}
            <motion.div
              className="absolute inset-x-0 h-6 -translate-y-full bg-gradient-to-b from-transparent to-accent/25"
              {...anim({ top: ["0%", "0%", "105%", "105%"], opacity: [0, 1, 1, 0] }, [0, ESCANEO[0], ESCANEO[1], ESCANEO[1] + 0.05], "linear")}
            >
              <div className="absolute inset-x-0 bottom-0 h-px bg-accent shadow-[0_0_8px_var(--accent)]" />
            </motion.div>
          </div>
        </div>

        {/* Datos extraídos */}
        <div className="flex flex-col justify-between">
          {campos.map((campo, i) => {
            const t = pasoPor(lineas[i + 1][0]) + 0.04;
            return (
              <motion.div
                key={campo}
                className="flex items-center gap-1.5"
                {...anim({ opacity: [0, 0, 1, 1, 0], x: [6, 6, 0, 0, 6] }, [0, t, t + 0.05, 0.95, 1])}
              >
                <span className="grid size-3.5 shrink-0 place-items-center rounded-full bg-accent text-bg">
                  <Check className="size-2.5" strokeWidth={4} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[9px] leading-none text-muted">{campo}</p>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-accent/60" />
                </div>
              </motion.div>
            );
          })}
          <motion.div
            className="rounded-md border border-accent/40 py-0.5 text-center font-mono text-[10px] font-semibold text-ink"
            {...anim({ opacity: [0, 0, 1, 1, 0], scale: [0.9, 0.9, 1, 1, 0.9] }, [0, 0.66, 0.71, 0.95, 1])}
          >
            Validado
          </motion.div>
        </div>
      </div>
    </Ventana>
  );
}
