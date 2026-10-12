import React, { useState } from "react";

const SearchIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M21 21l-4.3-4.3M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
  </svg>
);

const SermonFilters = ({ sermons, setFiltered }) => {
  const [speaker, setSpeaker] = useState("");
  const [series, setSeries] = useState("");

  const handleFilter = () => {
    let result = sermons;

    if (speaker) {
      result = result.filter((s) =>
        s.speaker?.toLowerCase().includes(speaker.toLowerCase())
      );
    }

    if (series) {
      result = result.filter((s) =>
        s.series?.toLowerCase().includes(series.toLowerCase())
      );
    }

    setFiltered(result);
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30";

  return (
    <div className="mx-auto w-full max-w-4xl rounded-2xl border border-white/40 bg-white/85 p-4 shadow-xl backdrop-blur-md sm:p-5">
      <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto] lg:gap-4">
        <div className="min-w-0">
          <label
            htmlFor="filter-speaker"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-600"
          >
            Speaker
          </label>
          <input
            id="filter-speaker"
            type="text"
            placeholder="Filter by Speaker"
            value={speaker}
            onChange={(e) => setSpeaker(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="min-w-0">
          <label
            htmlFor="filter-series"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-600"
          >
            Series
          </label>
          <input
            id="filter-series"
            type="text"
            placeholder="Filter by Series"
            value={series}
            onChange={(e) => setSeries(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="flex items-center justify-center">
          <button
          onClick={handleFilter}
          className="inline-flex w-44 items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-blue-600 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 active:scale-95 sm:col-span-2 lg:col-span-1 lg:w-auto"
        >
          <SearchIcon />
          Apply
        </button>
        </div>
      </div>
    </div>
  );
};

export default SermonFilters;
