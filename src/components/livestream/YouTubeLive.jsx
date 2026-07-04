import { useState } from "react";

export default function YouTubeLive({ channelId }) {
  const [isLoaded, setIsLoaded] = useState(false);

  // 🔹 Fallback UI
  if (!channelId) {
    return (
      <div className="w-full aspect-video flex flex-col items-center justify-center bg-gray-900 rounded-[2rem] border border-white/10 shadow-2xl">
        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3 animate-pulse">
          <span className="text-red-500 text-2xl">●</span>
        </div>
        <p className="text-gray-400 font-black uppercase text-[10px] tracking-[0.3em]">
          No Live Stream Configured
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden shadow-2xl bg-black border border-white/5">
      {/* Loading UI */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-950 z-10">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500 font-bold text-[9px] uppercase tracking-widest">
              Connecting to Live Church Stream...
            </p>
          </div>
        </div>
      )}

      {/* 🔥 LIVE STREAM (AUTO DETECTS LIVE STATUS) */}
      <iframe
        className={`w-full h-full transition-all duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0 scale-105"
        }`}
        src={`https://www.youtube-nocookie.com/embed/live_stream?channel=${channelId}&autoplay=1&rel=0&modestbranding=1`}
        title="Church Live Stream"
        onLoad={() => setIsLoaded(true)}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}


















