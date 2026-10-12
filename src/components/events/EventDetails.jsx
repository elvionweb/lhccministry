import React from "react";
import { motion } from "framer-motion";
import EventRegistrationForm from "./EventRegistrationForm";

const Icon = ({ d }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 shrink-0"
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

const EventDetails = ({ event }) => {
  if (!event) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="overflow-hidden rounded-2xl border border-white/30 bg-white shadow-2xl sm:rounded-3xl"
    >
      {/* ---------- Banner ---------- */}
      {event.bannerImage && (
        <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9]">
          <img
            src={event.bannerImage}
            alt={event.title}
            loading="lazy"
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      )}

      <div className="p-5 sm:p-7 lg:p-9">
        {event.category && (
          <span className="mb-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
            {event.category}
          </span>
        )}

        <h2 className="mb-5 font-heading text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
          {event.title}
        </h2>

        {/* Info tiles */}
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-2xl bg-blue-50 p-3.5 text-blue-800 ring-1 ring-inset ring-blue-100">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-white shadow">
              <CalendarIcon />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-700/80">
                Date &amp; Time
              </p>
              <p className="break-words text-sm font-bold sm:text-base">
                {new Date(event.date).toLocaleDateString()} • {event.time}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3.5 text-gray-800 ring-1 ring-inset ring-gray-200">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-800 text-white shadow">
              <PinIcon />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                Location
              </p>
              <p className="break-words text-sm font-bold sm:text-base">
                {event.location}
              </p>
            </div>
          </div>
        </div>

        <h3 className="mb-2 text-sm font-bold uppercase tracking-widest text-gray-500">
          About this event
        </h3>
        <p className="whitespace-pre-line break-words font-body text-[15px] leading-7 text-gray-700 sm:text-base sm:leading-8">
          {event.description}
        </p>

        <EventRegistrationForm eventId={event._id} eventTitle={event.title} />
      </div>
    </motion.div>
  );
};

export default EventDetails;
