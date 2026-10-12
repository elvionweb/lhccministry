import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fetchEvents } from "../../utils/api";
import { Link } from "react-router-dom";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await fetchEvents();
        const data = response?.docs || response?.data || (Array.isArray(response) ? response : []);
        // Sort by date ascending to show upcoming events, filter out past events, and limit to 4
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        const upcoming = data
          .filter((e) => {
            const eventDate = new Date(e.date);
            const startOfEventDate = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
            const diffDays = Math.floor((startOfToday.getTime() - startOfEventDate.getTime()) / (1000 * 60 * 60 * 24));
            return diffDays < 1; // Only show if not past by 1 day or more
          })
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 4);
        
        // If there are less than 4 upcoming, we might just show recent ones if we want,
        // but it makes more sense to show actual upcoming events. Let's just show up to 4 upcoming.
        if (upcoming.length === 0) {
           // fallback to just showing the latest 4 if no upcoming events exist, for visual purposes
           // or we can just leave it empty. Let's fallback to 4 latest events.
           const recent = data.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
           setEvents(recent);
        } else {
           setEvents(upcoming);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };
    getEvents();
  }, []);

  return (
    <section
      className="relative min-h-[60vh] overflow-hidden py-16 sm:min-h-[70vh] sm:py-20 md:py-24"
      style={{
        backgroundImage: "url('/lhcc8.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/50 to-black/65"></div>
  
      <div className="relative z-10 mx-auto mt-6 max-w-7xl px-4 text-center sm:mt-8 sm:px-6 md:mt-12 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, x: reduce ? 0 : -100 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-heading text-4xl font-bold text-white sm:text-5xl md:text-6xl"
        >
          Upcoming Events
        </motion.h2>
        <div className="mx-auto mb-10 mt-4 h-1 w-16 rounded-full bg-amber-300 md:mb-12" />

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 min-[560px]:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {events.length > 0 ? (
              events.map((event) => (
                <motion.div
                  key={event._id || event.id}
                  whileHover={reduce ? undefined : { y: -6 }}
                  className="flex h-full flex-col overflow-hidden rounded-2xl bg-white text-left shadow-lg transition-shadow duration-300 hover:shadow-2xl"
                >
                  {/* Full image, never cropped */}
                  {event.bannerImage && (
                    <div className="flex w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                      <img
                        src={event.bannerImage.replace("/upload/", "/upload/c_limit,w_600,q_auto,f_auto/")}
                        alt={event.title}
                        loading="lazy"
                        decoding="async"
                        className="block h-auto max-h-48 w-full object-contain object-center sm:max-h-56 lg:max-h-48 xl:max-h-56"
                      />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="line-clamp-2 font-body text-base font-semibold leading-snug text-blue-700 sm:text-lg">
                      {event.title}
                    </h3>
                    <p className="mt-1.5 font-body text-sm text-gray-900">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                    {event.time && (
                      <p className="mt-0.5 font-body text-sm font-medium text-blue-700">
                        {event.time}
                      </p>
                    )}
                    <p className="mt-0.5 line-clamp-2 font-body text-sm text-gray-700">
                      {event.location}
                    </p>

                    <Link
                      to={`/events`}
                      className="mt-auto inline-flex items-center pt-4 font-body text-sm font-semibold text-blue-600 transition-colors hover:text-blue-800 focus:outline-none focus-visible:underline"
                    >
                      Read about Event
                      <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="col-span-full text-lg text-white">No events found.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingEvents;