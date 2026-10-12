/* `icon` is optional (pass any element, e.g. <HiUsers />); nothing changes if you skip it */
const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="group relative isolate overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6">
      {/* accent bar */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400"
      />
      {/* decorative glow */}
      <div
        aria-hidden="true"
        className="absolute -right-8 -top-8 -z-10 h-28 w-28 rounded-full bg-blue-100/70 blur-2xl transition-transform duration-500 group-hover:scale-125"
      />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold uppercase tracking-wider text-gray-500 sm:text-sm">
            {title}
          </p>
          <h3 className="mt-2 break-words text-3xl font-extrabold tabular-nums leading-tight text-gray-900 sm:text-4xl">
            {value}
          </h3>
        </div>

        {icon && (
          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-xl text-white shadow-md sm:h-12 sm:w-12"
          >
            {icon}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatsCard;


