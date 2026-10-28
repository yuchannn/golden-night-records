import { aboutParagraphs, artists, label } from "@/lib/content";
import { getContactEmail, getFeaturedReleases, getSocialLinks } from "@/lib/catalogue";
import { ArtistFeature } from "@/components/artist-feature";
import { ChapterMark, NextPage } from "@/components/chapter-mark";
import { ChapterRail, ReadingBookmark } from "@/components/chapter-rail";
import { HeroArtwork } from "@/components/hero-artwork";
import { MusicCatalogue } from "@/components/music-catalogue";
import { SectionHeading } from "@/components/section-heading";

export default function HomePage() {
  const email = getContactEmail();
  const social = getSocialLinks();
  const hasContact = Boolean(email) || social.length > 0;

  return (
    <>
      <ReadingBookmark />
      <ChapterRail />
      <section
        id="opening"
        className="mx-auto max-w-[76rem] scroll-mt-24 px-5 pt-8 pb-14 sm:px-8 lg:pt-12 lg:pb-16"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <ChapterMark id="opening" className="mb-0" />
          <p lang="en" className="font-display text-lg italic sm:text-xl">
            Stay for another song.
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-6 sm:mt-8 lg:flex-row lg:items-end lg:justify-between">
          <h1 className="motion-safe:animate-rise font-serif-tc text-[clamp(3rem,5.6vw,4.75rem)] font-semibold leading-[1.08]">
            <span className="block">把今宵，</span>
            <span className="block">留在歌裡。</span>
          </h1>
          <p className="max-w-sm text-base leading-8 lg:pb-1">
            金宵唱片，來自台北。收錄心動、試探，和那些還沒說出口的話。
          </p>
        </div>
        <div className="mt-8 sm:mt-10">
          <HeroArtwork />
        </div>
      </section>

      <section id="artists" className="scroll-mt-24 border-t border-gold/40">
        <div className="story-spread mx-auto max-w-[76rem] px-5 py-20 sm:px-8 sm:py-28">
          <ChapterMark id="artists" />
          <SectionHeading
            eyebrow="Artists"
            title="我們的藝人"
            dek="Two voices. A world of their own."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-6 lg:mt-16 lg:gap-10">
            {artists.map((artist) => (
              <ArtistFeature key={artist.id} artist={artist} />
            ))}
          </div>
          <NextPage id="music" />
        </div>
      </section>

      <section id="music" className="scroll-mt-24 border-t border-gold/40">
        <div className="story-spread mx-auto max-w-[76rem] px-5 py-20 sm:px-8 sm:py-28">
          <ChapterMark id="music" />
          <SectionHeading
            eyebrow="Selected music"
            title="金宵選曲"
            dek="Find your next repeat."
          />
          <MusicCatalogue releases={getFeaturedReleases()} enableFilters />
          <NextPage id="about" />
        </div>
      </section>

      <section id="about" className="dark-surface scroll-mt-24 bg-ink text-cream">
        <div className="relative mx-auto max-w-[76rem] overflow-clip px-5 py-20 sm:px-8 sm:py-28">
          <p
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 bottom-0 font-serif-tc text-[12rem] leading-none font-semibold text-cream/5 sm:text-[16rem]"
          >
            宵
          </p>
          <div className="story-spread relative max-w-3xl">
            <ChapterMark id="about" tone="cream" />
            <SectionHeading tone="cream" eyebrow="About" title="好音樂，值得多留一會。" />
            <div className="gold-rule mt-8 h-px w-14 origin-left bg-gold" aria-hidden="true" />
            <div className="mt-8 max-w-2xl space-y-6 text-lg leading-9 text-cream">
              {aboutParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <NextPage id="contact" tone="cream" />
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 border-t border-gold/40">
        <div className="story-spread mx-auto grid max-w-[76rem] gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ChapterMark id="contact" />
            <SectionHeading
              eyebrow="Contact"
              title="下一段故事，從這裡開始。"
              dek="Let's make something worth hearing."
            />
          </div>
          <div className="lg:col-span-5 lg:pt-10">
            <p className="text-lg leading-9">
              演出邀約、品牌合作、媒體採訪，歡迎與金宵唱片聯繫。
            </p>
            {hasContact ? (
              <div className="mt-8 flex flex-col gap-3">
                {email ? (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex min-h-11 items-center font-serif-tc text-2xl font-semibold break-all underline decoration-gold decoration-1 underline-offset-8"
                  >
                    {email}
                  </a>
                ) : null}
                {social.length > 0 ? (
                  <ul className="flex flex-col">
                    {social.map((item) => (
                      <li key={item.url}>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center font-medium"
                        >
                          {item.label}
                          <span className="sr-only">（另開新視窗）</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : (
              <p className="mt-8 border-t border-gold/50 pt-6 font-serif-tc text-2xl font-semibold leading-snug">
                聯絡資訊即將公布
              </p>
            )}
            <p className="mt-8 text-sm text-ink-soft">
              {label.cityZh}，{label.regionZh}
              <span lang="en"> · {label.cityEn}, {label.regionEn}</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
