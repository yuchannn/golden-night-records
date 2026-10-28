import Image from "next/image";
import type { Release } from "@/lib/content";
import { cx } from "@/lib/cx";

export function CoverArt({
  release,
  artistName,
  priority = false,
  sizes,
  className,
  imageClassName,
}: {
  release: Release;
  artistName: string;
  priority?: boolean;
  sizes: string;
  className?: string;
  imageClassName?: string;
}) {
  const frame = cx(
    "relative aspect-square overflow-hidden rounded-[2px] bg-cream-deep ring-1 ring-gold/70",
    className,
  );

  if (!release.artwork) {
    return (
      <div role="img" aria-label={`${release.title}，${artistName}`} className={frame}>
        <div
          aria-hidden="true"
          className="flex h-full flex-col justify-between bg-ink p-4 text-cream sm:p-5"
        >
          <p className="font-sans text-[0.65rem] font-medium tracking-[0.18em]">
            {artistName}
          </p>
          <p className="font-serif-tc text-3xl font-semibold leading-tight">{release.title}</p>
          <p lang="en" className="font-sans text-[0.65rem] tracking-[0.16em]">
            GOLDEN NIGHT RECORDS
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={frame}>
      <Image
        src={release.artwork.src}
        alt={release.artwork.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cx("object-cover", imageClassName)}
      />
    </div>
  );
}
