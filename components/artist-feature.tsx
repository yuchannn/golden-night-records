import Link from "next/link";
import type { Artist } from "@/lib/content";
import { cx } from "@/lib/cx";
import { Portrait } from "@/components/portrait";

const wash: Record<Artist["accent"], string> = {
  burgundy: "bg-[#f7f3ec]",
  slate: "bg-[#eef2f3]",
};

const rule: Record<Artist["accent"], string> = {
  burgundy: "bg-burgundy",
  slate: "bg-slate",
};

export function ArtistFeature({ artist }: { artist: Artist }) {
  return (
    <Link
      href={`/artists/${artist.slug}`}
      className={cx(
        "lift-card group flex h-full flex-col border border-gold/45 p-4 hover:border-ink sm:p-5",
        wash[artist.accent],
      )}
    >
      <div className={cx("mb-5 h-1 w-12", rule[artist.accent])} aria-hidden="true" />
      <Portrait
        artist={artist}
        framed
        sizes="(min-width: 1024px) 34rem, (min-width: 768px) 46vw, 92vw"
      />
      <p lang="en" className="mt-6 font-display text-[1.7rem] italic leading-none">
        {artist.nameEn}
      </p>
      <h3 className="mt-2 font-serif-tc text-4xl font-semibold leading-tight">{artist.nameZh}</h3>
      <p className="mt-4 flex-1 text-base leading-8">{artist.introduction}</p>
      <span className="mt-6 inline-flex min-h-11 items-center self-start border-b border-gold font-medium transition-colors group-hover:text-burgundy">
        查看藝人頁面
      </span>
    </Link>
  );
}
