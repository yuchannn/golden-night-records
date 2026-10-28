import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { releases } from "@/lib/content";
import {
  artistName,
  getArtistById,
  getReleaseByListenSlug,
  releaseStory,
} from "@/lib/catalogue";
import { ListenView } from "@/components/listen-view";

export function generateStaticParams() {
  return releases.map((release) => ({ slug: release.listenSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const release = getReleaseByListenSlug(slug);
  const artist = release ? getArtistById(release.artistId) : undefined;
  if (!release || !artist) return { title: "找不到作品" };

  const title = `${release.title} · ${artistName(artist)}`;
  const description = releaseStory(release.description).line ?? release.title;
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

function ListenFallback() {
  return (
    <div className="mx-auto max-w-[76rem] px-5 py-24 sm:px-8">
      <p className="font-serif-tc text-2xl font-semibold">載入作品</p>
    </div>
  );
}

async function ListenContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const release = getReleaseByListenSlug(slug);
  const artist = release ? getArtistById(release.artistId) : undefined;
  if (!release || !artist) notFound();

  return <ListenView release={release} artist={artist} />;
}

export default function ListenPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<ListenFallback />}>
      <ListenContent params={params} />
    </Suspense>
  );
}
