import React from "react";
import { motion } from "framer-motion";

const ShareIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13" />
  </svg>
);

const SermonPlayer = ({ sermon }) => {
  if (!sermon) return null;

  // 🔹 Professional logic: Extract ID from any YouTube link (watch?v= or youtu.be/)
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url?.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeId(sermon.videoUrl);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-2xl border border-white/30 bg-white shadow-2xl sm:rounded-3xl"
    >
      {/* Video */}
      <div className="relative aspect-video w-full bg-black">
        {videoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            loading="lazy"
            title={sermon.title}
            className="absolute left-0 top-0 h-full w-full"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-gray-900 to-black px-4 text-center text-white">
            <span className="text-3xl" aria-hidden="true">
              ⚠️
            </span>
            <p className="text-xs font-bold uppercase tracking-widest">
              Invalid Video Link
            </p>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-5 text-left sm:p-7 lg:p-8">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-amber-600">
          Now Playing
        </p>

        <h2 className="mb-4 font-heading text-xl font-semibold leading-snug tracking-tight text-gray-900 sm:text-2xl md:text-3xl">
          {sermon.title}
        </h2>

        <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-bold uppercase tracking-widest text-blue-700 sm:gap-x-4">
          <span className="flex items-center gap-2">
            {sermon.preacher || sermon.speaker}
          </span>
          <span className="h-1 w-1 rounded-full bg-gray-400" />
          <span>{sermon.date}</span>
          {sermon.series && (
            <>
              <span className="h-1 w-1 rounded-full bg-gray-400" />
              <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">
                {sermon.series}
              </span>
            </>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 items-center sm:justify-center">
          <button className="inline-flex w-54 items-center justify-center gap-2 rounded-2xl bg-blue-700 px-8 py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 active:scale-95 sm:w-auto sm:py-4">
            <ShareIcon />
            Share Sermon
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SermonPlayer;