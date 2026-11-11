import Image from "next/image";
import Link from "next/link";
import { artistName, getArtistById, getNewRelease, listenPath } from "@/lib/catalogue";

/** Homepage notice for the song named by `newReleaseId` in lib/content.ts. */
export function NewReleaseNotice() {
  const release = getNewRelease();
  const artist = release ? getArtistById(release.artistId) : undefined;
  if (!release || !artist) return null;

  return (
    <aside aria-label="新歌上線" className="border-b border-gold/40 bg-cream-deep">
      <div className="mx-auto max-w-[76rem] px-5 py-2 sm:px-8">
        <Link
          href={listenPath(release)}
          className="nudge group flex min-h-12 items-center gap-4 sm:gap-5"
        >
          {release.artwork ? (
            <Image
              src={release.artwork.src}
              alt=""
              width={44}
              height={44}
              className="size-11 shrink-0 rounded-[2px] ring-1 ring-gold/70"
            />
          ) : null}
          <span className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-6">
            <span className="flex items-center gap-2 font-sans text-xs font-medium tracking-[0.18em]">
              <span aria-hidden="true" className="size-1.5 shrink-0 bg-gold" />
              新歌上線
              <span lang="en" className="uppercase">
                Out now
              </span>
            </span>
            <span className="flex min-w-0 items-baseline gap-3">
              <span className="font-serif-tc text-lg leading-tight font-semibold sm:text-xl">
                {release.title}
              </span>
              <span className="truncate text-sm text-ink-soft">{artistName(artist)}</span>
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-2 text-sm font-medium transition-colors group-hover:text-burgundy">
            <span className="sr-only sm:not-sr-only">聆聽新歌</span>
            <span aria-hidden="true" className="nudge-arrow">
              →
            </span>
          </span>
        </Link>
      </div>
    </aside>
  );
}
