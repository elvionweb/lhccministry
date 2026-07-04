import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchEvents } from "../../utils/api";
import { Link } from "react-router-dom";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <section className="relative overflow-hidden min-h-[60vh] sm:min-h-[70vh] md:min-h-[90vh] py-16 sm:py-20 md:py-24"
    style={{
        backgroundImage: "url('/lhcc8.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
        {/* Overlay */}
  <div className="absolute inset-0 bg-black/45 z-0"></div>
  
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-10 md:mt-28 sm:mt-">
        <motion.h2
          initial={{ opacity: 0, x: -100 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-4xl md:text-6xl sm:text-5xl font-bold text-white font-heading mb-8"
        >
          Upcoming Events
        </motion.h2>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {events.length > 0 ? (
              events.map((event) => (
                <motion.div
                  key={event._id || event.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-4 rounded-lg shadow-md text-left flex flex-col justify-between h-full"
                >
                  <div>
                    {event.bannerImage && (
                      <img
                        src={event.bannerImage}
                        alt={event.title}
                        className="w-full h-32 object-cover rounded-md mb-2"
                      />
                    )}
                    <h3 className="font-medium text-lg font-body text-blue-600">
                      {event.title}
                    </h3>
                    <p className="text-gray-900 mt-1 font-body">{new Date(event.date).toLocaleDateString()}</p>
                    {event.time && <p className="text-blue-700 mt-1 font-body">{event.time}</p>}
                    <p className="text-gray-900 mt-1 font-body text-sm truncate">{event.location}</p>
                  </div>
                  
                  <Link to={`/events`} className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium font-body transition-colors">
                    Read about Event
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </motion.div>
              ))
            ) : (
              <p className="text-white text-lg col-span-full">No events found.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingEvents;
