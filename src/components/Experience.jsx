import { Briefcase } from "lucide-react";
import { experiencia } from "../data/portfolio";
import { Card, Reveal, Section } from "./ui";

export default function Experience() {
  return (
    <Section id="experiencia" numero="03" titulo="Experiencia">
      <div className="relative space-y-8 border-l-2 border-line pl-8 md:pl-10">
        {experiencia.map((exp) => (
          <Reveal key={exp.cargo} className="relative">
            <span className="absolute top-1 -left-[49px] grid size-8 place-items-center rounded-full bg-accent text-[#062a26] ring-8 ring-accent-soft md:-left-[57px]">
              <Briefcase className="size-4" />
            </span>
            <Card className="p-6 md:p-8">
              <span className="font-mono text-sm text-accent">{exp.fecha}</span>
              <h3 className="mt-1 font-title text-xl font-bold">{exp.cargo}</h3>
              <p className="mb-5 font-medium text-muted">{exp.empresa}</p>
              <ul className="space-y-3">
                {exp.logros.map((l, i) => (
                  <li key={i} className="flex gap-3 text-muted">
                    <span className="mt-1 text-accent">▹</span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
