// src/pages/Contact.jsx
import ContactForm from "../components/contact/ContactForm";
import ContactMap from "../components/contact/ContactMap";
import { motion, useReducedMotion } from "framer-motion";
import ContactSocials from "../components/contact/ContactSocials";
import DandM2 from "../assets/DandM2.jpeg";

/* ---------------------------------------------------------------
   Static content (display only — edit freely)
---------------------------------------------------------------- */
const PHONES = ["+234 803 655 3571", "+234 805 634 4025"];
const EMAIL = "contact@lhccministry.org";
const SERVICE_TIMES = ["7am on Sundays", "7am on Sundays", "7am on Sundays"];
const ADDRESS =
  "1 Liberty Way, Before Pipeline Junction, Benin Auchi Road, Eyaen, Benin City, Nigeria";

/* ---------------------------------------------------------------
   Small inline icons
---------------------------------------------------------------- */
const Icon = ({ d }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <path d={d} />
  </svg>
);
const PhoneIcon = () => (
  <Icon d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
);
const MailIcon = () => (
  <Icon d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6" />
);
const ClockIcon = () => (
  <Icon d="M12 6v6l4 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z" />
);
const PinIcon = () => (
  <Icon d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
);

/* ---------------------------------------------------------------
   Info card
---------------------------------------------------------------- */
const InfoCard = ({ icon, title, children, index, reduce }) => (
  <motion.div
    initial={{ opacity: 0, y: reduce ? 0 : 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.08 }}
    className="group flex h-full flex-col rounded-2xl border border-white/40 bg-white/90 p-5 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-6"
  >
    <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700 text-white shadow-md transition-transform duration-300 group-hover:scale-110">
      {icon}
    </span>
    <h3 className="mb-2 font-heading text-lg font-bold text-gray-900 sm:text-xl">
      {title}
    </h3>
    <div className="space-y-1 font-body text-sm text-gray-700 sm:text-base">
      {children}
    </div>
  </motion.div>
);

const linkClass =
  "block break-words font-medium text-gray-800 transition-colors hover:text-blue-700 focus:outline-none focus-visible:underline";

/* ---------------------------------------------------------------
   Page
---------------------------------------------------------------- */
const Contact = () => {
  const reduce = useReducedMotion();

  return (
    <main className="relative isolate min-h-screen overflow-x-hidden">
      {/* Fixed background layers (iOS-safe) */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/lhcc.jpeg')" }}
      />
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/60 to-black/80"
      />

      <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pb-20 md:pt-28 lg:px-8">
        {/* ---------- Hero ---------- */}
        <motion.section
          initial={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/20"
        >
          <img
            src={DandM2}
            alt="Liberty House Christian Center"
            className="h-72 w-full object-cover object-[50%_16%] sm:h-80 md:h-96 md:object-[50%_12%] lg:h-[28rem]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center sm:px-10">
            <motion.p
              initial={{ opacity: 0, y: reduce ? 0 : -16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300 sm:text-sm"
            >
              Get In Touch
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: reduce ? 0 : -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="mt-2 font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
            >
              Contact Us
            </motion.h1>

            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-amber-300" />

            <motion.p
              initial={{ opacity: 0, y: reduce ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
              className="mt-4 max-w-2xl font-body text-sm leading-6 text-gray-100 sm:text-base md:text-xl md:leading-8"
            >
              We would love to hear from you. Feel free to reach out using the
              details below.
            </motion.p>
          </div>
        </motion.section>

        {/* ---------- Info cards (overlap the hero on large screens) ---------- */}
        <section
          aria-label="Contact details"
          className="relative z-10 mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:-mt-14 lg:gap-6 xl:grid-cols-4"
        >
          <InfoCard index={0} reduce={reduce} icon={<PhoneIcon />} title="Get in touch">
            {PHONES.map((p) => (
              <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className={linkClass}>
                {p}
              </a>
            ))}
          </InfoCard>

          <InfoCard index={1} reduce={reduce} icon={<MailIcon />} title="Email us">
            <a href={`mailto:${EMAIL}`} className={linkClass}>
              {EMAIL}
            </a>
          </InfoCard>

          <InfoCard index={2} reduce={reduce} icon={<ClockIcon />} title="Days and Hours">
            {SERVICE_TIMES.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </InfoCard>

          <InfoCard index={3} reduce={reduce} icon={<PinIcon />} title="Address">
            <p className="leading-6">{ADDRESS}</p>
          </InfoCard>
        </section>

        {/* ---------- Form + Map/Socials (components untouched) ---------- */}
        <section
          aria-label="Send us a message"
          className="mt-10 grid grid-cols-1 items-start gap-6 sm:mt-14 md:gap-8 lg:grid-cols-2 lg:gap-12"
        >
          <div className="min-w-0">
            <ContactForm />
          </div>
          <div className="min-w-0 space-y-6 md:space-y-8">
            <ContactMap />
            <ContactSocials />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Contact;
