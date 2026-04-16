"use client";

import { useState, useRef, useEffect } from "react";

interface SoundPlayerProps {
  url: string;
  title: string;
  duration?: string;
}

export default function SoundPlayer({ url, title, duration }: SoundPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [totalTime, setTotalTime] = useState(duration ?? "0:00");

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setCurrentTime(formatTime(audio.currentTime));
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };

    const onLoadedMetadata = () => {
      if (!duration) setTotalTime(formatTime(audio.duration));
    };

    const onEnded = () => setPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, [duration]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    audio.currentTime = pct * audio.duration;
  };

  return (
    <div className="border border-white/8 p-6 bg-ash">
      <audio ref={audioRef} src={url} preload="metadata" />

      <div className="flex items-center gap-6">
        {/* Play/Pause button */}
        <button
          onClick={togglePlay}
          className="w-12 h-12 border border-gold/40 hover:border-gold flex items-center justify-center flex-shrink-0 transition-colors duration-300 group"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <div className="flex gap-1">
              <div className="w-1 h-4 bg-gold" />
              <div className="w-1 h-4 bg-gold" />
            </div>
          ) : (
            <div
              className="w-0 h-0 ml-1"
              style={{
                borderTop: "7px solid transparent",
                borderBottom: "7px solid transparent",
                borderLeft: "12px solid #b8a882",
              }}
            />
          )}
        </button>

        {/* Progress bar and time */}
        <div className="flex-1">
          <div
            className="w-full h-px bg-white/10 cursor-pointer relative mb-3"
            onClick={handleSeek}
          >
            <div
              className="absolute top-0 left-0 h-full bg-gold transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-gold rounded-full"
              style={{ left: `${progress}%`, transform: "translate(-50%, -50%)" }}
            />
          </div>
          <div className="flex justify-between">
            <span className="font-mono text-[9px] tracking-[0.2em] text-silver/60">
              {currentTime}
            </span>
            <span className="font-mono text-[9px] tracking-[0.2em] text-silver/60">
              {totalTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
