"use client";

import { useRef, useState } from "react";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setPlaying((v) => !v);
  }

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src="/audio/harvest-theme-loop.mp3" loop preload="none" />
      <div className="fixed right-4 bottom-4 z-30">
        <button
          onClick={toggle}
          className="wood-box wood-box-interactive flex h-10 w-10 cursor-pointer items-center justify-center bg-surface text-[16px] text-foreground"
          aria-label={playing ? "Pause background music" : "Play background music"}
          title={playing ? "Pause music" : "Play music"}
        >
          {playing ? "⏸" : "♪"}
        </button>
      </div>
    </>
  );
}
