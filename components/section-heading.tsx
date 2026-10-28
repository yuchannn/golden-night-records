import { cx } from "@/lib/cx";

export function SectionHeading({
  eyebrow,
  title,
  dek,
  tone = "ink",
}: {
  eyebrow: string;
  title: string;
  dek?: string;
  tone?: "ink" | "cream";
}) {
  const cream = tone === "cream";

  return (
    <div className="max-w-3xl">
      <p
        lang="en"
        className={cx(
          "font-sans text-xs font-medium tracking-[0.22em] uppercase",
          cream ? "text-cream" : "text-ink-soft",
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cx(
          "mt-3 font-serif-tc text-[clamp(2.2rem,5vw,3.7rem)] font-semibold leading-[1.2]",
          cream ? "text-cream" : "text-ink",
        )}
      >
        {title}
      </h2>
      {dek ? (
        <p
          lang="en"
          className={cx(
            "mt-4 max-w-xl font-display text-[1.45rem] italic leading-snug sm:text-[1.7rem]",
            cream ? "text-cream" : "text-ink",
          )}
        >
          {dek}
        </p>
      ) : null}
    </div>
  );
}
