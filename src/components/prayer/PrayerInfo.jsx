import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const scriptures = [
  {
    text: "Confess your faults one to another, and pray one for another, that ye may be healed. The effectual fervent prayer of a righteous man availeth much.",
    verse: "James 5:16",
  },
  {
    text: "Again I say unto you, That if two of you shall agree on earth as touching any thing that they shall ask, it shall be done for them of my Father which is in heaven.",
    verse: "Matthew 18:19",
  },
  {
    text: "Wherefore comfort yourselves together, and edify one another, even as also ye do.",
    verse: "1 Thessalonians 5:11",
  },
];

const QuoteIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="h-7 w-7 text-indigo-200/70 sm:h-9 sm:w-9"
  >
    <path d="M9.5 5C5.9 5 3 7.9 3 11.5V19h7.5v-7.5H6.4c0-1.9 1.5-3.4 3.4-3.4V5h-.3zm9 0C14.9 5 12 7.9 12 11.5V19h7.5v-7.5h-4.1c0-1.9 1.5-3.4 3.4-3.4V5h-.3z" />
  </svg>
);

const PrayerInfo = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % scriptures.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div className="mx-auto mb-6 w-full max-w-3xl px-4 text-center sm:mb-8 sm:px-6">
      {/* Heading */}
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300 sm:text-sm">
        Prayer Team
      </p>
      <h2 className="mx-auto mt-2 max-w-2xl font-heading text-xl font-semibold leading-snug text-indigo-50 sm:text-2xl md:text-3xl">
        You are not alone. Our prayer team stands with you in faith and in
        prayer.
      </h2>
      <span className="mx-auto mt-4 block h-1 w-12 rounded-full bg-amber-300/80 sm:w-16" />

      {/* Verse card */}
      <div
        className="mt-6 rounded-2xl bg-white/10 px-5 py-6 shadow-xl ring-1 ring-white/20 backdrop-blur-md sm:mt-8 sm:px-8 sm:py-8 md:px-12 md:py-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div className="mb-2 flex justify-center sm:mb-3">
          <QuoteIcon />
        </div>

        {/* All verses stacked in one cell so height never jumps */}
        <div className="grid" aria-live="polite">
          {scriptures.map((item, i) => (
            <motion.figure
              key={item.verse}
              aria-hidden={i !== index}
              initial={false}
              animate={{ opacity: i === index ? 1 : 0, y: i === index ? 0 : 12 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`col-start-1 row-start-1 flex flex-col items-center justify-center ${
                i === index ? "" : "pointer-events-none"
              }`}
            >
              <blockquote className="font-body text-base italic leading-7 text-white sm:text-lg sm:leading-8 md:text-xl md:leading-9">
                “{item.text}”
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold tracking-wide text-amber-300 sm:text-base">
                — {item.verse}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-6 flex items-center justify-center gap-2 sm:mt-7">
          {scriptures.map((item, i) => (
            <button
              key={item.verse}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${item.verse}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-6 bg-amber-300"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrayerInfo;