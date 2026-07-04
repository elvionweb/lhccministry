import React from "react";
import { motion } from "framer-motion";

const PrayerSuccess = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-green-50 p-8 rounded-lg text-center"
    >
      <h2 className="text-2xl font-bold text-green-700 mb-3">
        Prayer Request Received
      </h2>

      <p className="text-gray-800">
        Thank you for trusting us. Our prayer team is lifting you up in prayer. May God’s peace and strength be with you.
      </p>
    </motion.div>
  );
};

export default PrayerSuccess;
