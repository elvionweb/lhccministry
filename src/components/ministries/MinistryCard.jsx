import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Full-bleed image card with a styled contact panel.
 *
 * Optional per-ministry field in your data:
 *   imagePosition: "center top" | "center 20%" | "50% 30%" ...
 */

/* ---------- tiny inline icons ---------- */
const Icon = ({ d, className = "h-5 w-5" }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d={d} />
  </svg>
);
const CalendarIcon = (p) => (
  <Icon {...p} d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
);
const PhoneIcon = (p) => (
  <Icon
    {...p}
    d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"
  />
);
const ChatIcon = (p) => (
  <Icon {...p} d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.7-5.4A8.5 8.5 0 1 1 21 11.5z" />
);
const ArrowIcon = (p) => <Icon {...p} className="h-4 w-4" d="M5 12h14M13 6l6 6-6 6" />;

/* ---------- helpers ---------- */
const initials = (name = "") =>
  name
    .replace(/\b(Mr|Mrs|Ms|Pastor|Evangelist|Dr)\.?\s+/gi, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

// +2347060482851 -> +234 706 048 2851 (falls back to the raw value otherwise)
const formatNumber = (raw = "") => {
  const d = raw.replace(/\D/g, "");
  if (d.startsWith("234") && d.length === 13) {
    return `+234 ${d.slice(3, 6)} ${d.slice(6, 9)} ${d.slice(9)}`;
  }
  return raw;
};

/* ---------- a single tappable contact row ---------- */
const ContactRow = ({ href, icon, label, value, tone, external }) => {
  const tones = {
    green:
      "bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-600",
    blue: "bg-blue-50 text-blue-800 hover:bg-blue-100 ring-1 ring-inset ring-blue-200 focus-visible:ring-blue-700",
  };
  const iconTones = {
    green: "bg-white/20 text-white",
    blue: "bg-blue-700 text-white",
  };
  const subTones = { green: "text-green-100", blue: "text-blue-700/80" };

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group/row flex items-center gap-3 rounded-xl px-3 py-2.5 shadow-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] ${tones[tone]}`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconTones[tone]}`}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className={`block text-[11px] font-semibold uppercase tracking-wider ${subTones[tone]}`}>
          {label}
        </span>
        <span className="block truncate text-sm font-bold tabular-nums sm:text-[15px]">
          {value}
        </span>
      </span>
      <span className="shrink-0 transition-transform duration-200 group-hover/row:translate-x-0.5">
        <ArrowIcon />
      </span>
    </a>
  );
};

/* ---------- card ---------- */
const MinistryCard = ({ ministry, index = 0 }) => {
  const reduce = useReducedMotion();
  const [imgFailed, setImgFailed] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    name,
    description = "",
    image,
    imagePosition = "center top",
    meetingDay,
    time,
    leaderName,
    leaderContact,
    whatsappLink,
  } = ministry;

  const digits = (leaderContact || "").replace(/\D/g, "");
  const joinHref =
    whatsappLink ||
    (digits
      ? `https://wa.me/${digits}?text=${encodeURIComponent(
          `Hello, I want to join the ${name}`
        )}`
      : undefined);
  const telHref = leaderContact ? `tel:${leaderContact}` : undefined;
  const prettyNumber = formatNumber(leaderContact);

  const canExpand = description.length > 160;

  return (
    <motion.article
      initial={{ opacity: 0, y: reduce ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay: (index % 3) * 0.08 }}
      className="group relative isolate flex h-full min-h-[460px] flex-col overflow-hidden rounded-2xl bg-indigo-900 shadow-lg ring-1 ring-white/10 transition-shadow duration-300 hover:shadow-2xl"
    >
      {/* ---------- Background image ---------- */}
      <div className="absolute inset-0 -z-10">
        {image && !imgFailed ? (
          <img
            src={image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
            style={{ objectPosition: imagePosition }}
            className="h-full w-full object-cover transition-transform duration-700 ease-out motion-safe:[@media(hover:hover)]:group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-indigo-700 to-indigo-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/60 to-black/90" />
      </div>

      {/* ---------- Content ---------- */}
      <div className="flex h-full flex-col p-5 text-white sm:p-6">
        {/* meeting badge */}
        <span className="mb-3 inline-flex w-fit max-w-full items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-md">
          <CalendarIcon className="h-3.5 w-3.5 shrink-0 text-amber-300" />
          <span className="truncate">
            {[meetingDay, time].filter(Boolean).join(" · ") || "Contact the leader"}
          </span>
        </span>

        <h3 className="mb-2 font-heading text-xl font-bold leading-tight drop-shadow sm:text-2xl">
          {name}
        </h3>

        <p
          className={`mb-2 text-sm leading-6 opacity-95 sm:text-[15px] ${
            open ? "" : "line-clamp-4"
          }`}
        >
          {description}
        </p>

        {canExpand && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="mb-3 self-start text-sm font-semibold text-amber-300 hover:text-amber-200 focus:outline-none focus-visible:underline"
          >
            {open ? "Show less" : "Read more"}
          </button>
        )}

        <div className="flex-grow" />

        {/* ---------- Leader & contact panel ---------- */}
        <div className="mt-4 rounded-2xl border border-white/30 bg-white/95 p-3.5 text-gray-900 shadow-lg backdrop-blur-md sm:p-4">
          {/* leader */}
          <div className="flex items-center gap-3">
            <div
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-sm font-bold text-white shadow"
            >
              {initials(leaderName)}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                Ministry Leader
              </p>
              <p className="truncate text-sm font-bold text-gray-900 sm:text-base">
                {leaderName}
              </p>
            </div>
          </div>

          {/* contact rows */}
          {(joinHref || telHref) && (
            <div className="mt-3 flex flex-col gap-2 border-t border-gray-200 pt-3">
              {joinHref && (
                <ContactRow
                  href={joinHref}
                  external
                  tone="green"
                  icon={<ChatIcon />}
                  label="Join on WhatsApp"
                  value={prettyNumber}
                />
              )}
              {telHref && (
                <ContactRow
                  href={telHref}
                  tone="blue"
                  icon={<PhoneIcon />}
                  label="Call leader"
                  value={prettyNumber}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default MinistryCard;
