import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const heroImages = ["/lhcc11.jpeg", "/lhcc12.jpeg", "/lhcc13.jpeg"];

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

const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const QuoteIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="h-8 w-8 text-blue-200 sm:h-10 sm:w-10"
  >
    <path d="M9.5 5C5.9 5 3 7.9 3 11.5V19h7.5v-7.5H6.4c0-1.9 1.5-3.4 3.4-3.4V5h-.3zm9 0C14.9 5 12 7.9 12 11.5V19h7.5v-7.5h-4.1c0-1.9 1.5-3.4 3.4-3.4V5h-.3z" />
  </svg>
);

const Testimonials = () => {
  return (
    <>
      {/* Hero with background carousel */}
      <section className="relative flex h-[260px] w-full items-center justify-center overflow-hidden sm:h-[380px] md:h-[500px] lg:h-[600px]">
        {/* Background carousel */}
        <div className="absolute inset-0 z-0">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            allowTouchMove={false}
            className="h-full w-full"
          >
            {heroImages.map((src) => (
              <SwiperSlide key={src}>
                <div
                  className="h-full w-full bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url('${src}')` }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 z-[1] bg-black/55" />

        {/* Heading */}
        <div className="relative z-10 px-5 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Member Stories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mx-auto mt-3 max-w-md text-sm text-blue-100 sm:mt-4 sm:text-base md:text-lg"
          >
            Real lives. Real testimonies. Real encounters with God.
          </motion.p>
          <span className="mx-auto mt-4 block h-1 w-14 rounded-full bg-blue-300/80 sm:w-20" />
        </div>
      </section>

      {/* Testimonials carousel */}
      <section className="bg-primary/12 py-10 sm:py-14 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{
              delay: 7000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            loop
            autoHeight
            spaceBetween={24}
            className="!px-1 !pb-12 !pt-1 sm:!pb-14"
            style={{
              "--swiper-pagination-color": "#1d4ed8",
              "--swiper-pagination-bullet-inactive-color": "#93c5fd",
              "--swiper-pagination-bullet-inactive-opacity": "1",
            }}
          >
            {testimonials.map((testi) => (
              <SwiperSlide key={testi.name} className="!h-auto">
                <article className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-black/5 sm:p-8 md:p-10">
                  <QuoteIcon />

                  <p className="mt-3 text-left text-[15px] italic leading-7 text-gray-700 sm:mt-4 sm:text-base sm:leading-8 md:text-lg md:leading-8">
                    {testi.message}
                  </p>

                  <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-5 sm:mt-8 sm:gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-700 text-sm font-semibold text-white sm:h-12 sm:w-12">
                      {getInitials(testi.name)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="truncate font-heading text-base font-semibold text-blue-700 sm:text-lg">
                        {testi.name}
                      </h4>
                      <p className="text-xs text-gray-500 sm:text-sm">
                        Liberty House Christian Centre
                      </p>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Testimonials;