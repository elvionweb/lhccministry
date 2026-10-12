import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const Icon = ({ d }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 shrink-0"
  >
    <path d={d} />
  </svg>
);
const PinIcon = () => (
  <Icon d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
);
const CalendarIcon = () => (
  <Icon d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
);

/* `isActive` is optional and purely visual (highlights the selected card) */
const EventCard = ({ event, onSelect, isActive = false }) => {
  const reduce = useReducedMotion();

  // Smaller Cloudinary version for the card (never upscaled; unchanged if not a Cloudinary URL)
  const bannerSrc = event.bannerImage
    ? event.bannerImage.replace("/upload/", "/upload/c_limit,w_800,q_auto,f_auto/")
    : "";

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -4 }}
      onClick={() => onSelect(event)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(event);
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      className={`group relative w-full cursor-pointer overflow-hidden rounded-2xl border bg-white shadow-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
        isActive
          ? "border-blue-500 shadow-xl ring-2 ring-blue-500/60"
          : "border-white/30 hover:shadow-2xl"
      }`}
    >
      {/* ---------- Banner: the full image is always visible (no cropping) ---------- */}
      <div className="flex w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
        {event.bannerImage ? (
          <img
            src={bannerSrc}
            alt={event.title}
            loading="lazy"
            decoding="async"
            className="block h-auto max-h-52 w-full object-contain object-center sm:max-h-60 lg:max-h-64"
          />
        ) : (
          <div className="flex h-32 w-full items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-900 text-white/40">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-12 w-12"
            >
              <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
            </svg>
          </div>
        )}
      </div>

      {/* ---------- Body ---------- */}
      <div className="p-3.5 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 font-heading text-base font-semibold leading-snug text-gray-900 sm:text-lg">
            {event.title}
          </h3>
          {isActive && (
            <span className="mt-0.5 shrink-0 rounded-full bg-blue-700 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
              Viewing
            </span>
          )}
        </div>

        <p className="mt-2 flex items-center gap-2 text-xs font-medium text-blue-700 sm:text-sm">
          <CalendarIcon />
          <span className="min-w-0">
            {new Date(event.date).toLocaleDateString()} • {event.time}
          </span>
        </p>

        <p className="mt-1 flex items-start gap-2 text-xs text-gray-600 sm:text-sm">
          <span className="mt-0.5">
            <PinIcon />
          </span>
          <span className="min-w-0 break-words">{event.location}</span>
        </p>

        {(event.category || event.recurring) && (
          <div className="mt-2.5 flex flex-wrap gap-2">
            {event.category && (
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-800">
                {event.category}
              </span>
            )}
            {event.recurring && (
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                Recurring Event
              </span>
            )}
          </div>
        )}

        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-700 transition-transform duration-300 group-hover:translate-x-1 sm:text-sm">
          View details <span aria-hidden="true">→</span>
        </span>
      </div>
    </motion.div>
  );
};

export default EventCard;
