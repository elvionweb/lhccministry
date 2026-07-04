import { useState, useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { uploadImage } from "../../utils/api";

const EventForm = ({ initialData, onSubmit }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    bannerImage: "", 
  });
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // 1. Cleanup ObjectURLs to prevent memory leaks
  const preview = useMemo(() => {
    return form.bannerImage || null;
  }, [form.bannerImage]);

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        date: initialData.date ? initialData.date.split("T")[0] : "",
        time: initialData.time || "",
        location: initialData.location || "",
        category: initialData.category || "",
        bannerImage: initialData.bannerImage || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      toast.error("Image too large. Keep it under 5MB.");
      return;
    }
    
    if (selectedFile) {
      setUploading(true);
      try {
        const secureUrl = await uploadImage(selectedFile);
        setForm((prev) => ({ ...prev, bannerImage: secureUrl }));
      } catch (err) {
        toast.error("Failed to upload image.");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(form);
    } catch (err) {
      toast.error("Form submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Title Input */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-blue-500 uppercase mb-2 ml-1">Event Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Sunday Celebration Service"
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
            required
          />
        </div>

        {/* Description Input */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-blue-500 uppercase mb-2 ml-1">Event Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Detailed description of the event..."
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium resize-none h-32"
            required
          ></textarea>
        </div>

        {/* Date & Time */}
        <div className="col-span-1">
          <label className="block text-xs font-bold text-blue-500 uppercase mb-2 ml-1">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-gray-700"
            required
          />
        </div>

        <div className="col-span-1">
          <label className="block text-xs font-bold text-blue-500 uppercase mb-2 ml-1">Time</label>
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-gray-700"
            required
          />
        </div>

        {/* Location & Category */}
        <div className="col-span-1">
          <label className="block text-xs font-bold text-blue-500 uppercase mb-2 ml-1">Venue / Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="The Main Sanctuary"
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
            required
          />
        </div>

        <div className="col-span-1">
          <label className="block text-xs font-bold text-blue-500 uppercase mb-2 ml-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-gray-600"
            required
          >
            <option value="">Select Category</option>
            <option value="Service">Church Service</option>
            <option value="Concert">Concert</option>
            <option value="Conference">Conference</option>
            <option value="Special">Special Event</option>
          </select>
        </div>

        {/* Banner Upload Area */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-blue-500 uppercase mb-2 ml-1">Event Banner</label>
          <div className="relative group border-2 border-dashed border-gray-200 rounded-3xl p-4 hover:border-blue-400 transition-colors bg-gray-50">
            {preview ? (
              <div className="relative h-48 w-full overflow-hidden rounded-2xl">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  onClick={() => setForm(f => ({ ...f, bannerImage: "" }))}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-48 cursor-pointer">
                <PhotoIcon className="w-12 h-12 text-gray-300 group-hover:text-blue-500 transition-colors" />
                <span className="mt-2 text-sm text-gray-500 font-medium">Click to upload banner</span>
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-hidden flex items-center justify-center">
<button
        type="submit"
        disabled={loading || uploading}
        className="w-48 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-xl transition-all transform active:scale-95 disabled:opacity-50 tracking-widest uppercase"
      >
        {uploading ? "Uploading Image..." : loading ? "Syncing Data..." : initialData ? "Confirm Changes" : "Create Event"}
      </button>
      </div>
    </form>
  );
};

export default EventForm;