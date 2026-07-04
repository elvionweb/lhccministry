import { useState } from "react";
import { submitPrayer } from "../../utils/api";
import { toast } from "react-hot-toast";

const PrayerForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "Prayer Request",
    message: "",
    preferredDate: "",
    attachment: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Senior Tip: One handler to rule them all (Handles text, select, and files)
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "attachment") {
      setFormData((prev) => ({ ...prev, attachment: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.message.length < 10) {
      return toast.error(
        "Please provide a little more detail for your request.",
      );
    }

    setLoading(true);
    setError("");

    try {
      // We use FormData because we are sending a file (attachment) to the backend
      const payload = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) payload.append(key, formData[key]);
      });

      await submitPrayer(payload);
      toast.success("Request sent successfully!");
      onSuccess?.();
    } catch (err) {
      console.error("Prayer submit failed:", err);
      setError(
        "We encountered an issue. Please try again or check your connection.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

      <h2 className="text-2xl font-black text-blue-700 mb-6 text-center uppercase tracking-tight">
        Submit Your Request
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left"
      >
        <div className="md:col-span-1">
          <label htmlFor="prayer-name" className="text-[10px] font-bold text-gray-700 uppercase ml-2">
            Full Name
          </label>
          <input
            id="prayer-name"
            name="name"
            autoComplete="name"
            placeholder="Full Name"
            className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none transition-all font-medium"
            onChange={handleChange}
            required
          />
        </div>

        <div className="md:col-span-1">
          <label htmlFor="prayer-email" className="text-[10px] font-bold text-gray-700 uppercase ml-2">
            Email Address
          </label>
          <input
            id="prayer-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Your Email"
            className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none transition-all font-medium"
            onChange={handleChange}
            required
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="prayer-type" className="block text-[10px] font-bold text-gray-700 uppercase ml-2 mb-1">
            Request Category
          </label>
          <select
            id="prayer-type"
            name="type"
            /* Changed w-full to w-fit on mobile (min-width to fit text)
       Added md:w-full to keep the desktop look you like
    */
            className="w-fit min-w-[150px] md:w-full p-4 rounded-xl bg-gray-50 border border-gray-200 font-bold text-blue-700 outline-none"
            onChange={handleChange}
          >
            <option value="Prayer Request"> Just Prayer</option>
            <option value="Counseling"> Need Counseling</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="prayer-message" className="text-[10px] font-bold text-gray-700 uppercase ml-2">
            Message
          </label>
          <textarea
            id="prayer-message"
            name="message"
            placeholder="How can we stand in faith with you?"
            className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none h-32"
            onChange={handleChange}
            required
          />
        </div>

        {formData.type === "Counseling" && (
          <div className="md:col-span-2 animate-fade-in">
            <label htmlFor="prayer-date" className="text-xs font-bold text-gray-400 uppercase mb-2 block">
              Preferred Counseling Date
            </label>
            <input
              id="prayer-date"
              type="date"
              name="preferredDate"
              className="w-full p-4 rounded-xl bg-blue-50 border-2 border-blue-100 font-bold text-blue-800 outline-none"
              onChange={handleChange}
            />
          </div>
        )}

        <div className="md:col-span-2">
          <label htmlFor="prayer-attachment" className="text-xs font-bold text-gray-700 uppercase mb-2 block">
            Attachment (Medical reports, etc. - Optional)
          </label>
          <input
            id="prayer-attachment"
            type="file"
            name="attachment"
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 file:font-bold hover:file:bg-blue-100 cursor-pointer"
            onChange={handleChange}
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="md:col-span-2 bg-blue-700 w-fit mx-auto hover:bg-blue-800 text-white font-black py-4 px-6 rounded-xl shadow-lg transition-all transform active:scale-95 disabled:opacity-50 mt-4 tracking-widest"
        >
          {loading ? "SENDING TO ALTAR..." : "SUBMIT REQUEST"}
        </button>

        {error && (
          <p className="md:col-span-2 text-red-500 text-sm font-bold text-center mt-2">
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default PrayerForm;
