import React from "react";
import { motion } from "framer-motion";

const ChurchHistory = () => {
  return (
    <section
      className="relative overflow-hidden bg-neutral-900 bg-cover bg-center bg-no-repeat py-16 sm:py-20 md:py-28 lg:py-32"
      style={{ backgroundImage: "url('/lhccm.jpeg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75" />

      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-6 text-center font-heading text-3xl font-bold tracking-tight text-blue-100 sm:mb-8 sm:text-4xl md:text-5xl"
        >
          Our History
          <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-blue-300/70 sm:w-20" />
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-4 rounded-2xl bg-black/30 p-5 text-left font-body text-[15px] leading-7 text-white/95 backdrop-blur-sm sm:space-y-5 sm:p-8 sm:text-base sm:leading-8 md:text-lg md:text-justify md:hyphens-auto lg:p-10"
          style={{ hyphens: "auto" }}
        >
          <p>
            Liberty House Christian Centre was founded with a vision to create a
            place where people can encounter God, grow in faith, and serve
            humanity. Established on September 10th, 2002, and guided by divine
            inspiration, it began in a small rented storefront with a handful of
            congregants and has since grown remarkably.
          </p>

          <p>
            The church's relentless commitment to its mission has positioned it
            as a trailblazing force in the region, igniting spiritual
            awakenings and fostering revival in the hearts of countless people.
            At its core is an unwavering faith in the transformative power of
            God's word and the liberation it brings.
          </p>

          <p>
            Today, Liberty House Christian Centre oversees a thriving branch
            church and a growing campus fellowship in the vibrant city of Auchi,
            Edo State, Nigeria. The church stands firmly on its permanent site
            in Eyean, and a monumental prayer camp is currently under
            construction, a testament to the glory of God and the enduring
            impact of Liberty House Christian Centre.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ChurchHistory;






// import React from "react";
// import { motion } from "framer-motion";

// const ChurchHistory = () => {
//   return (
//     <section
//       className="relative overflow-hidden pt-23 md:pt-40 pb-10 md:pb-12 bg-white min-h-[60vh] sm:min-h-[70vh] md:min-h-[90vh]"
//       style={{
//         backgroundImage: "url('/lhccm.jpeg')",
//         backgroundSize: "contain",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/74 z-0"></div>

//       <div className="relative overflow-hidden z-10 max-w-7xl mx-auto px-7 md:px-3 sm:px-5 text-center">
//         <motion.h2
//           initial={{ opacity: 0, x: -200 }} // start 200px left (farther than default)
//           whileInView={{ opacity: 1, x: 0 }} // end at normal position
//           transition={{ duration: 1.5, ease: "easeOut" }} // slower, smooth
//           viewport={{ once: true }}
//           className="text-3xl md:text-5xl sm:text-4xl font-bold font-heading text-blue-100 mb-3 md:mb-6 sm:mb-4"
//         >
//           Our History
//         </motion.h2>

//         <motion.p
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           viewport={{ once: true }}
//           className=" text-white text-justify text-lg font-body leading-relaxed"
//         >
//           Liberty House Christian Centre was founded with a vision to create a
//           place where people can encounter God, grow in faith, and serve
//           humanity. Established on September 10th, 2002, guided by divine
//           inspiration. From its humble beginnings in a small rented storefront
//           with a handful of congregants, the church embarked on a journey of
//           remarkable growth and transformation. The church's relentless
//           commitment to its mission has positioned it as a trailblazing force in
//           the region, igniting spiritual awakenings and fostering revival within
//           the hearts of countless individuals. At the core of its beliefs lies
//           an unwavering faith in the transformative power of God's word and the
//           liberation it brings. Currently, Liberty House Christian Centre
//           oversees a thriving branch church and a burgeoning campus fellowship,
//           strategically located in the vibrant city of Auchi, Edo State,
//           Nigeria. Today, the church stands firmly rooted on its permanent site
//           in Eyean, symbolizing its unwavering dedication to spiritual and
//           numerical expansion. As a testament to its vision, a monumental prayer
//           camp is currently under construction, a testament to the glory of God
//           and the enduring impact of Liberty House Christian Centre.
//         </motion.p>
//       </div>
//     </section>
//   );
// };

// export default ChurchHistory;
