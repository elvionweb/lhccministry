import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const leaders = [
  {
    name: "Apostle Nosa Best Ojo",
    role: "General Overseer & Senior Pastor",
    image: "/papago.jpeg",
  },
  {
    name: "Irenosen E. Ojo",
    role: "General Overseer & Senior Pastor",
    image: "/mummygo.jpeg",
  },
   {
    name: "Ebosetale John Ehichioya",
    role: "Sapele Rd Branch Church Pastor",
    image: "/john.jpeg",
  },
  {
    name: "Ehimwenma Omoregbee Blessed",
    role: "Pastor",
    image: "/blessed.jpeg",
  },
  {
    name: "Eyabrano Matthew Ukori",
    role: "Pastor",
    image: "/lhcc21.jpeg",
  },
  {
    name: "Humphrey Omorogbe Erhahon",
    role: "Pastor",
    image: "/hunphrey.jpeg",
  },
  {
    name: "Dr. Iriagbonse Sharon Ojo",
    role: "National Teenagers Pastor",
    image: "/sharon.jpeg",
  },
  {
    name: "Ikewuchi Sunday",
    role: "Pastor",
    image: "/lhcc26.jpeg",
  },
  {
    name: "Edokpayi Monday",
    role: "Pastor",
    image: "/pst monday.jpeg",
  },
  {
    name: "Iyere Bravo Bright",
    role: "Pastor",
    image: "/bright.jpeg",
  },
  {
    name: "Fredrick Okpiabhele Ubhimiye",
    role: "Pastor",
    image: "/fred.jpeg",
  },
  {
    name: "Prosper Onosetalese Ikhuoria",
    role: "Pastor",
    image: "/lhcc26.jpeg",
  },
  {
    name: "Idemudia Osaigbovo",
    role: "Pastor",
    image: "/lhcc26.jpeg",
  },
  {
    name: "Mrs Osaigbovo Magdalene",
    role: "Youth Pastor",
    image: "/lhcc26.jpeg",
  },
  {
    name: "Daniel Amanokhai",
    role: "Pastor",
    image: "/dan.jpeg",
  },
  {
    name: "Mrs Sandra Ikhayere Emmanuel",
    role: "Pastor",
    image: "/sandra2.jpeg",
  },
];

const LeadershipTeam = () => {
  return (
    <section
      className="py-10 sm:py-14 bg-primary/15"
      style={{
        backgroundImage: "url('/lhcc7.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-8xl mx-auto px-3 sm:px-4 md:px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -200 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-5xl font-bold font-heading text-white mb-6 md:mb-12 px-2"
        >
          Pastors & Leadership
        </motion.h2>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2700, disableOnInteraction: false }}
          loop={true}
          spaceBetween={16}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 16 },
            480: { slidesPerView: 1, spaceBetween: 20 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 28 },
            1280: { slidesPerView: 4, spaceBetween: 30 },
          }}
          className="pb-2"
        >
          {leaders.map((leader, index) => (
            <SwiperSlide key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg text-center h-full flex flex-col items-center justify-center mx-auto max-w-[280px] sm:max-w-none"
              >
                <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-60 lg:h-60 mx-auto mb-3 sm:mb-4 overflow-hidden rounded-full shadow-md flex-shrink-0">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-[50%_20%]"
                  />
                </div>

                <h4 className="font-semibold text-base sm:text-lg md:text-xl italic text-blue-700 leading-snug">
                  {leader.name}
                </h4>

                <p className="text-sm sm:text-base text-cyan-800 font-medium mt-1">
                  {leader.role}
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default LeadershipTeam;



// import React from "react";
// import { motion } from "framer-motion";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";

// const leaders = [
//   {
//     name: "Apostle Nosa Best Ojo",
//     role: "General Overseer & Senior Pastor",
//     image: "/papago.jpeg",
//   },
//   {
//     name: "Irenosen E. Ojo",
//     role: "General Overseer & Senior Pastor",
//     image: "/mummygo.jpeg",
//   },
//    {
//     name: "Ebosetale John Ehichioya",
//     role: "Sapele Rd Branch Church Pastor",
//     image: "/john.jpeg",
//   },
//   {
//     name: "Ehimwenma Omoregbee Blessed",
//     role: "Pastor",
//     image: "/blessed.jpeg",
//   },
//   {
//     name: "Eyabrano Matthew Ukori",
//     role: "Pastor",
//     image: "/lhcc21.jpeg",
//   },
//   {
//     name: "Humphrey Omorogbe Erhahon",
//     role: "Pastor",
//     image: "/hunphrey.jpeg",
//   },
//   {
//     name: "Dr. Iriagbonse Sharon Ojo",
//     role: "National Teenagers Pastor",
//     image: "/sharon.jpeg",
//   },
//   {
//     name: "Ikewuchi Sunday",
//     role: "Pastor",
//     image: "/lhcc26.jpeg",
//   },
//   {
//     name: "Edokpayi Monday",
//     role: "Pastor",
//     image: "/pst monday.jpeg",
//   },
//   {
//     name: "Iyere Bravo Bright",
//     role: "Pastor",
//     image: "/bright.jpeg",
//   },
//   {
//     name: "Fredrick Okpiabhele Ubhimiye",
//     role: "Pastor",
//     image: "/fred.jpeg",
//   },
//   {
//     name: "Prosper Onosetalese Ikhuoria",
//     role: "Pastor",
//     image: "/lhcc26.jpeg",
//   },
//   {
//     name: "Idemudia Osaigbovo",
//     role: "Pastor",
//     image: "/lhcc26.jpeg",
//   },
//   {
//     name: "Mrs Osaigbovo Magdalene",
//     role: "Youth Pastor",
//     image: "/lhcc26.jpeg",
//   },
//   {
//     name: "Daniel Amanokhai",
//     role: "Pastor",
//     image: "/dan.jpeg",
//   },
//   {
//     name: "Mrs Sandra Ikhayere Emmanuel",
//     role: "Pastor",
//     image: "/sandra2.jpeg",
//   },
// ];

// const LeadershipTeam = () => {
//   return (
//     <section
//       className="py-14 bg-primary/15"
//       style={{
//         backgroundImage: "url('/lhcc7.jpeg')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <div className="max-w-8xl mx-auto px-4 md:px-6 text-center">
//         <motion.h2
//           initial={{ opacity: 0, y: -200 }} 
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1.5, ease: "easeOut" }}
//           viewport={{ once: true }}
//           className="text-3xl md:text-5xl sm:text-4xl font-bold font-heading text-white mb-6 md:mb-12"
//         >
//           Pastors & Leadership
//         </motion.h2>

//         <Swiper
//           modules={[Autoplay]}
//           autoplay={{ delay: 2700, disableOnInteraction: false }}
//           loop={true}
//           spaceBetween={30}
//           breakpoints={{
//             0: { slidesPerView: 1 },
//             768: { slidesPerView: 2 },
//           }}
//         >
//           {leaders.map((leader, index) => (
//             <SwiperSlide key={index}>
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ type: "spring", stiffness: 200 }}
//                 className="bg-white p-8 rounded-2xl shadow-lg text-center"
//               >
//                 <div className="w-80 h-80 md:w-65 md:h-65 mx-auto mb-4 overflow-hidden rounded-full shadow-md">
//                   <img
//                     src={leader.image}
//                     alt={leader.name}
//                     loading="lazy"
//                     className="w-full h-full object-cover object-[50%_20%]"
//                   />
//                 </div>

//                 <h4 className="font-semibold text-xl italic text-blue-700">
//                   {leader.name}
//                 </h4>

//                 <p className="text-cyan-800 font-medium">{leader.role}</p>
//               </motion.div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </section>
//   );
// };

// export default LeadershipTeam;
