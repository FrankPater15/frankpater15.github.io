import { Award, ExternalLink } from "lucide-react";
import { certificados } from "../data/portfolio";
import { publico, Reveal, Section, TiltCard } from "./ui";

function Tarjeta({ c }) {
  const url = c.enlace || (c.archivo && publico(c.archivo));
  return (
    <TiltCard intensidad={6} className="flex flex-col p-7">
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
          <Award className="size-6" />
        </span>
        <span className="font-mono text-sm text-accent">{c.fecha}</span>
      </div>

      <h3 className="mt-6 font-title text-xl leading-tight font-bold md:text-2xl">{c.nombre}</h3>
      <p className="mt-2 text-muted">{c.entidad}</p>

      {(c.horas || c.serie) && (
        <p className="mt-1 font-mono text-xs text-muted">
          {c.horas && `${c.horas} horas`}
          {c.horas && c.serie && " · "}
          {c.serie && `N.º ${c.serie}`}
        </p>
      )}

      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-2 self-start pt-6 text-sm font-semibold text-accent transition hover:brightness-125"
        >
          Ver certificado <ExternalLink className="size-4" />
        </a>
      )}
    </TiltCard>
  );
}

export default function Certificates() {
  if (!certificados.length) return null;
  return (
    <Section id="certificados" numero="06" kicker="Certificados" titulo="Sigo aprendiendo.">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certificados.map((c, i) => (
          <Reveal key={c.nombre} delay={(i % 3) * 0.1} className="h-full">
            <Tarjeta c={c} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
