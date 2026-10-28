"use client";

import { useEffect, useRef, useState } from "react";

let activeAudio: HTMLAudioElement | null = null;

export function AudioPlayer({ src, title }: { src: string; title: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [status, setStatus] = useState<"paused" | "playing" | "error">("paused");

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (!audio) return;
      audio.pause();
      if (activeAudio === audio) activeAudio = null;
    };
  }, []);

  async function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (status === "playing") {
      audio.pause();
      return;
    }

    if (activeAudio && activeAudio !== audio) {
      activeAudio.pause();
    }
    activeAudio = audio;
    setStatus("paused");

    try {
      await audio.play();
    } catch {
      setStatus("error");
    }
  }

  const playing = status === "playing";

  return (
    <div>
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        className="sr-only"
        onPlay={() => setStatus("playing")}
        onPause={() => setStatus((current) => (current === "error" ? current : "paused"))}
        onEnded={() => setStatus("paused")}
        onError={() => setStatus("error")}
      />
      <button
        type="button"
        onClick={toggle}
        className="inline-flex min-h-11 items-center border border-ink px-4 text-sm font-medium"
        aria-pressed={playing}
      >
        {playing ? "暫停" : "播放"}
        <span className="sr-only">{title}</span>
      </button>
      {status === "error" ? (
        <p role="alert" className="mt-3 text-sm text-burgundy">
          目前無法播放這段音訊。
        </p>
      ) : null}
    </div>
  );
}
