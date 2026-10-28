"use client";

import { useEffect, useRef, useState, type TransitionEvent } from "react";
import { heroReleaseIds } from "@/lib/content";
import { artistName, getArtistById, getReleaseById } from "@/lib/catalogue";
import { CoverArt } from "@/components/cover-art";
import { ReleaseDialog } from "@/components/release-dialog";

const COPIES = 3;

function normalize(index: number, count: number) {
  let next = index;
  while (next >= count * 2) next -= count;
  while (next < count) next += count;
  return next;
}

function useVisibleCount() {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const tablet = window.matchMedia("(min-width: 640px)");
    const update = () => setCount(desktop.matches ? 3 : tablet.matches ? 2 : 1);
    update();
    desktop.addEventListener("change", update);
    tablet.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      tablet.removeEventListener("change", update);
    };
  }, []);

  return count;
}

export function HeroArtwork() {
  const sleeves = heroReleaseIds.flatMap((id) => {
    const release = getReleaseById(id);
    const artist = release ? getArtistById(release.artistId) : undefined;
    return release && artist ? [{ release, artist }] : [];
  });
  const count = sleeves.length;
  const visible = useVisibleCount();
  const [index, setIndex] = useState(count);
  const [snap, setSnap] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);
  const drag = useRef({ x: 0, active: false, dragged: false });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduceMotion || paused || activeId || count === 0) return;
    const timer = window.setInterval(() => setIndex((current) => current + 1), 7000);
    return () => window.clearInterval(timer);
  }, [activeId, count, paused, reduceMotion]);

  useEffect(() => {
    if (!snap) return;
    const frame = requestAnimationFrame(() => setSnap(false));
    return () => cancelAnimationFrame(frame);
  }, [snap]);

  if (count === 0) return null;

  const track = Array.from({ length: COPIES }, () => sleeves).flat();
  const position = (index % count) + 1;
  const active = sleeves.find((sleeve) => sleeve.release.id === activeId) ?? null;

  function settle(event: TransitionEvent<HTMLUListElement>) {
    if (event.target !== event.currentTarget || event.propertyName !== "transform") return;
    setIndex((current) => {
      const next = normalize(current, count);
      if (next !== current) setSnap(true);
      return next;
    });
  }

  return (
    <>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="今晚的唱片"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            setIndex((current) => current + 1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            setIndex((current) => current - 1);
          }
        }}
      >
        <div
          className="overflow-hidden py-3 touch-pan-y"
          onPointerDown={(event) => {
            if (event.pointerType === "mouse" && event.button !== 0) return;
            drag.current = { x: event.clientX, active: true, dragged: false };
          }}
          onPointerMove={(event) => {
            const gesture = drag.current;
            if (!gesture.active) return;
            if (Math.abs(event.clientX - gesture.x) < 12) return;
            gesture.dragged = true;
            if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.setPointerCapture(event.pointerId);
            }
          }}
          onPointerUp={(event) => {
            const gesture = drag.current;
            if (!gesture.active) return;
            const distance = event.clientX - gesture.x;
            gesture.active = false;
            if (gesture.dragged && Math.abs(distance) > 48) {
              setIndex((current) => current + (distance < 0 ? 1 : -1));
            }
          }}
          onClickCapture={(event) => {
            if (!drag.current.dragged) return;
            event.preventDefault();
            event.stopPropagation();
            drag.current.dragged = false;
          }}
        >
          <ul
            className="flex"
            style={{
              width: `${(track.length / visible) * 100}%`,
              transform: `translate3d(-${(index * 100) / track.length}%, 0, 0)`,
              transition: snap || reduceMotion ? "none" : "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            onTransitionEnd={settle}
          >
            {track.map(({ release, artist }, trackIndex) => {
              const name = artistName(artist);
              const shown = trackIndex >= index && trackIndex < index + visible;
              return (
                <li
                  key={`${release.id}-${trackIndex}`}
                  aria-hidden={shown ? undefined : true}
                  className="px-2.5 sm:px-3"
                  style={{ width: `${100 / track.length}%` }}
                >
                  <figure>
                    <button
                      type="button"
                      tabIndex={shown ? 0 : -1}
                      className="sleeve-button block w-full cursor-pointer border-0 bg-transparent p-0 text-left"
                      aria-haspopup="dialog"
                      aria-label={`查看作品：${release.title}`}
                      onClick={(event) => {
                        setTrigger(event.currentTarget);
                        setActiveId(release.id);
                      }}
                    >
                      <CoverArt
                        release={release}
                        artistName={name}
                        priority={trackIndex === count}
                        sizes="(min-width: 1024px) 24rem, (min-width: 640px) 40vw, 86vw"
                      />
                    </button>
                    <figcaption className="mt-3">
                      <p className="font-serif-tc text-lg font-semibold leading-tight">{release.title}</p>
                      <p className="mt-1 text-sm text-ink-soft">{name}</p>
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="font-sans text-sm text-ink-soft" aria-live="polite">
            <span className="sr-only">
              第 {position} 首，共 {count} 首
            </span>
            <span aria-hidden="true">
              {String(position).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center border border-ink/25 text-lg transition-colors hover:border-ink"
              aria-label="上一張"
              onClick={() => setIndex((current) => current - 1)}
            >
              ←
            </button>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center border border-ink/25 text-lg transition-colors hover:border-ink"
              aria-label="下一張"
              onClick={() => setIndex((current) => current + 1)}
            >
              →
            </button>
          </div>
        </div>
      </div>
      <ReleaseDialog
        release={active?.release ?? null}
        artist={active?.artist ?? null}
        trigger={trigger}
        onClose={() => setActiveId(null)}
      />
    </>
  );
}
