import type { Release } from "@/lib/content";
import { isNewRelease } from "@/lib/catalogue";

/** Small 新歌 note beside the artist name of the announced song. */
export function NewMark({ release }: { release: Release }) {
  if (!isNewRelease(release)) return null;

  return (
    <span className="ml-3 inline-flex items-center gap-1.5 align-top font-medium text-ink">
      <span aria-hidden="true" className="size-1.5 bg-gold" />
      新歌
    </span>
  );
}
