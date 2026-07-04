import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchSermons } from "../../utils/api";

const LatestSermons = () => {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSermons = async () => {
      try {
        const response = await fetchSermons();
        const data =
          response?.docs ||
          response?.data ||
          (Array.isArray(response) ? response : []);
        // Sort by date descending and get top 3
        const sorted = data
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 3);
        setSermons(sorted);
      } catch (error) {
        console.error("Failed to fetch sermons:", error);
      } finally {
        setLoading(false);
      }
    };
    getSermons();
  }, []);

  return (
    <section
      className="relative overflow-hidden pt-18 md:pt-50 sm:pt-20 pb-14 sm:pb-20 md:pb-12 min-h-[60vh] sm:min-h-[70vh] md:min-h-[88vh]"
      style={{
        backgroundImage: "url('/lhcc12.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45 z-0"></div>

      <div className="max-w-7xl relative z-10 mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-4xl md:text-6xl sm:text-5xl font-semibold font-heading text-white mb-8"
        >
          Latest Sermons
        </motion.h2>

        {loading ? (
          <div className="text-white flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sermons.length > 0 ? (
              sermons.map((sermon) => (
                <motion.div
                  key={sermon._id || sermon.id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white p-4 rounded-lg shadow-md text-left flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-semibold font-heading text-lg text-blue-600">
                      {sermon.title}
                    </h3>
                    <p className="text-gray-700 font-body mt-1">
                      Speaker: {sermon.preacher}
                    </p>
                    <p className="text-gray-500 font-body mt-1">
                      Date: {new Date(sermon.date).toLocaleDateString()}
                    </p>
                    {sermon.series && (
                      <p className="text-gray-500 font-body mt-1">
                        Series: {sermon.series}
                      </p>
                    )}
                  </div>
                  <a
                    href={sermon.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 font-body mt-4 inline-block hover:underline"
                  >
                    Watch Video
                  </a>
                </motion.div>
              ))
            ) : (
              <p className="text-white text-lg col-span-full">
                No latest sermons available.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestSermons;
