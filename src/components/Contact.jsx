import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Mail, MapPin } from "lucide-react";
import { perfil } from "../data/portfolio";
import { GithubIcon, Reveal } from "./ui";

export default function Contact() {
  const [copiado, setCopiado] = useState(false);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(perfil.correo);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      window.location.href = `mailto:${perfil.correo}`;
    }
  };

  return (
    <section id="contacto" className="relative overflow-hidden bg-bg-alt py-24 md:py-32">
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />
      <Reveal className="relative mx-auto w-[min(640px,100%-32px)] text-center">
        <p className="font-mono text-accent">06. ¿Qué sigue?</p>
        <h2 className="mt-3 font-title text-4xl font-extrabold md:text-5xl">Hablemos</h2>
        <p className="mt-5 text-lg text-muted">
          Estoy buscando mi primera oportunidad como desarrollador. Si tienes una vacante o un proyecto, escríbeme y te
          respondo pronto.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a href={`mailto:${perfil.correo}`} className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-[#062a26] shadow-lg shadow-accent/25 transition hover:-translate-y-0.5">
            <Mail className="size-4" /> Escríbeme un correo
          </a>
          <button onClick={copiar} className="inline-flex items-center gap-2 rounded-xl border border-accent px-6 py-3 font-semibold text-accent transition hover:-translate-y-0.5 hover:bg-accent-soft">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={copiado ? "ok" : "copiar"} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                {copiado ? <Check className="size-4" /> : <Copy className="size-4" />}
              </motion.span>
            </AnimatePresence>
            {copiado ? "¡Copiado!" : "Copiar correo"}
          </button>
        </div>

        <p className="mt-6 font-mono break-all text-accent">{perfil.correo}</p>
        <div className="mt-3 flex items-center justify-center gap-5 text-muted">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-4" /> {perfil.ciudad}
          </span>
          <a href={perfil.github} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 transition hover:text-accent">
            <GithubIcon className="size-4" /> FrankPater15
          </a>
        </div>
      </Reveal>
    </section>
  );
}
