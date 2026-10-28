"use client";

import { useEffect, useState } from "react";
import { chapters } from "@/lib/content";
import { cx } from "@/lib/cx";
import { SectionLink } from "@/components/section-link";

export function ChapterRail() {
  const [current, setCurrent] = useState<string>(chapters[0].id);

  useEffect(() => {
    const sections = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((section): section is HTMLElement => Boolean(section));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setCurrent(visible.target.id);
      },
      { rootMargin: "-28% 0px -52% 0px", threshold: [0.15, 0.4, 0.7] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="故事章節"
      className="fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 min-[1400px]:block"
    >
      <ol className="flex flex-col gap-2">
        {chapters.map((chapter) => {
          const active = current === chapter.id;
          return (
            <li key={chapter.id} className="relative">
              <SectionLink
                id={chapter.id}
                current={active}
                className="group flex min-h-11 min-w-11 items-center justify-end"
              >
                <span
                  className="pointer-events-none absolute right-14 max-w-48 bg-cream px-3 py-2 text-left text-xs leading-5 text-ink opacity-0 shadow-[0_8px_24px_-16px_rgba(37,52,41,0.45)] motion-safe:transition-opacity motion-safe:duration-500 motion-safe:ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  {chapter.line}
                </span>
                <span
                  className={cx(
                    "flex h-11 w-11 items-center justify-center border font-serif-tc text-lg transition-colors duration-500",
                    active
                      ? "border-ink bg-ink text-cream"
                      : "border-gold/50 bg-cream text-ink",
                  )}
                >
                  <span className="sr-only">{chapter.en} </span>
                  {chapter.mark}
                </span>
              </SectionLink>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function ReadingBookmark() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(1, window.scrollY / height) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 bottom-0 left-0 z-40 hidden w-1 bg-gold/25 md:block"
    >
      <div className="w-full bg-gold" style={{ height: `${progress * 100}%` }} />
    </div>
  );
}
