import React from "react";
import { motion } from "framer-motion";
import EventRegistrationForm from "./EventRegistrationForm";

const EventDetails = ({ event }) => {
  if (!event) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-3 rounded-xl shadow-md"
    >
      {event.bannerImage && ( <div className="w-full h-46 overflow-hidden rounded-lg mb-4">
        <img
          src={event.bannerImage}
          alt={event.title}
          loading="lazy"
          className="w-full h-full object-cover object-top"
        />
      </div>
        
      )}
      <h2 className="text-2xl font-bold text-black mb-2">{event.title}</h2>

      {event.category && (
        <span className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded mb-4">
          {event.category}
        </span>
      )}

      <p className="text-blue-700 mb-1">
         {new Date(event.date).toLocaleDateString()} •  {event.time}
      </p>

      <p className="text-gray-600 mb-4"> {event.location}</p>

      <p className="text-gray-700 mb-2 md:mb-4">{event.description}</p>

      <EventRegistrationForm eventId={event._id} eventTitle={event.title} />
    </motion.div>
  );
};

export default EventDetails;