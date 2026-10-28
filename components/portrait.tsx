import Image from "next/image";
import type { Artist } from "@/lib/content";
import { artistName } from "@/lib/catalogue";
import { cx } from "@/lib/cx";

const frame: Record<Artist["accent"], string> = {
  burgundy: "bg-[#f6efe6]",
  slate: "bg-[#e7eef1]",
};

const focus: Record<string, string> = {
  "romy-lo": "object-center",
  yan: "object-[center_30%]",
};

export function Portrait({
  artist,
  priority = false,
  sizes,
  framed = false,
  className,
}: {
  artist: Artist;
  priority?: boolean;
  sizes: string;
  framed?: boolean;
  className?: string;
}) {
  const name = artistName(artist);

  if (!artist.portrait) {
    return (
      <div
        role="img"
        aria-label={name}
        className={cx(
          "flex aspect-[3/4] items-end p-5 ring-1 ring-gold/60",
          artist.accent === "burgundy" ? "bg-burgundy text-cream" : "bg-slate text-cream",
          className,
        )}
      >
        <div aria-hidden="true">
          <p lang="en" className="font-display text-2xl italic">
            {artist.nameEn}
          </p>
          <p className="mt-2 font-serif-tc text-4xl font-semibold">{artist.nameZh}</p>
        </div>
      </div>
    );
  }

  const image = (
    <div className="relative aspect-[4/5] overflow-hidden">
      <Image
        src={artist.portrait.src}
        alt={artist.portrait.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cx("object-cover", focus[artist.id] ?? "object-center")}
      />
    </div>
  );

  if (!framed) {
    return <div className={className}>{image}</div>;
  }

  return (
    <div className={cx("p-2 ring-1 ring-gold/50 sm:p-3", frame[artist.accent], className)}>
      {image}
    </div>
  );
}
