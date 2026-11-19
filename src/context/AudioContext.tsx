"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (vol: number) => void;
  trackTitle: string;
}

const AudioContext = createContext<AudioContextType>({
  isPlaying: false,
  isMuted: false,
  volume: 0.28,
  togglePlay: () => {},
  toggleMute: () => {},
  setVolume: () => {},
  trackTitle: "Erik Satie — Gymnopédie No. 1",
});

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.28);
  const [mounted, setMounted] = useState(false);

  const trackTitle = "Erik Satie — Gymnopédie No. 1";

  // Smooth Volume Fade Utility
  const fadeVolume = useCallback(
    (
      audio: HTMLAudioElement,
      startVol: number,
      targetVol: number,
      durationMs: number,
      onComplete?: () => void
    ) => {
      const steps = 20;
      const stepTime = durationMs / steps;
      const volDelta = (targetVol - startVol) / steps;
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        const newVol = Math.max(0, Math.min(1, startVol + volDelta * currentStep));
        audio.volume = newVol;

        if (currentStep >= steps) {
          clearInterval(interval);
          audio.volume = targetVol;
          if (onComplete) onComplete();
        }
      }, stepTime);
    },
    []
  );

  // Start Playback with fade in
  const startPlayback = useCallback(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    audio.volume = 0;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setIsMuted(false);
        try {
          localStorage.setItem("decor_portfolio_sound_enabled", "true");
        } catch {
          // ignore
        }
        fadeVolume(audio, 0, volume, 600);
      })
      .catch((err) => {
        console.warn("Autoplay interaction required:", err);
      });
  }, [fadeVolume, volume]);

  // Pause with fade out
  const pausePlayback = useCallback(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    fadeVolume(audio, audio.volume, 0, 400, () => {
      audio.pause();
      setIsPlaying(false);
      try {
        localStorage.setItem("decor_portfolio_sound_enabled", "false");
      } catch {
        // ignore
      }
    });
  }, [fadeVolume]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pausePlayback();
    } else {
      startPlayback();
    }
  }, [isPlaying, pausePlayback, startPlayback]);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.muted = false;
      setIsMuted(false);
      fadeVolume(audioRef.current, 0, volume, 300);
    } else {
      fadeVolume(audioRef.current, audioRef.current.volume, 0, 300, () => {
        if (audioRef.current) {
          audioRef.current.muted = true;
          setIsMuted(true);
        }
      });
    }
  }, [isMuted, volume, fadeVolume]);

  const setVolume = useCallback((newVol: number) => {
    setVolumeState(newVol);
    if (audioRef.current && !audioRef.current.muted) {
      audioRef.current.volume = newVol;
    }
  }, []);

  // Mount & restore persisted preference
  useEffect(() => {
    setMounted(true);
    let savedPref: string | null = null;
    try {
      savedPref = localStorage.getItem("decor_portfolio_sound_enabled");
    } catch {
      // ignore
    }

    if (savedPref === "true") {
      const handleFirstInteraction = () => {
        startPlayback();
        document.removeEventListener("pointerdown", handleFirstInteraction);
        document.removeEventListener("keydown", handleFirstInteraction);
      };
      document.addEventListener("pointerdown", handleFirstInteraction, { once: true });
      document.addEventListener("keydown", handleFirstInteraction, { once: true });
    }
  }, [startPlayback]);

  // Keyboard shortcut: Press "M" to toggle sound
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInput =
        activeEl?.tagName === "INPUT" ||
        activeEl?.tagName === "TEXTAREA" ||
        activeEl?.getAttribute("contenteditable") === "true";
      if (isInput) return;

      if (e.key === "m" || e.key === "M") {
        if (isPlaying) {
          pausePlayback();
        } else {
          startPlayback();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, pausePlayback, startPlayback]);

  // Pause audio automatically when navigating into /admin
  useEffect(() => {
    if (pathname?.startsWith("/admin") && isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [pathname, isPlaying]);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isMuted,
        volume,
        togglePlay,
        toggleMute,
        setVolume,
        trackTitle,
      }}
    >
      <audio
        ref={audioRef}
        src="/audio/gymnopedie.mp3"
        loop
        preload="metadata"
        playsInline
      />
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);
