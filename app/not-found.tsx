import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "找不到頁面",
  description: "這個網址不在金宵唱片的目錄裡。",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[76rem] flex-col justify-center px-5 py-24 sm:px-8">
      <p lang="en" className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-ink-soft">
        404
      </p>
      <h1 className="mt-4 font-serif-tc text-5xl font-semibold leading-tight sm:text-6xl">
        找不到這個頁面
      </h1>
      <p className="mt-6 max-w-md text-lg leading-8">這個網址不在金宵唱片的目錄裡。</p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-11 w-fit items-center bg-ink px-5 text-sm font-medium text-cream"
      >
        返回首頁
      </Link>
    </div>
  );
}
