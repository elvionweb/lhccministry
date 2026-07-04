import React, { useState, useEffect } from "react";
import EventCard from "../components/events/EventCard";
import EventDetails from "../components/events/EventDetails";
import { fetchEvents } from "../utils/api";
import { motion } from "framer-motion";

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
      <div className="pt-20 pb-16 flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16 max-w-8xl mx-auto px-4" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/lhcc3.jpeg')`,
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
        Previous Events
      </motion.h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard
                key={event._id || event.id}
                event={event}
                onSelect={setSelectedEvent}
              />
            ))
          ) : (
            <p className="text-gray-300 text-center mt-4">No previous events found.</p>
          )}
        </div>

        <div className="md:col-span-2">
          {selectedEvent ? (
            <EventDetails event={selectedEvent} />
          ) : (
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center text-gray-700 border border-dashed border-gray-300 shadow-sm">
              Select an event to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviousEvents;
