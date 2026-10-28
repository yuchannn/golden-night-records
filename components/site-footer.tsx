import { cacheLife } from "next/cache";
import { label, navigation } from "@/lib/content";
import { getSocialLinks } from "@/lib/catalogue";
import { SectionLink } from "@/components/section-link";
import { Wordmark } from "@/components/wordmark";

async function copyrightYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function SiteFooter() {
  const year = await copyrightYear();
  const social = getSocialLinks();

  return (
    <footer className="dark-surface border-t border-gold/40 bg-ink text-cream">
      <div className="mx-auto grid max-w-[76rem] gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] md:py-14">
        <div>
          <Wordmark inverted />
          <p className="mt-4 text-sm leading-6">
            {label.cityZh}，{label.regionZh}
          </p>
          <p lang="en" className="text-sm leading-6">
            {label.cityEn}, {label.regionEn}
          </p>
        </div>
        <nav aria-label="頁尾">
          <ul className="flex flex-col">
            {navigation.map((item) => (
              <li key={item.id}>
                <SectionLink
                  id={item.id}
                  className="inline-flex min-h-11 items-baseline gap-2"
                >
                  <span>{item.labelZh}</span>
                  <span lang="en" className="text-[0.65rem] font-medium tracking-[0.14em] uppercase">
                    {item.labelEn}
                  </span>
                </SectionLink>
              </li>
            ))}
          </ul>
        </nav>
        {social.length > 0 ? (
          <ul className="flex flex-col">
            {social.map((item) => (
              <li key={item.url}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center"
                >
                  {item.label}
                  <span className="sr-only">（另開新視窗）</span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div />
        )}
      </div>
      <div className="mx-auto max-w-[76rem] border-t border-cream/15 px-5 py-5 text-sm sm:px-8">
        <p>
          © {year} {label.nameEn} {label.nameZh}
        </p>
      </div>
    </footer>
  );
}
