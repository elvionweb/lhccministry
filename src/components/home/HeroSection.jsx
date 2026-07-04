// src/components/home/HeroSection.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden w-full min-h-[72vh] sm:min-h-screen flex flex-col justify-start items-center text-center px-4 pt-42 sm:pt-40 md:pt-58">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        {[
          "/lhcc.jpeg",
          "/lhcc28.jpeg",
          "/lhcc1.jpeg",
          "/lhcc6.jpeg",
          "/lhcc14.jpeg",
        ].map((img, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${img}')` }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: [0, 1, 0], scale: [1.05, 1, 1.05] }}
            transition={{
              duration: 12, // slow transition
              repeat: Infinity,
              repeatDelay: 0,
              delay: index * 3, // stagger images slightly
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Overlay for optional background video/image */}
      <div className="absolute inset-0 bg-black/45"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-3xl"
      >
        {/* Church Welcome Title */}
        <motion.h1
          className="text-white font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
          animate={{
            y: [0, -10, 0],
            textShadow: [
              "0px 0px 8px rgba(255,255,255,0.3)",
              "0px 0px 20px rgba(255,255,255,0.6)",
              "0px 0px 8px rgba(255,255,255,0.3)",
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          Welcome Home
        </motion.h1>

        {/* Subtitle / Mission snippet */}
        <motion.p
          className="text-gray-100 text-lg sm:text-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        >
          A place of worship, community, and inspiration. We exist to declare
          and demonstrate the liberating power of the gospel, by raising a
          people liberated, who will light up mankind everywhere in the world.
          Join us in spreading faith and hope.
        </motion.p>

        {/* Action Buttons */}
        <div className="flex sm:flex-row gap-4 justify-center w-full sm:w-auto">
          {/* Watch Live Button */}
          {/* <Link
            to="/"
            className="px-4 py-3 sm:px-6 sm:py-3 sm:text-base bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 hover:text-gray-100 transition"
          >
            Watch Live
          </Link> */}

          {/* Events Button */}
          <Link
            to="/events"
            className="px-4 py-3 sm:px-6 sm:py-3 sm:text-base bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Events
          </Link>

          {/* Visit Us Button */}
          <Link
            to="/contact"
            className="px-4 py-3 sm:px-6 sm:py-3 sm:text-base bg-white text-black font-semibold rounded-lg hover:bg-gray-300 hover:text-gray-900 transition"
          >
            Visit Us
          </Link>
        </div>
      </motion.div>

      {/* Optional Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, repeat: Infinity, repeatType: "loop" }}
        className="absolute bottom-10"
      >
        <span className="text-white text-2xl animate-bounce">⌄</span>
      </motion.div>
    </section>
  );
}
