import type { ExternalLink, ListeningLink, ListeningService } from "@/lib/content";

const listeningLabels: Record<Exclude<ListeningService, "other">, string> = {
  spotify: "在 Spotify 聆聽",
  "apple-music": "在 Apple Music 聆聽",
  youtube: "在 YouTube 聆聽",
};

export function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function isEmail(value: string | null | undefined): value is string {
  if (!value) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function getSiteUrl(value: string | null): URL | null {
  if (!value || !isHttpUrl(value)) return null;
  return new URL(value);
}

export function isAudioSource(value: string | null): value is string {
  if (!value) return false;
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  return isHttpUrl(value);
}

function isSearchDestination(url: URL): boolean {
  const path = url.pathname.toLowerCase();
  if (path.includes("/search") || path.includes("/results")) return true;
  return (
    url.searchParams.has("search_query") ||
    url.searchParams.has("q") ||
    url.searchParams.has("query")
  );
}

function matchesHost(url: URL, hosts: string[]): boolean {
  return hosts.some(
    (host) => url.hostname === host || url.hostname.endsWith(`.${host}`),
  );
}

function isVerifiedListeningUrl(link: ListeningLink): boolean {
  if (!isHttpUrl(link.url)) return false;
  const url = new URL(link.url);
  if (isSearchDestination(url)) return false;

  if (link.service === "spotify") {
    return matchesHost(url, ["open.spotify.com"]);
  }
  if (link.service === "apple-music") {
    return matchesHost(url, ["music.apple.com"]);
  }
  if (link.service === "youtube") {
    return matchesHost(url, ["youtube.com", "youtu.be", "music.youtube.com"]);
  }
  return true;
}

export function resolveExternalLinks(links: ExternalLink[]): ExternalLink[] {
  return links.filter((link) => link.label.trim() && isHttpUrl(link.url) && !isSearchDestination(new URL(link.url)));
}

export function spotifyTrackEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "open.spotify.com") return null;
    const match = parsed.pathname.match(/^\/(?:embed\/)?track\/([A-Za-z0-9]+)$/);
    if (!match) return null;
    return `https://open.spotify.com/embed/track/${match[1]}`;
  } catch {
    return null;
  }
}

export function resolveListeningLinks(
  links: ListeningLink[],
): Array<{ url: string; label: string }> {
  const resolved: Array<{ url: string; label: string }> = [];

  for (const link of links) {
    if (!isVerifiedListeningUrl(link)) continue;
    const label =
      link.label?.trim() ||
      (link.service === "other" ? "" : listeningLabels[link.service]);
    if (!label) continue;
    resolved.push({ url: link.url, label });
  }

  return resolved;
}
