import Image from "next/image";
import Link from "next/link";
import { label } from "@/lib/content";
import { cx } from "@/lib/cx";

export function Wordmark({ inverted = false }: { inverted?: boolean }) {
  const color = inverted ? "text-cream" : "text-ink";
  const logo = inverted && label.logoOnDark ? label.logoOnDark : label.logo;

  if (logo) {
    return (
      <Link href="/" className="inline-flex min-h-11 shrink-0 items-center motion-safe:transition-transform motion-safe:hover:-translate-y-0.5">
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          priority={!inverted}
          sizes={inverted ? "(min-width: 640px) 192px, 168px" : "(min-width: 1024px) 168px, 120px"}
          className={inverted ? "h-14 w-auto sm:h-16" : "h-10 w-auto sm:h-12 lg:h-14"}
        />
      </Link>
    );
  }

  return (
    <Link href="/" className={cx("inline-flex min-h-11 flex-col justify-center leading-none", color)}>
      <span className="font-serif-tc text-[1.15rem] font-semibold tracking-[0.16em] sm:text-[1.35rem] sm:tracking-[0.2em]">
        {label.nameZh}
      </span>
      <span
        lang="en"
        className="mt-1 font-sans text-[0.58rem] font-medium tracking-[0.22em] sm:text-[0.62rem] sm:tracking-[0.26em]"
      >
        GOLDEN NIGHT
      </span>
    </Link>
  );
}
