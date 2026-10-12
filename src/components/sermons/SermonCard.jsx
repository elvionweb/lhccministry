import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const PlayIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l11-6.86a1 1 0 0 0 0-1.7l-11-6.86A1 1 0 0 0 8 5.14z" />
  </svg>
);

/* `isActive` is optional and purely visual (highlights the playing card) */
const SermonCard = ({ sermon, onSelect, isActive = false }) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      whileHover={reduce ? undefined : { x: 4 }}
      onClick={() => onSelect(sermon)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(sermon);
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      className={`group relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-2xl border p-3 shadow-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:gap-4 sm:p-4 ${
        isActive
          ? "border-blue-500 bg-white shadow-xl ring-2 ring-blue-500/60"
          : "border-white/30 bg-white/90 hover:bg-white hover:shadow-xl"
      }`}
    >
      {/* active accent bar */}
      <span
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-blue-500 to-indigo-700 transition-opacity ${
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
        }`}
      />

      {/* play badge */}
      <span
        aria-hidden="true"
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-md transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14 ${
          isActive
            ? "bg-gradient-to-br from-blue-500 to-indigo-700"
            : "bg-gradient-to-br from-blue-600 to-indigo-800"
        }`}
      >
        <PlayIcon />
      </span>

      <div className="min-w-0 flex-1">
        {isActive && (
          <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-blue-700">
            Now playing
          </p>
        )}
        <h3 className="line-clamp-2 font-heading text-base font-semibold leading-snug text-gray-900 sm:text-lg">
          {sermon.title}
        </h3>
        <p className="mt-1 truncate text-sm font-medium text-gray-700">
          {sermon.speaker}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
          <span>{sermon.date}</span>
          {sermon.series && (
            <span className="rounded-full bg-blue-50 px-2 py-0.5 font-semibold text-blue-700">
              {sermon.series}
            </span>
          )}
        </div>
      </div>

      <span
        aria-hidden="true"
        className="hidden shrink-0 text-sm font-semibold text-blue-700 transition-transform duration-300 group-hover:translate-x-1 sm:inline"
      >
        Watch →
      </span>
    </motion.div>
  );
};

export default SermonCard;