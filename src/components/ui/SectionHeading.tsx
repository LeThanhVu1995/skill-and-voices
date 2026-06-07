import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  const isCenter = align === "center";
  return (
    <div
      className={`flex flex-col ${
        isCenter ? "items-center text-center" : "items-start text-left"
      } ${isCenter ? "mx-auto max-w-2xl" : "max-w-2xl"}`}
    >
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={1}>
        <h2
          className={`mt-5 text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.6rem] ${
            light ? "text-white" : "text-brand-950"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={2}>
          <p
            className={`mt-4 text-base leading-relaxed ${
              light ? "text-cream/70" : "text-brand-950/60"
            }`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
