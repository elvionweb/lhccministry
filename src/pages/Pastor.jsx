import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Pastor() {
  const [view, setView] = useState("apostle");

  return (
    <div className="overflow-hidden min-h-screen bg-accent px-5 md:px-20 pt-20 md:pt-20 pb-6 sm:pb-8 md:pb-10 lg:pb-12"
    style={{
    backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.65)), url('/DandM5.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "57% 10%",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed"
  }}>
      {/* Toggle Button */}
      <div className="flex justify-center mb-5 md:mb-8">
        <button
          onClick={() => setView(view === "apostle" ? "wife" : "apostle")}
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-full shadow-xl transition-all duration-300 hover:scale-105"
        >
          {view === "apostle"
            ? "View Pastor Mrs. Irenosen E. Ojo →"
            : "← View Apostle Nosa Best Ojo"}
        </button>
      </div>

      {/* Animated Content */}
      <AnimatePresence mode="wait">
        {view === "apostle" ? (
          <motion.div
            key="apostle"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-7 md:gap-12 items-center"
          >
            {/* Image */}
            <div className="flex justify-center">
              <img
                src="/DGO.jpeg"
                alt="Apostle Nosa Best Ojo"
                className="rounded-3xl shadow-2xl w-full max-w-md md:max-w-sm object-cover"
              />
            </div>

            {/* Content */}
            <div>
              <h1 className="text-3xl font-heading text-center md:text-4xl font-bold text-blue-700 mb-2">
                Apostle Nosa Best Ojo
              </h1>

              <p className="text-gray-900 font-body leading-7 mb-4 md:text-lg">
                Apostle Nosa Best Ojo is a distinguished graduate of MTI College
                of Theology, SPIRIT & LIFE Bible College, and the Canada
                Institute of Chaplaincy, where he earned the prestigious title
                of Canadian Chaplain.
              </p>

              <p className="text-gray-900 leading-7 font-body mb-4 md:text-lg">
                Together with his spouse, he hosts the enlightening program
                “Destiny Call” on SpeedFM 96.6 and Facebook Live every Saturday
                from 7:30pm to 8:30pm. The program has fostered healing and
                restoration in families worldwide.
              </p>

              <p className="text-gray-900 font-body leading-7 mb-4 md:text-lg">
                He is the visionary leader of The Good Father Fellowship and The Women of Wonders Prayer Fellowship. He organizes conferences on marriage and singles and maintains two counseling offices in Benin City, offering invaluable relationship guidance.
              </p>

              <p className="text-gray-900 font-body leading-7 mb-4 md:text-lg">
                An accomplished author of 21 books including “Common Mistakes in Marriage,” “The Couple and the Home,” and “Breaking Out of an Average Life,” Apostle Nosa Best Ojo continues to impact lives globally.
              </p>

              <p className="text-gray-900 font-semibold md:text-lg">
                He shares a joyful marriage with Pastor Mrs. Irenosen E. Ojo,
                and they are blessed with four wonderful children.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="wife"
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-7 md:gap-12 items-center"
          >
            {/* Image */}
            <div className="flex justify-center">
              <img
                src="/MGO1.jpeg"
                alt="Pastor Mrs. Irenosen E. Ojo"
                className="rounded-3xl shadow-2xl w-full max-w-md md:max-w-sm object-cover"
              />
            </div>

            {/* Content */}
            <div>
              <h1 className="text-3xl md:text-4xl text-center font-bold font-heading text-blue-700 mb-3">
                Pstr Mrs. Irenosen E. Ojo
              </h1>

              <p className="text-gray-900 leading-7 mb-4 md:text-lg">
                Pastor Mrs. Irenosen E. Ojo is a distinguished pastor and esteemed member of the Canadian Christian Chaplain Organization.She holds a professional foundation as a Registered Nurse and Registered Midwife (RN/RM).
              </p>

              <p className="text-gray-900 leading-7 mb-4 md:text-lg">
                She is a co-author of several books focused on preparing individuals for marriage, nurturing healthy relationships, and enriching the lives of married couples.
              </p>

              <p className="text-gray-900 font-body leading-7 mb-4 md:text-lg">
                Her humanitarian passion is reflected in her dedication to empowering women and girls, equipping them with the tools to exceed societal expectations.
              </p>

              <p className="text-gray-900 font-body leading-7 mb-4 md:text-lg">
                She is a respected keynote speaker at conferences and seminars
                across denominations within and beyond Nigeria.
              </p>

              <p className="text-gray-900 font-semibold md:text-lg">
                She shares a harmonious and fulfilling marriage with Apostle
                Nosa Best Ojo, and together they are blessed with four
                remarkable children.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
