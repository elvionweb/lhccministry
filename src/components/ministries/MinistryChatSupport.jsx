import React from "react";
import { motion } from "framer-motion";

const MinistryChatSupport = () => {
  // Main pastor's WhatsApp number (update with actual number)
  const pastorWhatsapp = "1234567890";
  const whatsappUrl = `https://wa.me/${pastorWhatsapp}?text=Hello,%20I%20need%20help%20choosing%20a%20ministry.`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-10 bg-indigo-50 p-6 rounded-lg text-center shadow-sm border border-indigo-100"
    >
      {/* Chat Support Heading */}
      <h2 className="text-xl md:text-3xl font-bold text-indigo-700 mb-4 font-heading">
        Need Help Choosing a Ministry?
      </h2>

      {/* Chat Support Description */}
      <p className="text-gray-700 mb-4 max-w-2xl mx-auto font-body">
        You want to find the right ministry for you to join. Our team is here to guide you. Chat with us directly we're excited to help you join a ministry! 
      </p>

      {/* Chat Now Button linking to WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition font-medium text-lg gap-2"
      >
        Chat Now
      </a>
    </motion.div>
  );
};

export default MinistryChatSupport;
