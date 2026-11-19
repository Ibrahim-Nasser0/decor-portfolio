"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAudio } from "@/context/AudioContext";
import { Volume2, VolumeX, Volume1, Music, X, SlidersHorizontal } from "lucide-react";

interface AudioNavButtonProps {
  className?: string;
  showVolumeSlider?: boolean;
}

export default function AudioNavButton({ className = "", showVolumeSlider = true }: AudioNavButtonProps) {
  const { isPlaying, isMuted, volume, togglePlay, toggleMute, setVolume, trackTitle } = useAudio();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setPopoverOpen(false);
      }
    };
    if (popoverOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [popoverOpen]);

  return (
    <div ref={containerRef} className={`relative inline-flex items-center ${className}`}>
      {/* Main Sound Toggle Pill */}
      <div className="inline-flex items-center rounded-sm border border-neutral-300 hover:border-black bg-white transition-all duration-200 shadow-2xs group">
        <button
          type="button"
          onClick={togglePlay}
          className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 text-black transition-colors cursor-pointer active:scale-95"
          title={isPlaying ? "Mute / Pause Ambient Music (Press M)" : "Play Ambient Music (Press M)"}
          aria-label={isPlaying ? "Pause Ambient Music" : "Play Ambient Music"}
        >
          {/* Animated 4-Bar Equalizer */}
          <div className="flex items-end gap-[2px] h-3.5 w-3.5 justify-center" aria-hidden="true">
            <span
              className={`w-[2px] bg-black rounded-full transition-all duration-300 ${
                isPlaying ? "animate-soundwave-1" : "h-[3px] opacity-40"
              }`}
            />
            <span
              className={`w-[2px] bg-black rounded-full transition-all duration-300 ${
                isPlaying ? "animate-soundwave-2" : "h-[3px] opacity-40"
              }`}
            />
            <span
              className={`w-[2px] bg-black rounded-full transition-all duration-300 ${
                isPlaying ? "animate-soundwave-3" : "h-[3px] opacity-40"
              }`}
            />
            <span
              className={`w-[2px] bg-black rounded-full transition-all duration-300 ${
                isPlaying ? "animate-soundwave-4" : "h-[3px] opacity-40"
              }`}
            />
          </div>

          {/* Label */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] sm:text-[11px] font-technical uppercase tracking-[0.14em] font-medium">
              Sound
            </span>
            {isPlaying ? (
              <span className="relative flex h-1.5 w-1.5" title="Playing">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7AD1B8] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#7AD1B8]"></span>
              </span>
            ) : (
              <span className="text-[9px] font-mono text-neutral-400 font-normal">
                Off
              </span>
            )}
          </div>
        </button>

        {/* Volume Settings Opener */}
        {showVolumeSlider && (
          <>
            <span className="h-3 w-px bg-neutral-200" aria-hidden="true" />
            <button
              type="button"
              onClick={() => setPopoverOpen(!popoverOpen)}
              className="px-1.5 py-1.5 sm:py-2 text-neutral-500 hover:text-black transition-colors cursor-pointer"
              title="Volume Controls"
              aria-label="Sound Settings"
            >
              <SlidersHorizontal className="w-3 h-3" />
            </button>
          </>
        )}
      </div>

      {/* Floating Settings Dropdown Popover */}
      {popoverOpen && (
        <div className="absolute top-full right-0 mt-2 z-50 bg-white/95 backdrop-blur-md border border-neutral-300 p-3.5 rounded-sm shadow-xl w-60 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150 text-black">
          <div className="flex items-center justify-between pb-1.5 border-b border-neutral-200">
            <div className="flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-black" />
              <span className="text-[10px] font-technical uppercase tracking-widest font-bold">
                Atmosphere Audio
              </span>
            </div>
            <button
              type="button"
              onClick={() => setPopoverOpen(false)}
              className="text-neutral-400 hover:text-black transition-colors cursor-pointer p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          {/* Track Name */}
          <div className="space-y-0.5">
            <div className="text-[11px] font-editorial font-bold text-black truncate">
              {trackTitle}
            </div>
            <div className="text-[9px] font-technical text-neutral-500 uppercase tracking-wider">
              Erik Satie • Classical Piano
            </div>
          </div>

          {/* Volume Control */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] font-technical uppercase tracking-wider text-neutral-600">
              <span>Volume</span>
              <span className="font-mono font-bold text-black">{Math.round(volume * 100)}%</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleMute}
                className="text-neutral-600 hover:text-black cursor-pointer"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-3.5 h-3.5 text-red-600" />
                ) : volume < 0.5 ? (
                  <Volume1 className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.02"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-black"
                aria-label="Volume Slider"
              />
            </div>
          </div>

          {/* Quick Tip */}
          <div className="pt-1.5 border-t border-neutral-100 flex items-center justify-between text-[9px] font-technical text-neutral-400">
            <span>Toggle anywhere</span>
            <span className="font-mono bg-neutral-100 px-1 py-0.5 border border-neutral-200 text-neutral-700">
              [M] Key
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
