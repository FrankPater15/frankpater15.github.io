import { GraduationCap } from "lucide-react";
import { formacion } from "../data/portfolio";
import { Card, Reveal, Section } from "./ui";

export default function Education() {
  return (
    <Section id="formacion" numero="05" titulo="Formación">
      <div className="grid gap-4">
        {formacion.map((f, i) => (
          <Reveal key={f.titulo} delay={i * 0.1}>
            <Card className="flex gap-4 p-5 md:p-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <GraduationCap className="size-5" />
              </span>
              <div>
                <span className="font-mono text-sm text-accent">{f.fecha}</span>
                <h3 className="font-title text-lg font-semibold">{f.titulo}</h3>
                <p className="text-muted">{f.lugar}</p>
                {f.extra && <p className="mt-1 text-sm text-muted">{f.extra}</p>}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
