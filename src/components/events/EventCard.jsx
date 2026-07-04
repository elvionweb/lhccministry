import React from "react";
import { motion } from "framer-motion";

const EventCard = ({ event, onSelect }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      onClick={() => onSelect(event)}
      className="cursor-pointer bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="w-full overflow-hidden rounded-md mb-2">
        {event.bannerImage && (
        <img
          src={event.bannerImage}
          alt={event.title}
          loading="lazy"
          className="w-full object-cover object-center rounded-md mb-2"
        />
      )}
      </div>
       <h3 className="font-semibold text-lg text-gray-800">{event.title}</h3>

      <p className="text-blue-700 text-sm mt-1">
        {new Date(event.date).toLocaleDateString()} • {event.time}
      </p>

      <p className="text-gray-600 text-sm">{event.location}</p>

      {event.category && (
        <span className="inline-block mt-2 mr-2 text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded">
          {event.category}
        </span>
      )}

      {event.recurring && (
        <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
          Recurring Event
        </span>
      )}
    </motion.div>
  );
};

export default EventCard;
