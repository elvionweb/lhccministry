import React, { useState, useEffect } from "react";
import EventCard from "../components/events/EventCard";
import EventDetails from "../components/events/EventDetails";
import { fetchEvents } from "../utils/api";
import { motion } from "framer-motion";

/* Fixed background layers (iOS-safe replacement for background-attachment: fixed) */
const Background = () => (
  <>
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/lhcc29.jpeg')" }}
    />
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/60 to-black/85"
    />
  </>
);

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 4;

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetchEvents();
        const data =
          response?.docs ||
          response?.data ||
          (Array.isArray(response) ? response : []);
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  if (loading) {
    return (
      <section className="relative isolate flex min-h-screen items-center justify-center pt-20">
        <Background />
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-amber-300" />
          <p className="text-sm font-medium tracking-wide text-white/80">
            Loading events…
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative isolate min-h-screen overflow-x-hidden">
      <Background />

      <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pb-20 md:pt-28 lg:px-8">
        {/* ---------- Header ---------- */}
        <header className="mx-auto mb-8 max-w-3xl text-center md:mb-12">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300 sm:text-sm"
          >
            Join Us
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
            viewport={{ once: true }}
            className="mt-2 font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
          >
            Events
          </motion.h1>

          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-amber-300" />
        </header>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
          {/* ---------- Events list ---------- */}
          <div className="order-2 min-w-0 space-y-4 lg:order-1 lg:col-span-5 xl:col-span-4">
            {events.length > 0 ? (
              events
                .slice(
                  (currentPage - 1) * eventsPerPage,
                  currentPage * eventsPerPage
                )
                .map((event) => (
                  <EventCard
                    key={event._id || event.id}
                    event={event}
                    onSelect={setSelectedEvent}
                    isActive={
                      !!selectedEvent &&
                      (selectedEvent._id || selectedEvent.id) ===
                        (event._id || event.id)
                    }
                  />
                ))
            ) : (
              <div className="rounded-2xl border border-dashed border-white/30 bg-white/10 p-8 text-center text-white/80 backdrop-blur">
                No events found.
              </div>
            )}

            {/* Pagination Controls */}
            {events.length > eventsPerPage && (
              <div className="mt-6 flex items-center justify-between gap-2 rounded-2xl border border-white/30 bg-white/85 p-2.5 shadow-lg backdrop-blur-md">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`rounded-xl px-3 py-2 text-sm font-semibold transition-all sm:px-4 ${
                    currentPage === 1
                      ? "pointer-events-none invisible"
                      : "bg-blue-700 text-white shadow-md hover:bg-blue-600 active:scale-95"
                  }`}
                >
                  &larr; Previous
                </button>

                <span className="text-center text-xs font-semibold text-gray-700 sm:text-sm">
                  Page {currentPage} of {Math.ceil(events.length / eventsPerPage)}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, Math.ceil(events.length / eventsPerPage))
                    )
                  }
                  disabled={
                    currentPage === Math.ceil(events.length / eventsPerPage)
                  }
                  className={`rounded-xl px-3 py-2 text-sm font-semibold transition-all sm:px-4 ${
                    currentPage === Math.ceil(events.length / eventsPerPage)
                      ? "pointer-events-none invisible"
                      : "bg-blue-700 text-white shadow-md hover:bg-blue-600 active:scale-95"
                  }`}
                >
                  Next &rarr;
                </button>
              </div>
            )}
          </div>

          {/* ---------- Event details (shown first on small screens) ---------- */}
          <div className="order-1 min-w-0 lg:order-2 lg:col-span-7 xl:col-span-8">
            {selectedEvent ? (
              <EventDetails event={selectedEvent} />
            ) : (
              <div className="hidden rounded-3xl border border-dashed border-white/30 bg-white/10 p-16 text-center text-white/80 backdrop-blur lg:block">
                Select an event to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;