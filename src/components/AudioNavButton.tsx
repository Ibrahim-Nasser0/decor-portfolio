"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAudio } from "@/context/AudioContext";
import { Volume2, VolumeX, Volume1, Music, X, SlidersHorizontal, Sparkles } from "lucide-react";

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
      {/* Seamless Architectural Luxury Capsule */}
      <div
        className={`inline-flex items-center rounded-full transition-all duration-300 shadow-2xs group border ${
          isPlaying
            ? "bg-black text-white border-black hover:bg-neutral-900 shadow-xs"
            : "bg-white/95 text-neutral-800 border-neutral-300/90 hover:border-black hover:bg-neutral-50"
        }`}
      >
        {/* Main Clickable Area: Toggle Play / Pause */}
        <button
          type="button"
          onClick={togglePlay}
          className="flex items-center gap-2 pl-3 pr-2.5 sm:pl-3.5 sm:pr-3 py-1.5 sm:py-2 transition-all cursor-pointer select-none active:scale-95"
          title={isPlaying ? "Mute / Pause Ambient Music (Press M)" : "Play Ambient Music (Press M)"}
          aria-label={isPlaying ? "Pause Ambient Music" : "Play Ambient Music"}
        >
          {/* Animated 4-Bar Equalizer Waveform */}
          <div className="flex items-end gap-[2.5px] h-3.5 w-3.5 justify-center shrink-0" aria-hidden="true">
            <span
              className={`w-[2px] rounded-full transition-all duration-300 ${
                isPlaying
                  ? "bg-[#7AD1B8] animate-soundwave-1"
                  : "bg-neutral-400 group-hover:bg-neutral-600 h-[3px]"
              }`}
            />
            <span
              className={`w-[2px] rounded-full transition-all duration-300 ${
                isPlaying
                  ? "bg-white animate-soundwave-2"
                  : "bg-neutral-400 group-hover:bg-neutral-600 h-[3px]"
              }`}
            />
            <span
              className={`w-[2px] rounded-full transition-all duration-300 ${
                isPlaying
                  ? "bg-[#7AD1B8] animate-soundwave-3"
                  : "bg-neutral-400 group-hover:bg-neutral-600 h-[3px]"
              }`}
            />
            <span
              className={`w-[2px] rounded-full transition-all duration-300 ${
                isPlaying
                  ? "bg-white animate-soundwave-4"
                  : "bg-neutral-400 group-hover:bg-neutral-600 h-[3px]"
              }`}
            />
          </div>

          {/* Typography Label & Live State Indicator */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] sm:text-[11px] font-technical uppercase tracking-[0.16em] font-medium">
              Sound
            </span>

            {isPlaying ? (
              <span className="flex items-center gap-1 text-[9px] font-mono tracking-wider text-[#7AD1B8]">
                <span>ON</span>
                <span className="relative flex h-1.5 w-1.5" title="Live audio active">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7AD1B8] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#7AD1B8]"></span>
                </span>
              </span>
            ) : (
              <span className="text-[9px] font-mono text-neutral-400 font-normal">
                OFF
              </span>
            )}
          </div>
        </button>

        {/* Volume Settings Trigger Icon */}
        {showVolumeSlider && (
          <button
            type="button"
            onClick={() => setPopoverOpen(!popoverOpen)}
            className={`pr-2.5 sm:pr-3 pl-1 py-1.5 sm:py-2 transition-colors cursor-pointer flex items-center justify-center ${
              isPlaying
                ? "text-neutral-400 hover:text-white"
                : "text-neutral-400 hover:text-black"
            }`}
            title="Adjust Ambient Volume & Info"
            aria-label="Sound Settings"
          >
            <SlidersHorizontal className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Floating Monograph Settings Dropdown Popover */}
      {popoverOpen && (
        <div className="absolute top-full right-0 mt-2.5 z-50 bg-white/98 backdrop-blur-xl border border-neutral-300 p-4 rounded-md shadow-2xl w-64 sm:w-72 space-y-3.5 animate-in fade-in slide-in-from-top-2 duration-150 text-[#111111]">
          {/* Popover Header */}
          <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#7AD1B8]" />
              <span className="text-[10px] font-technical uppercase tracking-widest font-bold text-neutral-700">
                Atmosphere Audio
              </span>
            </div>
            <button
              type="button"
              onClick={() => setPopoverOpen(false)}
              className="text-neutral-400 hover:text-black transition-colors cursor-pointer p-0.5"
              aria-label="Close sound settings"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Track Monograph Information */}
          <div className="space-y-1 bg-neutral-50 p-2.5 border border-neutral-200/80 rounded-xs">
            <span className="text-[9px] font-technical uppercase tracking-widest text-neutral-400 block">
              Composition
            </span>
            <div className="text-xs font-editorial font-bold text-black truncate">
              {trackTitle}
            </div>
            <div className="text-[10px] font-technical text-neutral-500 uppercase tracking-wider">
              Acoustic Piano • Erik Satie
            </div>
          </div>

          {/* Interactive Volume Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] font-technical uppercase tracking-wider text-neutral-600">
              <span>Ambiance Volume</span>
              <span className="font-mono font-bold text-black bg-neutral-100 px-1.5 py-0.5 border border-neutral-200 rounded-xs">
                {Math.round(volume * 100)}%
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={toggleMute}
                className="text-neutral-600 hover:text-black transition-colors cursor-pointer p-1"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-red-600" />
                ) : volume < 0.5 ? (
                  <Volume1 className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.02"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-black"
                aria-label="Volume Slider"
              />
            </div>
          </div>

          {/* Quick Volume Preset Buttons */}
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            <button
              type="button"
              onClick={() => setVolume(0.15)}
              className={`py-1 text-[9px] font-technical uppercase tracking-wider border rounded-xs transition-colors cursor-pointer ${
                volume === 0.15 && !isMuted
                  ? "bg-black text-white border-black font-bold"
                  : "bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-700"
              }`}
            >
              Whisper
            </button>
            <button
              type="button"
              onClick={() => setVolume(0.35)}
              className={`py-1 text-[9px] font-technical uppercase tracking-wider border rounded-xs transition-colors cursor-pointer ${
                volume === 0.35 && !isMuted
                  ? "bg-black text-white border-black font-bold"
                  : "bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-700"
              }`}
            >
              Ambiance
            </button>
            <button
              type="button"
              onClick={() => setVolume(0.65)}
              className={`py-1 text-[9px] font-technical uppercase tracking-wider border rounded-xs transition-colors cursor-pointer ${
                volume === 0.65 && !isMuted
                  ? "bg-black text-white border-black font-bold"
                  : "bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-700"
              }`}
            >
              Audible
            </button>
          </div>

          {/* Footer Shortcut & Toggle */}
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] font-technical text-neutral-500">
            <button
              type="button"
              onClick={togglePlay}
              className="text-black hover:underline font-bold uppercase tracking-wider cursor-pointer"
            >
              {isPlaying ? "Pause Sound" : "Play Sound"}
            </button>
            <span className="font-mono text-[9px] text-neutral-400 bg-neutral-100 px-1 py-0.5 border border-neutral-200">
              Shortcut [M]
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
