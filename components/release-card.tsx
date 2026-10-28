"use client";

import type { Artist, Release } from "@/lib/content";
import { artistName } from "@/lib/catalogue";
import { CoverArt } from "@/components/cover-art";

export function ReleaseCard({
  release,
  artist,
  onOpen,
}: {
  release: Release;
  artist: Artist;
  onOpen: (release: Release, trigger: HTMLElement) => void;
}) {
  const name = artistName(artist);
  const titleId = `release-title-${release.id}`;

  return (
    <article aria-labelledby={titleId} className="flex flex-col">
      <button
        type="button"
        className="sleeve-button block w-full cursor-pointer border-0 bg-transparent p-0 text-left"
        aria-haspopup="dialog"
        aria-label={`查看作品：${release.title}`}
        onClick={(event) => onOpen(release, event.currentTarget)}
      >
        <CoverArt
          release={release}
          artistName={name}
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw"
          className="ring-gold/70 transition-[box-shadow] hover:ring-gold"
        />
      </button>
      <h3 id={titleId} className="mt-4 font-serif-tc text-2xl font-semibold leading-tight">
        {release.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-ink-soft">{name}</p>
      {release.type || release.date ? (
        <p className="mt-1 text-sm text-ink-soft">
          {[release.type, release.date].filter(Boolean).join(" · ")}
        </p>
      ) : null}
      <button
        type="button"
        className="mt-4 inline-flex min-h-11 items-center self-start border-b border-gold text-sm font-medium transition-colors hover:text-burgundy"
        aria-haspopup="dialog"
        aria-label={`查看作品：${release.title}`}
        onClick={(event) => onOpen(release, event.currentTarget)}
      >
        查看作品
      </button>
    </article>
  );
}
