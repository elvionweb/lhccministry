import React, { useState } from "react";

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

  return (
    <div className="overflow-hidden bg-gray-100 p-3 md:p-4 rounded-md flex flex-wrap gap-4 justify-center">
      <input
        type="text"
        placeholder="Filter by Speaker"
        value={speaker}
        onChange={(e) => setSpeaker(e.target.value)}
        className="w-34 md:w-48 px-2 py-2 rounded-md border"
      />

      <input
        type="text"
        placeholder="Filter by Series"
        value={series}
        onChange={(e) => setSeries(e.target.value)}
        className="w-32 md:w-48 px-2 py-2 rounded-md border"
      />

      <button
        onClick={handleFilter}
        className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Apply
      </button>
    </div>
  );
};

export default SermonFilters;
