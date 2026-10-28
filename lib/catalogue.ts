import { artists, label, releases, type Artist, type Release } from "@/lib/content";
import { getSiteUrl, isEmail, resolveExternalLinks } from "@/lib/urls";

export function getArtistById(id: string): Artist | undefined {
  return artists.find((artist) => artist.id === id);
}

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find((artist) => artist.slug === slug);
}

export function getOtherArtist(id: string): Artist | undefined {
  return artists.find((artist) => artist.id !== id);
}

export function getFeaturedReleases(): Release[] {
  return [...releases].sort((a, b) => a.featuredOrder - b.featuredOrder);
}

export function getReleaseById(id: string): Release | undefined {
  return releases.find((release) => release.id === id);
}

export function getReleaseByListenSlug(slug: string): Release | undefined {
  return releases.find((release) => release.listenSlug === slug);
}

export function listenPath(release: Release): string {
  return `/listen/${release.listenSlug}`;
}

/** First sentence is the landing line. Everything after it is the longer note. */
export function releaseStory(description: string | null): {
  line: string | null;
  rest: string | null;
} {
  const text = description?.trim();
  if (!text) return { line: null, rest: null };
  const match = text.match(/^([\s\S]+?[。？！]」?)([\s\S]*)$/);
  if (!match) return { line: text, rest: null };
  const rest = match[2].replace(/^\s+/, "").trim();
  return { line: match[1].trim(), rest: rest || null };
}

export function getReleasesByArtist(artistId: string): Release[] {
  return getFeaturedReleases().filter((release) => release.artistId === artistId);
}

export function artistName(artist: Artist): string {
  return `${artist.nameEn} ${artist.nameZh}`;
}

export function getContactEmail(): string | null {
  return isEmail(label.email) ? label.email.trim() : null;
}

export function getSocialLinks() {
  return resolveExternalLinks(label.social);
}

export function getConfiguredSiteUrl(): URL | null {
  return getSiteUrl(label.siteUrl);
}
