import React from "react";
import { motion } from "framer-motion";

const SermonPlayer = ({ sermon }) => {
  if (!sermon) return null;

  // 🔹 Professional logic: Extract ID from any YouTube link (watch?v= or youtu.be/)
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url?.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeId(sermon.videoUrl);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
    >
      <div className="relative aspect-video bg-black">
        {videoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            loading="lazy"
            title={sermon.title}
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white font-bold uppercase tracking-widest text-xs">
            Invalid Video Link
          </div>
        )}
      </div>

      <div className="p-8 text-left">
        <h2 className="text-2xl md:text-3xl font-medium text-black tracking-tighter mb-2">
          {sermon.title}
        </h2>
        <div className="flex flex-wrap items-center gap-4 text-blue-700 font-bold text-xs uppercase tracking-widest mb-6">
          <span className="flex items-center gap-2"> {sermon.preacher || sermon.speaker}</span>
          <span className="h-1 w-1 bg-gray-500 rounded-full" />
          <span>{sermon.date}</span>
          {sermon.series && (
            <>
              <span className="h-1 w-1 bg-gray-500 rounded-full" />
              <span className="text-blue-700">{sermon.series}</span>
            </>
          )}
        </div>
        <div className="flex gap-4">
          <button className="bg-blue-700 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-200">
            Share Sermon
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SermonPlayer;
