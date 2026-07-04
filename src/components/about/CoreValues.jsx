import React from "react";
import { motion } from "framer-motion";

const values = [
  {
    title: "Faith",
    scripture: "Romans 1:17",
    text: "We advance by revelation and not by fear. In this house, we believe before we see, and impossibilities bow before the Word of God.",
  },
  {
    title: "Love",
    scripture: "John 13:35",
    text: "Love is our identity. We forgive quickly, serve selflessly, and reflect Christ through compassion, unity, and grace.",
  },
  {
    title: "Integrity",
    scripture: "Proverbs 11:3",
    text: "We live with clean hands and pure hearts. Our private devotion matches our public declaration.",
  },
  {
    title: "Service",
    scripture: "Mark 10:45",
    text: "We lead by serving. Every believer is called, gifted, and empowered to contribute meaningfully.",
  },
  {
    title: "Excellence",
    scripture: "Colossians 3:23",
    text: "Excellence is our worship. We honor God by giving our very best in every assignment.",
  },
  {
    title: "Community",
    scripture: "Acts 2:42",
    text: "We are a covenant family. No one walks alone; we grow, build, and pray together.",
  },
];

const CoreValues = () => {
  return (
    <section
      className="relative py-10 sm:py-14 md:py-16 min-h-[60vh] sm:min-h-[70vh] md:min-h-[90vh] bg-cover bg-center"
      style={{
        backgroundImage: "url('/lhcc6.jpeg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative max-w-7xl mx-auto px-4 text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -200 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-6 md:mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2.5 md:mb-4 sm:mb-3">
            Our Core Values
          </h2>
          <p className="max-w-3xl mx-auto text-gray-100 text-lg md:text-lg leading-relaxed">
            The belief in one God, the Trinity, the human and divine nature of
            Jesus Christ and the significance of His crucifixion and
            resurrection for salvation.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <h3 className="text-xl md:text-2xl font-semibold text-indigo-700 mb-2">
                {value.title}
              </h3>

              <motion.p
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="text-gray-800 text-base md:text-lg leading-relaxed flex-grow"
              >
                {value.text}
              </motion.p>

              <p className="text-indigo-600 font-medium mt-4 italic">
                {value.scripture}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;