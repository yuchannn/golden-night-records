import Link from "next/link";
import type { Artist, Release } from "@/lib/content";
import { artistName, listenPath } from "@/lib/catalogue";
import { CoverArt } from "@/components/cover-art";

export function ReleaseCard({ release, artist }: { release: Release; artist: Artist }) {
  const name = artistName(artist);
  const titleId = `release-title-${release.id}`;
  const href = listenPath(release);

  return (
    <article aria-labelledby={titleId} className="flex flex-col">
      <Link
        href={href}
        className="sleeve-button block w-full text-left"
        aria-label={`聆聽：${release.title}`}
      >
        <CoverArt
          release={release}
          artistName={name}
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw"
          className="ring-gold/70 transition-[box-shadow] hover:ring-gold"
        />
      </Link>
      <h3 id={titleId} className="mt-4 font-serif-tc text-2xl font-semibold leading-tight">
        <Link href={href} className="hover:text-burgundy">
          {release.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-6 text-ink-soft">{name}</p>
      {release.type || release.date ? (
        <p className="mt-1 text-sm text-ink-soft">
          {[release.type, release.date].filter(Boolean).join(" · ")}
        </p>
      ) : null}
      <Link
        href={href}
        className="mt-4 inline-flex min-h-11 items-center self-start border-b border-gold text-sm font-medium transition-colors hover:text-burgundy"
      >
        聆聽這首歌
      </Link>
    </article>
  );
}
