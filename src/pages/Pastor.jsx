import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/* ---------------------------------------------------------------
   Content — edit text here, the layout below stays untouched
---------------------------------------------------------------- */
const PROFILES = {
  apostle: {
    tab: "Apostle Nosa Best Ojo",
    tabShort: "Apostle Dr. Nosa",
    eyebrow: "Our Visionary Leader",
    name: "Apostle Dr. Nosa Best Ojo",
    role: "Canadian Chaplain · Author · Marriage & Family Counselor",
    image: "/DGO.jpeg",
    alt: "Apostle Dr. Nosa Best Ojo",
    stats: [
      { value: "21", label: "Books Authored" },
      { value: "2", label: "Counseling Offices" },
      { value: "4", label: "Children" },
    ],
    paragraphs: [
      "Apostle Dr. Nosa Best Ojo is a distinguished graduate of MTI College of Theology, SPIRIT & LIFE Bible College, and the Canada Institute of Chaplaincy, where he earned the prestigious title of Canadian Chaplain.",
      "Together with his spouse, he hosts the enlightening program “Destiny Call” on SpeedFM 96.6 and Facebook Live every Saturday from 7:30pm to 8:30pm. The program has fostered healing and restoration in families worldwide.",
      "He is the visionary leader of The Good Father Fellowship and The Women of Wonders Prayer Fellowship. He organizes conferences on marriage and singles and maintains two counseling offices in Benin City, offering invaluable relationship guidance.",
      "An accomplished author of 21 books including “Common Mistakes in Marriage,” “The Couple and the Home,” and “Breaking Out of an Average Life,” Apostle Dr. Nosa Best Ojo continues to impact lives globally.",
    ],
    closing:
      "He shares a joyful marriage with Pastor Mrs. Irenosen E. Ojo, and they are blessed with four wonderful children.",
  },
  wife: {
    tab: "Pastor Mrs. Irenosen E. Ojo",
    tabShort: "Pastor Mrs. I. Ojo",
    eyebrow: "Our Pastor",
    name: "Pastor Mrs. Irenosen E. Ojo",
    role: "Pastor · Registered Nurse & Midwife · Keynote Speaker",
    image: "/MGO1.jpeg",
    alt: "Pastor Mrs. Irenosen E. Ojo",
    stats: [
      { value: "RN/RM", label: "Registered Nurse & Midwife" },
      { value: "CCCO", label: "Canadian Chaplain Org." },
      { value: "4", label: "Children" },
    ],
    paragraphs: [
      "Pastor Mrs. Irenosen E. Ojo is a distinguished pastor and esteemed member of the Canadian Christian Chaplain Organization. She holds a professional foundation as a Registered Nurse and Registered Midwife (RN/RM).",
      "She is a co-author of several books focused on preparing individuals for marriage, nurturing healthy relationships, and enriching the lives of married couples.",
      "Her humanitarian passion is reflected in her dedication to empowering women and girls, equipping them with the tools to exceed societal expectations.",
      "She is a respected keynote speaker at conferences and seminars across denominations within and beyond Nigeria.",
    ],
    closing:
      "She shares a harmonious and fulfilling marriage with Apostle Dr. Nosa Best Ojo, and together they are blessed with four remarkable children.",
  },
};

const TABS = ["apostle", "wife"];

/* ---------------------------------------------------------------
   Component
---------------------------------------------------------------- */
export default function Pastor() {
  const [view, setView] = useState("apostle");
  const reduce = useReducedMotion();
  const p = PROFILES[view];
  const dir = view === "apostle" ? -1 : 1; // direction content enters from
  const shift = reduce ? 0 : 40;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="relative isolate min-h-screen overflow-x-hidden bg-accent">
      {/* Background: fixed layer (works on iOS, unlike background-attachment: fixed) */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/DandM5.jpeg')",
          backgroundPosition: "57% 10%",
        }}
      />
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 bg-gradient-to-b from-white/80 via-white/70 to-white/85"
      />

      <div className="mx-auto w-full max-w-7xl px-4 pb-14 pt-24 sm:px-6 sm:pb-16 md:px-10 md:pt-28 lg:px-16 lg:pb-20">
        {/* ---------- Page heading ---------- */}
        <header className="mb-8 text-center md:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-700 sm:text-sm">
            Meet The Lead Pastors
          </p>
          <div className="mx-auto mt-3 h-px w-16 bg-gradient-to-r from-transparent via-blue-700 to-transparent" />
        </header>

        {/* ---------- Segmented switcher ---------- */}
        <div className="mb-10 flex justify-center md:mb-14">
          <div
            role="tablist"
            aria-label="Choose a pastor"
            className="relative grid w-full max-w-xl grid-cols-2 rounded-full border border-white/60 bg-white/70 p-1.5 shadow-lg backdrop-blur-md"
          >
            {TABS.map((key) => {
              const active = view === key;
              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={active}
                  aria-controls="pastor-panel"
                  onClick={() => setView(key)}
                  className={`relative z-10 rounded-full px-3 py-2.5 text-xs font-semibold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 sm:px-6 sm:py-3 sm:text-sm md:text-base ${
                    active ? "text-white" : "text-gray-700 hover:text-blue-700"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="pastor-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 -z-10 rounded-full bg-blue-700 shadow-md"
                    />
                  )}
                  <span className="sm:hidden">{PROFILES[key].tabShort}</span>
                  <span className="hidden sm:inline">{PROFILES[key].tab}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ---------- Animated panel ---------- */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={view}
            id="pastor-panel"
            role="tabpanel"
            initial={{ opacity: 0, x: dir * -shift }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * shift }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="grid items-start gap-8 sm:gap-10 lg:grid-cols-12 lg:items-center lg:gap-14"
          >
            {/* ----- Portrait ----- */}
            <div className="flex justify-center lg:col-span-5 lg:justify-end">
              <div className="relative w-full max-w-[20rem] sm:max-w-sm lg:max-w-md">
                {/* decorative offset frame */}
                <div
                  aria-hidden="true"
                  className="absolute -bottom-3 -right-3 h-full w-full rounded-[2rem] border-2 border-blue-700/40 sm:-bottom-4 sm:-right-4"
                />
                <div
                  aria-hidden="true"
                  className="absolute -left-4 -top-4 hidden h-24 w-24 rounded-full bg-blue-700/10 blur-xl sm:block"
                />
                <img
                  src={p.image}
                  alt={p.alt}
                  loading="eager"
                  className="relative aspect-[4/5] w-full rounded-[2rem] object-cover object-top shadow-2xl ring-4 ring-white/80"
                />
                {/* name badge */}
                <div className="absolute -bottom-5 left-1/2 w-[88%] -translate-x-1/2 rounded-2xl border border-white/60 bg-white/90 px-4 py-2.5 text-center shadow-xl backdrop-blur-md">
                  <p className="font-heading text-sm font-bold text-blue-700 sm:text-base">
                    {p.name}
                  </p>
                </div>
              </div>
            </div>

            {/* ----- Content ----- */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="mt-4 lg:col-span-7 lg:mt-0"
            >
              <div className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl backdrop-blur-md sm:p-8 lg:p-10">
                <motion.p
                  variants={item}
                  className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-blue-700 lg:text-left"
                >
                  {p.eyebrow}
                </motion.p>

                <motion.h1
                  variants={item}
                  className="mt-2 text-center font-heading text-3xl font-bold leading-tight text-blue-700 sm:text-4xl xl:text-5xl lg:text-left"
                >
                  {p.name}
                </motion.h1>

                <motion.p
                  variants={item}
                  className="mt-2 text-center text-sm font-medium text-gray-600 sm:text-base lg:text-left"
                >
                  {p.role}
                </motion.p>

                <motion.div
                  variants={item}
                  className="mx-auto mt-5 h-1 w-16 rounded-full bg-blue-700 lg:mx-0"
                />

                {/* stats */}
                <motion.ul
                  variants={item}
                  className="mt-6 grid grid-cols-3 gap-2 sm:gap-4"
                >
                  {p.stats.map((s) => (
                    <li
                      key={s.label}
                      className="rounded-2xl bg-blue-700/10 px-2 py-3 text-center sm:px-4 sm:py-4"
                    >
                      <p className="font-heading text-xl font-bold text-blue-700 sm:text-2xl md:text-3xl">
                        {s.value}
                      </p>
                      <p className="mt-1 text-[10px] font-medium leading-tight text-gray-700 sm:text-xs md:text-sm">
                        {s.label}
                      </p>
                    </li>
                  ))}
                </motion.ul>

                {/* bio */}
                <div className="mt-6 space-y-4">
                  {p.paragraphs.map((text, i) => (
                    <motion.p
                      key={i}
                      variants={item}
                      className="font-body text-[15px] leading-7 text-gray-900 sm:text-base md:text-[17px] md:leading-8"
                    >
                      {text}
                    </motion.p>
                  ))}
                </div>

                {/* closing quote */}
                <motion.blockquote
                  variants={item}
                  className="mt-6 rounded-2xl border-l-4 border-blue-700 bg-blue-700/10 p-4 font-body text-sm font-semibold italic leading-7 text-gray-900 sm:p-5 sm:text-base md:text-lg"
                >
                  {p.closing}
                </motion.blockquote>

                {/* switch CTA */}
                <motion.div variants={item} className="mt-6 flex justify-center lg:justify-start">
                  <button
                    onClick={() => setView(view === "apostle" ? "wife" : "apostle")}
                    className="group inline-flex items-center gap-2 rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-800 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 active:scale-95 sm:text-base"
                  >
                    {view === "apostle"
                      ? "Pastor Mrs. Irenosen E. Ojo"
                      : "Apostle Dr. Nosa Best Ojo"}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}
