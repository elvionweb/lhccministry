import React from "react";
import { motion } from "framer-motion";

const MinistryCard = ({ ministry }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      /* 1. Added 'overflow-hidden' to keep image within rounded corners */
      /* 2. Removed 'bg-white' and 'p-6' from the main container to let the image fill it */
      className="relative z-10 rounded-lg shadow-md flex flex-col h-full overflow-hidden min-h-[340px]"
    >
      {/* Background Image - Covers everything */}
      <div className="absolute inset-0 z-0">
        {ministry.image ? (
          <img
            src={ministry.image}
            alt={ministry.name}
            /* 'object-bottom' moves the focus of the photo downward as requested */
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className="h-full w-full bg-indigo-800" />
        )}
        {/* Dark Overlay - Makes the text readable */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content Overlay - Positioned over the image */}
      <div className="relative z-10 p-6 flex flex-col h-full text-white">
        {/* Ministry Title */}
        <h3 className="text-xl md:text-2xl font-heading font-bold mb-2">
          {ministry.name}
        </h3>

        {/* Ministry Description */}
        <p className="flex-grow text-sm mb-4 opacity-90">
          {ministry.description}
        </p>

        {/* Meeting Details & Leader Info */}
        <div className="bg-white/98 backdrop-blur-sm p-4 rounded-md mb-4 text-sm space-y-1 border border-white/20 text-black">
          <p>
            <span className="font-semibold text-blue-700">Meeting:</span>{" "}
            {ministry.meetingDay} at {ministry.time}
          </p>
          <p>
            <span className="font-semibold text-blue-700">Leader:</span>{" "}
            {ministry.leaderName}
          </p>
          <p>
            <span className="font-semibold text-blue-700">Contact:</span>{" "}
            {ministry.leaderContact}
          </p>
        </div>

        {/* Action Button */}
        {ministry.whatsappLink ? (
          <a
            href={ministry.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto mx-auto w-fit px-6 bg-blue-600 text-white text-center py-2.5 rounded-md hover:bg-blue-700 transition font-medium"
          >
            Join {ministry.name}
          </a>
        ) : (
          <button className="mt-auto mx-auto w-fit px-6 bg-blue-600 text-white text-center py-2.5 rounded-md hover:bg-blue-700 transition font-medium">
            Join {ministry.name}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default MinistryCard;