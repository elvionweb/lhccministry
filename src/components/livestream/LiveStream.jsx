import { useEffect } from "react";
import { motion } from "framer-motion";
import YouTubeLive from "./YouTubeLive";
// import { fetchLiveSettings } from "../../utils/api"; // 🔹 Future backend call

export default function LiveStream() {
  // 🔹 Mocked backend data (In production, fetch these from your /api/settings)
  const streamData = {
    channelId: "UC2q1FT2nLnJOHv-d25DcZyg",
    isLive: true
  };

  return (
    <section className="relative overflow-hidden min-h-[600px] flex flex-col justify-center px-4 py-20">
      {/* Background with optimized overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center" 
        style={{ backgroundImage: "url('/lhcc18.jpeg')" }} 
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80 z-0" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {streamData.isLive && (
          <div className="flex justify-center mb-6">
            <span className="flex items-center gap-2 bg-red-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
              <span className="w-2 h-2 bg-white rounded-full" /> Live Now
            </span>
          </div>
        )}

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-7xl font-black text-center text-white uppercase tracking-tighter mb-10"
        >
          Join Our <span className="text-blue-500">Online</span> Service
        </motion.h2>

        <div className="max-w-4xl mx-auto shadow-2xl rounded-[2.5rem] overflow-hidden bg-black border border-white/10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <YouTubeLive channelId={streamData.channelId} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}









// // src/components/livestream/LiveStream.jsx

// import { useState } from "react";
// import { motion } from "framer-motion";
// import YouTubeLive from "./YouTubeLive";
// import FacebookLive from "./FacebookLive";

// /**
//  * LiveStream Component
//  * --------------------
//  * - Allows users to switch between YouTube Live & Facebook Live
//  * - Backend-ready (stream URLs will come from MongoDB later)
//  * - Smooth animations using Framer Motion
//  */

// export default function LiveStream() {
//   // Track which platform is active
//   const [platform, setPlatform] = useState("youtube");

//   // TEMP values (later fetched from backend)
//   const youtubeVideoId = "LIVE_VIDEO_ID_HERE";
//   const facebookVideoUrl = "https://www.facebook.com/YOUR_PAGE/videos/LIVE_ID";

//   return (
//     <section
//       className="relative overflow-hidden max-w-8xl mx-auto px-4 md:px-14 py-8 md:py-10 md:pt-10 pt-28 sm:pt-23"
//       style={{
//         backgroundImage: "url('/lhcc18.jpeg')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/45 z-0"></div>
//       {/* Section Title */}
//       <motion.h2
//         initial={{ opacity: 0.6, y: 30 }}
//         animate={{
//           opacity: [0.6, 1, 0.6], // dim → bright → dim
//           y: 0,
//         }}
//         transition={{
//           opacity: {
//             duration: 4, // slower dimming
//             repeat: Infinity,
//             ease: "easeInOut",
//           },
//           y: {
//             duration: 0.8,
//           },
//         }}
//         className="relative z-10 text-3xl md:text-6xl sm:text-5xl font-bold text-center mb-5 font-heading text-white"
//       >
//         Watch Our Live Service
//       </motion.h2>

//       {/* Platform Switch Buttons */}
//       <div className="flex relative z-10 justify-center gap-4 mb-8">
//         <button
//           onClick={() => setPlatform("youtube")}
//           className={`px-5 py-2 rounded-full font-medium transition ${
//             platform === "youtube"
//               ? "bg-red-600 text-white"
//               : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//           }`}
//         >
//           YouTube Live
//         </button>

//         <button
//           onClick={() => setPlatform("facebook")}
//           className={`px-5 py-2 rounded-full font-medium transition ${
//             platform === "facebook"
//               ? "bg-blue-600 text-white"
//               : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//           }`}
//         >
//           Facebook Live
//         </button>
//       </div>

//       {/* Stream Container */}
//       <motion.div
//         key={platform}
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.4 }}
//         className="relative z-10 mb-7"
//       >
//         {platform === "youtube" ? (
//           <YouTubeLive videoId={youtubeVideoId} />
//         ) : (
//           <FacebookLive videoUrl={facebookVideoUrl} />
//         )}
//       </motion.div>
//     </section>
//   );
// }
