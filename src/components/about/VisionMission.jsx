import React from "react";
import { motion } from "framer-motion";

const EyeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="h-6 w-6 sm:h-7 sm:w-7"
  >
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const FlameIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="h-6 w-6 sm:h-7 sm:w-7"
  >
    <path d="M12 2c1 3.5 4.5 5.5 4.5 10a4.5 4.5 0 0 1-9 0c0-1.8.8-3 1.7-4 .4 1.2 1.1 1.8 1.8 2C11 7.5 11 4.5 12 2Z" />
    <path d="M12 22a3 3 0 0 0 3-3c0-1.7-1.5-2.5-3-4.5C10.5 16.5 9 17.3 9 19a3 3 0 0 0 3 3Z" />
  </svg>
);

const items = [
  {
    title: "Our Vision",
    icon: <EyeIcon />,
    from: -50,
    text: "We exist to declare and demonstrate the liberating power of the gospel by raising a liberated people who will light up mankind everywhere in the world. A generation of believers who live out God's love, influence society positively, and impact the world for Christ.",
  },
  {
    title: "Our Mission",
    icon: <FlameIcon />,
    from: 50,
    text: "Our mission is to bring light into every dark part of the world. To preach the Gospel, disciple believers, foster unity, and serve communities through love, compassion, and excellence.",
  },
];

const VisionMission = () => {
  return (
    <section
      className="relative overflow-hidden bg-neutral-900 bg-cover bg-center py-14 sm:py-20 md:py-24 lg:py-28"
      style={{ backgroundImage: "url('/lhcc5.jpeg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/80" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        {/* Section intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-8 text-center sm:mb-12 md:mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300 sm:text-sm">
            Who We Are
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Purpose That Drives Us
          </h2>
          <span className="mx-auto mt-4 block h-1 w-14 rounded-full bg-amber-300/80 sm:w-20" />
        </motion.div>

        {/* Cards */}
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 md:gap-8">
          {items.map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: item.from }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="h-full"
            >
              <article className="h-full rounded-2xl bg-white/10 p-6 text-center shadow-xl ring-1 ring-white/20 backdrop-blur-md sm:p-8 md:p-9 md:text-left lg:p-10">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-300/15 text-amber-300 ring-1 ring-amber-300/40 sm:h-14 sm:w-14 md:mx-0">
                  {item.icon}
                </div>

                <h3 className="mt-4 font-heading text-2xl font-bold text-white sm:mt-5 sm:text-3xl lg:text-4xl">
                  {item.title}
                </h3>

                <span className="mx-auto mt-3 block h-0.5 w-10 rounded-full bg-amber-300/80 md:mx-0" />

                <p className="mt-4 font-body text-[15px] leading-7 text-gray-100 sm:mt-5 sm:text-base sm:leading-8 lg:text-lg lg:leading-8">
                  {item.text}
                </p>
              </article>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionMission;









// import React from "react";
// import { motion } from "framer-motion";

// const VisionMission = () => {
//   return (
//     <section
//       className="relative overflow-hidden py-16 bg-cover bg-center"
//       style={{ backgroundImage: "url('/lhcc5.jpeg')" }}
//     >
//       {/* Overlay for readability */}
//       <div className="absolute inset-0 bg-black/60"></div>

//       {/* Content */}
//       <div className="relative max-w-6xl mx-auto px-3 grid md:grid-cols-2 gap-8 text-center md:text-left">
//         <motion.div
//           initial={{ opacity: 0, x: -200 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1.5, ease: "easeOut" }}
//           viewport={{ once: true }}
//         >
//           <h3 className="text-2xl font-bold font-heading text-white mb-2 md:mb-4 md:text-5xl">
//             Our Vision
//           </h3>
//           <p className="text-gray-100 font-body leading-relaxed text-lg">
//             We exist to declare and demonstrate the liberating power of the
//             gospel by raising a people, liberated who will light up mankind
//             everywhere in the world. A generation of believers who live out
//             God's love, influence society positively, and impact the world for
//             Christ.
//           </p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, x: 200 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1.5, ease: "easeOut" }}
//           viewport={{ once: true }}
//         >
//           <h3 className="text-2xl font-bold font-heading text-white mb-2 md:mb-4 md:text-5xl">
//             Our Mission
//           </h3>
//           <p className="text-gray-100 font-body leading-relaxed text-lg">
//             Our mission is to bring light into every dark part of the world. To
//             preach the Gospel, disciple believers, foster unity, and serve
//             communities through love, compassion, and excellence.
//           </p>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default VisionMission;
