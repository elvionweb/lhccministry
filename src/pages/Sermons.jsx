import React, { useState, useEffect } from "react";
import SermonFilters from "../components/sermons/SermonFilters";
import SermonCard from "../components/sermons/SermonCard";
import SermonPlayer from "../components/sermons/SermonPlayer";
import { fetchSermons } from "../utils/api";
import { motion } from "framer-motion";

const Sermons = () => {
  const [sermons, setSermons] = useState([]);
  const [selectedSermon, setSelectedSermon] = useState(null);
  const [filteredSermons, setFilteredSermons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSermons = async () => {
      try {
        const response = await fetchSermons();
        const data =
          response?.docs ||
          response?.data ||
          (Array.isArray(response) ? response : []);
        setSermons(data);
        setFilteredSermons(data);
        if (data.length > 0) setSelectedSermon(data[0]);
      } catch (err) {
        console.error("Error fetching sermons:", err);
      } finally {
        setLoading(false);
      }
    };
    loadSermons();
  }, []);

  /* Fixed background layers (iOS-safe) */
  const Background = () => (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/lhcc23.jpeg')" }}
      />
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/60 to-black/85"
      />
    </>
  );

  if (loading) {
    return (
      <section className="relative isolate flex min-h-screen items-center justify-center bg-accent pt-20">
        <Background />
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-amber-300" />
          <p className="text-sm font-medium tracking-wide text-white/80">
            Loading sermons…
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative isolate min-h-screen overflow-x-hidden bg-accent">
      <Background />

      <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pb-20 md:pt-28 lg:px-8">
        {/* ---------- Header ---------- */}
        <header className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300 sm:text-sm"
          >
            Watch &amp; Be Blessed
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
            viewport={{ once: true }}
            className="mt-2 font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
          >
            Sermons
          </motion.h1>

          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-amber-300" />
        </header>

        {/* ---------- Filters ---------- */}
        <SermonFilters sermons={sermons} setFiltered={setFilteredSermons} />

        {/* ---------- List + Player ---------- */}
        <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:mt-10 lg:grid-cols-12 lg:gap-8">
          {/* Sermon list (below the player on small screens) */}
          <div className="order-2 min-w-0 lg:order-1 lg:col-span-5 xl:col-span-4">
            <div className="mb-3 flex items-center justify-between px-1">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-white/80">
                All Sermons
              </h2>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                {filteredSermons.length}
              </span>
            </div>

            <div className="max-h-[32rem] space-y-3 overflow-y-auto overscroll-contain pb-1 pr-1 sm:max-h-[40rem] lg:max-h-[calc(100vh-11rem)] [scrollbar-color:rgba(255,255,255,0.35)_transparent] [scrollbar-width:thin]">
              {filteredSermons.length > 0 ? (
                filteredSermons.map((sermon) => (
                  <SermonCard
                    key={sermon._id || sermon.id}
                    sermon={sermon}
                    onSelect={setSelectedSermon}
                    isActive={
                      !!selectedSermon &&
                      (selectedSermon._id || selectedSermon.id) ===
                        (sermon._id || sermon.id)
                    }
                  />
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-white/30 bg-white/10 p-8 text-center text-white/80 backdrop-blur">
                  No sermons found.
                </div>
              )}
            </div>
          </div>

          {/* Sermon player (first on small screens, sticky on large) */}
          <div className="order-1 min-w-0 lg:order-2 lg:sticky lg:top-24 lg:col-span-7 xl:col-span-8">
            {selectedSermon ? (
              <SermonPlayer sermon={selectedSermon} />
            ) : (
              <div className="rounded-3xl border border-dashed border-white/30 bg-white/10 p-10 text-center text-white/80 backdrop-blur sm:p-16">
                Select a sermon to play
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sermons;
