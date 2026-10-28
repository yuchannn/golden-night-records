import Link from "next/link";
import type { Artist, Release } from "@/lib/content";
import { resolveExternalLinks } from "@/lib/urls";
import { cx } from "@/lib/cx";
import { MusicCatalogue } from "@/components/music-catalogue";
import { Portrait } from "@/components/portrait";

const rule: Record<Artist["accent"], string> = {
  burgundy: "bg-burgundy",
  slate: "bg-slate",
};

export function ArtistProfile({
  artist,
  releases,
  other,
}: {
  artist: Artist;
  releases: Release[];
  other?: Artist;
}) {
  const links = resolveExternalLinks(artist.links);

  return (
    <article>
      <div className={cx("h-1", rule[artist.accent])} aria-hidden="true" />
      <div className="mx-auto max-w-[76rem] px-5 py-10 sm:px-8 sm:py-14">
        <Link href="/" className="inline-flex min-h-11 items-center text-sm font-medium">
          ← 返回金宵唱片
        </Link>

        <div className="mt-8 grid items-start gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Portrait
              artist={artist}
              priority
              framed
              sizes="(min-width: 1024px) 36rem, 92vw"
            />
          </div>
          <div className="lg:col-span-7 lg:pt-6">
            <p className="mb-5 font-serif-tc text-sm tracking-[0.18em] text-ink-soft">翻到這一頁</p>
            <p lang="en" className="font-display text-3xl italic leading-none sm:text-4xl">
              {artist.nameEn}
            </p>
            <h1 className="mt-3 font-serif-tc text-[clamp(3.2rem,8vw,6rem)] font-semibold leading-[1.05]">
              {artist.nameZh}
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-9">{artist.introduction}</p>
            {artist.biography ? (
              <div className="mt-8 max-w-xl space-y-4 text-base leading-8 text-ink-soft">
                {artist.biography.split(/\n{2,}/).map((paragraph) => (
                  <p key={paragraph} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}
            {links.length > 0 ? (
              <ul className="mt-8 flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center border border-ink px-4 text-sm font-medium"
                    >
                      {link.label}
                      <span className="sr-only">（另開新視窗）</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <section className="mt-20 border-t border-gold/40 pt-12 sm:mt-24" aria-labelledby="artist-music">
          <p lang="en" className="font-sans text-xs font-medium tracking-[0.22em] uppercase text-ink-soft">
            Selected music
          </p>
          <h2 id="artist-music" className="mt-3 font-serif-tc text-4xl font-semibold">
            選曲
          </h2>
          {releases.length === 0 ? (
            <p className="mt-8 text-base leading-8">這個頁面還沒有選曲。</p>
          ) : (
            <MusicCatalogue releases={releases} />
          )}
        </section>

        {other ? (
          <aside className="mt-20 border-t border-gold/40 pt-12 sm:mt-24" aria-labelledby="other-artist">
            <h2 id="other-artist" className="font-serif-tc text-3xl font-semibold">
              另一位藝人
            </h2>
            <Link
              href={`/artists/${other.slug}`}
              className="lift-card group mt-6 grid gap-5 border border-gold/40 p-4 hover:border-ink sm:grid-cols-[9.5rem_1fr] sm:items-center sm:p-5"
            >
              <Portrait artist={other} framed sizes="160px" />
              <div>
                <p lang="en" className="font-display text-2xl italic">
                  {other.nameEn}
                </p>
                <p className="mt-1 font-serif-tc text-3xl font-semibold">{other.nameZh}</p>
                <p className="mt-3 max-w-xl text-base leading-8">{other.introduction}</p>
                <span className="mt-4 inline-flex min-h-11 items-center border-b border-gold font-medium transition-colors group-hover:text-burgundy">
                  查看藝人頁面
                </span>
              </div>
            </Link>
          </aside>
        ) : null}
      </div>
    </article>
  );
}
