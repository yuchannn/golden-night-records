import Link from "next/link";
import type { Artist, Release } from "@/lib/content";
import { artistName, releaseStory } from "@/lib/catalogue";
import { spotifyTrackEmbedUrl } from "@/lib/urls";
import { CoverArt } from "@/components/cover-art";

export function ListenView({ release, artist }: { release: Release; artist: Artist }) {
  const name = artistName(artist);
  const { line, rest } = releaseStory(release.description);
  const spotify = release.listeningLinks.find((link) => link.service === "spotify") ?? null;
  const embed = spotify ? spotifyTrackEmbedUrl(spotify.url) : null;

  return (
    <article className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 sm:py-16">
      <Link
        href="/#music"
        className="story-link inline-flex min-h-11 items-center text-sm font-medium"
      >
        ← 金宵選曲
      </Link>
      <div className="mt-8 grid items-start gap-10 lg:mt-12 lg:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] lg:gap-16">
        <CoverArt
          release={release}
          artistName={name}
          priority
          sizes="(min-width: 1024px) 28rem, 92vw"
        />
        <div>
          <p className="font-sans text-xs font-medium tracking-[0.18em] text-ink-soft">金宵選曲</p>
          <h1 className="mt-4 font-serif-tc text-[clamp(2.8rem,6vw,4.6rem)] font-semibold leading-[1.12]">
            {release.title}
          </h1>
          <p className="mt-3 text-lg">
            <Link href={`/artists/${artist.slug}`} className="story-link">
              {name}
            </Link>
          </p>
          {line ? (
            <p className="mt-8 max-w-xl font-serif-tc text-2xl leading-snug font-semibold">{line}</p>
          ) : null}
          {spotify ? (
            <a
              href={spotify.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-12 items-center bg-ink px-6 text-sm font-medium text-cream transition-colors hover:bg-burgundy"
            >
              在 Spotify 聆聽
              <span className="sr-only">（另開新視窗）</span>
            </a>
          ) : (
            <p className="mt-8 text-base leading-8 text-ink-soft">收聽連結即將公布</p>
          )}
          {embed ? (
            <iframe
              src={embed}
              title={`在 Spotify 聆聽〈${release.title}〉`}
              width="100%"
              height={152}
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              className="mt-8 w-full max-w-xl rounded-sm border-0"
            />
          ) : null}
          {rest ? (
            <div className="mt-8 max-w-xl space-y-4 text-base leading-8">
              {rest.split(/\n{2,}/).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : null}
          <Link
            href={`/artists/${artist.slug}`}
            className="mt-8 inline-flex min-h-11 items-center border border-ink px-4 text-sm font-medium transition-colors hover:bg-ink hover:text-cream"
          >
            前往藝人頁面
          </Link>
        </div>
      </div>
    </article>
  );
}
