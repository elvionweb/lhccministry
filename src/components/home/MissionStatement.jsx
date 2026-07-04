import React from "react";
import { motion } from "framer-motion";

const MissionStatement = () => {
  return (
    <section
          className="relative overflow-hidden py-16 bg-cover bg-center"
          style={{ backgroundImage: "url('/lhcc5.jpeg')" }}
        >
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/60"></div>
    
          {/* Content */}
          <div className="relative max-w-6xl mx-auto px-3 grid md:grid-cols-2 gap-8 md:gap-12 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl md:text-5xl font-bold font-heading text-white mb-2 md:mb-4">
                Our Vision
              </h3>
              <p className="text-gray-100 text-lg leading-relaxed">
                We exist to declare and demonstrate the liberating power of the gospel by raising a people, liberated who will light up mankind everywhere in the world. A generation of believers who live out
                God's love, influence society positively, and impact the world for Christ.
              </p>
            </motion.div>
    
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl md:text-5xl font-bold font-heading text-white mb-2 md:mb-4">
                Our Mission
              </h3>
              <p className="text-gray-100 leading-relaxed text-lg">
                Our mission is to bring light into every dark part of the world. To preach the Gospel, disciple believers, foster unity, and serve communities through love, compassion, and excellence.
              </p>
            </motion.div>
          </div>
        </section>
  );
};

export default MissionStatement;
