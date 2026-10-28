import { chapters } from "@/lib/content";
import { cx } from "@/lib/cx";
import { SectionLink } from "@/components/section-link";

type ChapterId = (typeof chapters)[number]["id"];

export function ChapterMark({
  id,
  tone = "ink",
  className,
}: {
  id: ChapterId;
  tone?: "ink" | "cream";
  className?: string;
}) {
  const chapter = chapters.find((item) => item.id === id);
  if (!chapter) return null;
  const cream = tone === "cream";

  return (
    <p className={cx("flex items-baseline gap-3", className ?? "mb-5", cream ? "text-cream" : "text-ink")}>
      <span className="font-serif-tc text-2xl font-semibold leading-none">{chapter.mark}</span>
      <span aria-hidden="true" className="text-gold">
        /
      </span>
      <span className="text-sm leading-6">{chapter.line}</span>
    </p>
  );
}

export function NextPage({
  id,
  tone = "ink",
  className,
}: {
  id: ChapterId;
  tone?: "ink" | "cream";
  className?: string;
}) {
  const chapter = chapters.find((item) => item.id === id);
  if (!chapter) return null;
  const cream = tone === "cream";

  return (
    <SectionLink
      id={id}
      className={cx(
        "nudge story-link inline-flex min-h-11 items-center gap-3 text-sm font-medium",
        className ?? "mt-12",
        cream ? "text-cream" : "text-ink",
      )}
    >
      <span className="font-serif-tc text-lg leading-none">{chapter.mark}</span>
      <span>下一頁</span>
      <span aria-hidden="true" className="nudge-arrow">
        →
      </span>
      <span className="sr-only">{chapter.line}</span>
    </SectionLink>
  );
}
