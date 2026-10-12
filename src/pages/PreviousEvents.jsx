import React, { useState, useEffect } from "react";
import EventCard from "../components/events/EventCard";
import EventDetails from "../components/events/EventDetails";
import { fetchEvents } from "../utils/api";
import { motion } from "framer-motion";

/* One fixed layer (photo + dark gradient together), kept on its own GPU layer
   so scrolling doesn't repaint it. */
const Background = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 -z-10 transform-gpu bg-cover bg-center bg-no-repeat will-change-transform"
    style={{
      backgroundImage:
        "linear-gradient(rgba(0,0,0,0.72), rgba(0,0,0,0.78)), url('/lhcc3.jpeg')",
    }}
  />
);

const PreviousEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetchEvents();
        const data =
          response?.docs ||
          response?.data ||
          (Array.isArray(response) ? response : []);
          
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        const pastEvents = data.filter((e) => {
          const eventDate = new Date(e.date);
          const startOfEventDate = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
          const diffDays = Math.floor((startOfToday.getTime() - startOfEventDate.getTime()) / (1000 * 60 * 60 * 24));
          return diffDays >= 1; // Show only past events that are 1 day or more past
        }).sort((a, b) => new Date(b.date) - new Date(a.date));

        setEvents(pastEvents);
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
            Loading previous events…
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
            Look Back
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
            viewport={{ once: true }}
            className="mt-2 font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
          >
            Previous Events
          </motion.h1>

          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-amber-300" />
        </header>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
          {/* ---------- Events list (below the details on small screens) ---------- */}
          <div className="order-2 min-w-0 lg:order-1 lg:col-span-5 xl:col-span-4">
            {events.length > 0 && (
              <div className="mb-3 flex items-center justify-between px-1">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-white/80">
                  Past Events
                </h2>
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                  {events.length}
                </span>
              </div>
            )}

            {/* Inner scrolling only on large screens, so phones scroll the page normally */}
            <div className="space-y-4 pb-1 lg:max-h-[calc(100vh-11rem)] lg:overflow-y-auto lg:pr-1 [scrollbar-color:rgba(255,255,255,0.35)_transparent] [scrollbar-width:thin]">
              {events.length > 0 ? (
                events.map((event) => (
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
                <div className="rounded-2xl border border-dashed border-white/30 bg-white/10 p-8 text-center text-gray-200">
                  No previous events found.
                </div>
              )}
            </div>
          </div>

          {/* ---------- Event details (shown first on small screens) ---------- */}
          <div className="order-1 min-w-0 lg:order-2 lg:col-span-7 xl:col-span-8">
            {selectedEvent ? (
              <EventDetails event={selectedEvent} />
            ) : (
              <div className="hidden rounded-3xl border border-dashed border-white/30 bg-white/10 p-16 text-center text-white/80 lg:block">
                Select an event to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviousEvents;