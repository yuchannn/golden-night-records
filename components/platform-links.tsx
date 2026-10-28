import type { ListeningLink } from "@/lib/content";
import { resolveListeningLinks } from "@/lib/urls";

export function PlatformLinks({ links }: { links: ListeningLink[] }) {
  const items = resolveListeningLinks(links);

  if (items.length === 0) {
    return <p className="basis-full text-base leading-7 text-ink-soft">收聽連結即將公布</p>;
  }

  return (
    <ul className="flex flex-wrap gap-3">
      {items.map((item) => (
        <li key={`${item.label}-${item.url}`}>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center border border-ink px-4 text-sm font-medium transition-colors hover:bg-ink hover:text-cream"
          >
            {item.label}
            <span className="sr-only">（另開新視窗）</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
