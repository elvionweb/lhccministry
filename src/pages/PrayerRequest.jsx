import { useState } from "react";
import PrayerForm from "../components/prayer/PrayerForm";
import PrayerInfo from "../components/prayer/PrayerInfo";
import PrayerSuccess from "../components/prayer/PrayerSuccess";

const PrayerRequests = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div
      className="py-10 px-4 bg-cover bg-center relative"
      style={{ backgroundImage: "url('/lhcc26.jpeg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative">
        <PrayerInfo />

        {!submitted ? (
          <PrayerForm onSuccess={() => setSubmitted(true)} />
        ) : (
          <PrayerSuccess />
        )}
      </div>
    </div>
  );
};

export default PrayerRequests;