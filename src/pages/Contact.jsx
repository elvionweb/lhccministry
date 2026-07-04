// src/pages/Contact.jsx
import ContactForm from "../components/contact/ContactForm";
import ContactMap from "../components/contact/ContactMap";
import { motion } from "framer-motion";
import ContactSocials from "../components/contact/ContactSocials";
import DandM2 from "../assets/DandM2.jpeg";

const Contact = () => {
  return (
    <main
      className="overflow-hidden px-4 md:px-0 py-6"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/lhcc.jpeg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed", // Optional: keeps background still while scrolling
      }}
    >
      {/* Page Header */}
      <div className="text-center mb-8 mt-6">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-gray-100 mb-3"
        >
          Contact Us
        </motion.h1>
      </div>

      <div className="relative mb-4 md:mb-10">
        <img
          src={DandM2}
          alt="Church Contact"
          className="w-full h-124 md:h-168 object-cover md:object-[50%_12%] sm:object-[50%_16%] rounded-xl shadow"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 rounded-xl"></div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
          className="absolute inset-0 flex flex-col justify-center items-center text-center px-10 md:px-12 pt-14 md:pt-32"
        >
          {/* Top heading */}
          <h2 className="text-1xl md:text-3xl font-medium font-body text-white mb-4 md:mb-8">
            We would love to hear from you. Feel free to reach out using the
            below details.
          </h2>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 text-white">
            {/* Left column */}
            <div>
              <h3 className="text-2xl font-body font-medium mb-0 md:mb-2">
                Get in touch
              </h3>
              <p className=" md:text-xl">+234 803 655 3571</p>
              <p className=" md:text-xl">+234 805 634 4025</p>
              <p className=" md:text-xl">contact@lhccministry.org</p>
            </div>

            {/* Right column */}
            <div>
              <h3 className="text-2xl font-body font-medium mb-0 md:mb-2 ">
                Days and Hours
              </h3>
              <p className="font-body md:text-xl">7am on Sundays</p>
              <p className="font-body md:text-xl">7am on Sundays</p>
              <p className="font-body md:text-xl mb-6">7am on Sundays</p>

              <h3 className="text-2xl font-body font-medium mb-1 mt-3">
                Address
              </h3>
              <p className="mt-1 font-body">
                1 Liberty Way, Before Pipeline Junction, Benin Auchi Road,
                Eyaen, Benin City, Nigeria
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
        <ContactForm />
        <div className="space-y-4 md:space-y-8">
          <ContactMap />
          <ContactSocials />
        </div>
      </div>
    </main>
  );
};

export default Contact;
