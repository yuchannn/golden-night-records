import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { artists } from "@/lib/content";
import {
  artistName,
  getArtistBySlug,
  getOtherArtist,
  getReleasesByArtist,
} from "@/lib/catalogue";
import { ArtistProfile } from "@/components/artist-profile";

export function generateStaticParams() {
  return artists.map((artist) => ({ slug: artist.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) {
    return { title: "找不到藝人" };
  }

  const title = artistName(artist);
  return {
    title,
    description: artist.introduction,
    openGraph: {
      title,
      description: artist.introduction,
    },
  };
}

function ArtistFallback() {
  return (
    <div className="mx-auto max-w-[76rem] px-5 py-24 sm:px-8">
      <p className="font-serif-tc text-2xl font-semibold">載入藝人頁面</p>
    </div>
  );
}

async function ArtistContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) notFound();

  return (
    <ArtistProfile
      artist={artist}
      releases={getReleasesByArtist(artist.id)}
      other={getOtherArtist(artist.id)}
    />
  );
}

export default function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<ArtistFallback />}>
      <ArtistContent params={params} />
    </Suspense>
  );
}
