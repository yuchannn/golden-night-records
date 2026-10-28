"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Artist, Release } from "@/lib/content";
import { artistName } from "@/lib/catalogue";
import { isAudioSource, spotifyTrackEmbedUrl } from "@/lib/urls";
import { AudioPlayer } from "@/components/audio-player";
import { CoverArt } from "@/components/cover-art";
import { PlatformLinks } from "@/components/platform-links";

function SpotifyEmbed({
  links,
  title,
}: {
  links: Release["listeningLinks"];
  title: string;
}) {
  const embeds = links
    .map((link) => (link.service === "spotify" ? spotifyTrackEmbedUrl(link.url) : null))
    .filter((src): src is string => Boolean(src));

  if (embeds.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {embeds.map((src) => (
        <iframe
          key={src}
          src={src}
          title={`在 Spotify 聆聽〈${title}〉`}
          width="100%"
          height={152}
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className="w-full rounded-sm border-0"
        />
      ))}
    </div>
  );
}

export function ReleaseDialog({
  release,
  artist,
  trigger,
  onClose,
}: {
  release: Release | null;
  artist: Artist | null;
  trigger: HTMLElement | null;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (release && artist && !dialog.open) {
      dialog.showModal();
    }
    if ((!release || !artist) && dialog.open) {
      dialog.close();
    }
  }, [artist, release]);

  function handleClose() {
    onClose();
    const opener = trigger;
    queueMicrotask(() => {
      if (opener && document.activeElement === document.body) {
        opener.focus();
      }
    });
  }

  const titleId = "release-dialog-title";
  const name = artist ? artistName(artist) : "";

  return (
    <dialog
      ref={dialogRef}
      className="gnr-dialog"
      aria-labelledby={release ? titleId : undefined}
      onClose={handleClose}
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        event.preventDefault();
        dialogRef.current?.close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          dialogRef.current?.close();
        }
      }}
    >
      {release && artist ? (
        <div className="grid md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div className="flex items-center justify-center bg-[#ebe6da] p-4 sm:p-6">
            <div className="w-full">
              <CoverArt
                release={release}
                artistName={name}
                sizes="(min-width: 768px) 420px, 90vw"
              />
            </div>
          </div>
          <div className="flex flex-col p-5 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <p className="pt-3 font-sans text-xs font-medium tracking-[0.2em] text-ink-soft">
                金宵選曲
              </p>
              <button
                type="button"
                className="inline-flex min-h-11 items-center border border-ink px-4 text-sm font-medium"
                onClick={() => dialogRef.current?.close()}
              >
                關閉
              </button>
            </div>
            <h2 id={titleId} className="mt-6 font-serif-tc text-4xl font-semibold leading-tight sm:text-5xl">
              {release.title}
            </h2>
            <p className="mt-3 text-base">{name}</p>
            {release.type || release.date ? (
              <p className="mt-3 text-sm text-ink-soft">
                {[release.type, release.date].filter(Boolean).join(" · ")}
              </p>
            ) : null}
            {release.description ? (
              <p className="mt-6 max-w-prose whitespace-pre-line text-base leading-8">
                {release.description}
              </p>
            ) : null}
            <div className="mt-8 flex flex-col gap-6">
              {isAudioSource(release.audio) ? (
                <AudioPlayer src={release.audio} title={release.title} />
              ) : null}
              <SpotifyEmbed links={release.listeningLinks} title={release.title} />
              <div className="flex flex-wrap items-center gap-3">
                <PlatformLinks links={release.listeningLinks} />
                <Link
                  href={`/artists/${artist.slug}`}
                  className="inline-flex min-h-11 items-center bg-ink px-4 text-sm font-medium text-cream transition-colors hover:bg-burgundy"
                  onClick={() => dialogRef.current?.close()}
                >
                  前往藝人頁面
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
