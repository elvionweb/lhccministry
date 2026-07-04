import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const testimonials = [
  {
    name: "John Efosa",
    message:
      "I came to Liberty House Christian Center during one of the most difficult seasons of my life. I was emotionally drained, spiritually dry, and physically exhausted. But from the very first service, I felt the tangible presence of the Holy Spirit. The worship was not just songs it was an encounter. During a prophetic prayer session, I experienced a divine touch that I cannot fully explain. The burdens I had carried for years began to lift. Fear was replaced with faith. Anxiety was replaced with peace. That night, I encountered the healing power of God. Today, I stand as a living testimony of restoration and breakthrough. God used this church to revive my spirit, heal my heart, and align my life with His purpose. This is more than a church it is a place where heaven meets earth.",
    },
  {
    name: "Osasu Micheal",
    message:
      "For years, I struggled with a condition that doctors could not fully resolve. I prayed, but deep inside, my faith was weak. When I joined Liberty House Christian Center, I was taught not just to believe in God but to trust Him completely. One Sunday, during a powerful moment of prayer and anointing, I felt a warmth flow through my body. It was as if chains were breaking. Within weeks, my health began to improve in ways I cannot medically explain. The healing power of God became real to me. But beyond physical healing, God restored my joy, my confidence, and my hope. This church ignited my faith and reminded me that miracles are still happening today. I am living proof that God still heals, restores, and blesses.",
  },

  {
    name: "Iyobosa Samuel",
    message:
      "Before coming here, my life felt stagnant. Doors were closed. Opportunities slipped away. I prayed for breakthrough but saw no movement. Through the powerful Word preached in this church and the fire-filled prayer sessions, something shifted spiritually. I learned how to pray with authority and stand firmly on God’s promises. Within months, doors began to open unexpectedly. Opportunities came from places I never imagined. What felt impossible became possible. God didn’t just bless me God transformed my mindset and strengthened my faith. I now walk in divine favor and confidence, knowing that God’s hand is upon my life. This church helped position me for the blessings I now experience.",
  },
];

const Testimonials = () => {
  return (
    <>
      {/* Background Image with Member Stories Text */}
      <section className="overflow-hidden w-full h-[300px] md:h-[600px] sm:h-[500px] bg-cover bg-no-repeat bg-center flex items-center justify-center relative">
        {/* ✅ Background Carousel */}
        <div className="absolute inset-0 -z-10">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            className="w-full h-full"
          >
            <SwiperSlide>
              <div
                className="w-full h-full bg-cover bg-no-repeat bg-center"
                style={{ backgroundImage: "url('/lhcc11.jpeg')" }}
              />
            </SwiperSlide>

            <SwiperSlide>
              <div
                className="w-full h-full bg-cover bg-no-repeat bg-center"
                style={{ backgroundImage: "url('/lhcc12.jpeg')" }}
              />
            </SwiperSlide>

            <SwiperSlide>
              <div
                className="w-full h-full bg-cover bg-no-repeat bg-center"
                style={{ backgroundImage: "url('/lhcc13.jpeg')" }}
              />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Optional overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/45"></div>
      </section>

      {/* Testimonials Carousel */}
      <section className="pt-6 pb-6 md:pt-0 sm:pt-12 bg-primary/12">
        <div className="max-w-5xl mx-auto px-5">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
          >
            {testimonials.map((testi, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white p-4 md:p-5 rounded-lg shadow-md text-center"
                >
                  <div className="relative z-10 text-center px-4">
                    <motion.h2
                      initial={{ opacity: 0, y: -30 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-4xl md:text-6xl sm:text-5xl font-bold text-blue-700 mb-2 md:mb-4 sm:mb-2"
                    >
                      Member Stories
                    </motion.h2>
                  </div>
                  <p className="text-gray-700 italic">"{testi.message}"</p>
                  <h4 className="mt-3 font-semibold font-heading text-blue-700">
                    {testi.name}
                  </h4>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
