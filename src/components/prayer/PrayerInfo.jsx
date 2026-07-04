import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const scriptures = [
  {
    text: "Confess your faults one to another, and pray one for another, that ye may be healed. The effectual fervent prayer of a righteous man availeth much.",
    verse: "James 5:16",
  },
  {
    text: "Again I say unto you, That if two of you shall agree on earth as touching any thing that they shall ask, it shall be done for them of my Father which is in heaven.",
    verse: "Matthew 18:20",
  },
  {
    text: "Wherefore comfort yourselves together, and edify one another. Whatever you are going through, we are here to lift you up before God.",
    verse: "1 Thessalonians 5:11",
  },
];

const PrayerInfo = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % scriptures.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center mb-6">
      <h2 className="text-xl font-semibold text-indigo-100 mb-4">
        You are not alone our prayer team stands with you in faith and in prayer.
      </h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <p className="italic text-white text-lg max-w-2xl mx-auto">
            "{scriptures[index].text}"
          </p>
          <p className="text-sm text-white mt-2">
            — {scriptures[index].verse}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PrayerInfo;