import React, { useState, useEffect } from "react";
import SermonFilters from "../components/sermons/SermonFilters";
import SermonCard from "../components/sermons/SermonCard";
import SermonPlayer from "../components/sermons/SermonPlayer";
import { fetchSermons } from "../utils/api";
import { motion } from "framer-motion";

const Sermons = () => {
  const [sermons, setSermons] = useState([]);
  const [selectedSermon, setSelectedSermon] = useState(null);
  const [filteredSermons, setFilteredSermons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSermons = async () => {
      try {
        const response = await fetchSermons();
        const data =
          response?.docs ||
          response?.data ||
          (Array.isArray(response) ? response : []);
        setSermons(data);
        setFilteredSermons(data);
        if (data.length > 0) setSelectedSermon(data[0]);
      } catch (err) {
        console.error("Error fetching sermons:", err);
      } finally {
        setLoading(false);
      }
    };
    loadSermons();
  }, []);

  if (loading) {
    return (
      <div className="pt-20 pb-16 flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden pt-20 bg-accent pb-16 max-w-8xl mx-auto px-4" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/lhcc23.jpeg')`,
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
        className="text-3xl md:text-5xl font-bold text-white mb-6 text-center"
      >
        Sermons
      </motion.h1>

      <SermonFilters sermons={sermons} setFiltered={setFilteredSermons} />

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {/* Sermon List */}
        <div className="md:col-span-1 space-y-4">
          {filteredSermons.length > 0 ? (
            filteredSermons.map((sermon) => (
              <SermonCard
                key={sermon._id || sermon.id}
                sermon={sermon}
                onSelect={setSelectedSermon}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center mt-4">No sermons found.</p>
          )}
        </div>

        {/* Sermon Player */}
        <div className="md:col-span-2">
          {selectedSermon ? (
            <SermonPlayer sermon={selectedSermon} />
          ) : (
            <div className="bg-gray-100 rounded-lg p-6 text-center text-gray-600 border border-dashed border-gray-300">
              Select a sermon to play
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sermons;
