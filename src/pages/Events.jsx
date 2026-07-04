import React, { useState, useEffect } from "react";
import EventCard from "../components/events/EventCard";
import EventDetails from "../components/events/EventDetails";
import { fetchEvents } from "../utils/api";
import { motion } from "framer-motion";

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
      <div className="pt-20 pb-16 flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16 max-w-8xl mx-auto px-4" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/lhcc29.jpeg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}>
      <motion.h1
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-white text-center md:text-5xl mb-8"
      >
        Events
      </motion.h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Events List */}
        <div className="md:col-span-1 space-y-4">
          {events.length > 0 ? (
            events.slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage).map((event) => (
              <EventCard
                key={event._id || event.id}
                event={event}
                onSelect={setSelectedEvent}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center mt-4">No events found.</p>
          )}

          {/* Pagination Controls */}
          {events.length > eventsPerPage && (
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed hidden'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                }`}
              >
                &larr; Previous
              </button>
              <span className="text-sm text-gray-600 font-medium">
                Page {currentPage} of {Math.ceil(events.length / eventsPerPage)}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(events.length / eventsPerPage)))}
                disabled={currentPage === Math.ceil(events.length / eventsPerPage)}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                  currentPage === Math.ceil(events.length / eventsPerPage)
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed hidden'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                }`}
              >
                Next &rarr;
              </button>
            </div>
          )}
        </div>

        {/* Event Details */}
        <div className="md:col-span-2">
          {selectedEvent ? (
            <EventDetails event={selectedEvent} />
          ) : (
            <div className="bg-gray-100 rounded-lg p-6 text-center text-gray-600 border border-dashed border-gray-300">
              Select an event to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
