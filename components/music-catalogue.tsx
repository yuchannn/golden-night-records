"use client";

import { useMemo, useState } from "react";
import { artists, type Release } from "@/lib/content";
import { getArtistById } from "@/lib/catalogue";
import { ReleaseCard } from "@/components/release-card";
import { cx } from "@/lib/cx";

type FilterId = "all" | string;

export function MusicCatalogue({
  releases,
  enableFilters = false,
}: {
  releases: Release[];
  enableFilters?: boolean;
}) {
  const [filter, setFilter] = useState<FilterId>("all");

  const visible = useMemo(() => {
    const selected =
      !enableFilters || filter === "all"
        ? releases
        : releases.filter((release) => release.artistId === filter);
    return [...selected].sort((a, b) => a.featuredOrder - b.featuredOrder);
  }, [enableFilters, filter, releases]);

  return (
    <div>
      {enableFilters ? (
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div role="group" aria-label="依藝人篩選" className="flex flex-wrap gap-2">
            <FilterButton
              label="全部"
              pressed={filter === "all"}
              onClick={() => setFilter("all")}
            />
            {artists.map((artist) => (
              <FilterButton
                key={artist.id}
                label={artist.nameEn}
                pressed={filter === artist.id}
                onClick={() => setFilter(artist.id)}
              />
            ))}
          </div>
          <p className="text-sm text-ink-soft" aria-live="polite">
            {visible.length} 首選曲
          </p>
        </div>
      ) : null}

      {visible.length === 0 ? (
        <p className="mt-10 text-base leading-7">這個篩選下還沒有選曲。</p>
      ) : (
        <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((release) => {
            const artist = getArtistById(release.artistId);
            if (!artist) return null;
            return (
              <li key={release.id}>
                <ReleaseCard release={release} artist={artist} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function FilterButton({
  label,
  pressed,
  onClick,
}: {
  label: string;
  pressed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cx(
        "inline-flex min-h-11 items-center border px-4 text-sm font-medium motion-safe:transition-colors",
        pressed
          ? "border-ink bg-ink text-cream"
          : "border-ink/25 bg-transparent text-ink hover:border-ink hover:bg-cream-deep",
      )}
    >
      {pressed ? <span aria-hidden="true" className="mr-2 inline-block size-1.5 bg-gold" /> : null}
      {label}
    </button>
  );
}
