import React from "react";
import { motion } from "framer-motion";

const SermonCard = ({ sermon, onSelect }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      onClick={() => onSelect(sermon)}
      className="overflow-hidden cursor-pointer bg-white p-4 rounded-lg shadow-md"
    >
      <h3 className="font-semibold text-lg text-gray-800">
        {sermon.title}
      </h3>
      <p className="text-gray-600 mt-1">{sermon.speaker}</p>
      <p className="text-gray-500 text-sm">{sermon.date}</p>
      <span className="text-blue-700 text-sm mt-2 inline-block">
        Watch →
      </span>
    </motion.div>
  );
};

export default SermonCard;
