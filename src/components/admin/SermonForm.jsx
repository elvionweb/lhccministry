import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast"; // For professional feedback
import { VideoCameraIcon, PhotoIcon, CalendarIcon, UserIcon } from "@heroicons/react/24/outline";

const SermonForm = ({ initialData, onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    title: "",
    preacher: "",
    date: new Date().toISOString().split("T")[0],
    series: "",
    category: "",
    videoUrl: "",
    thumbnailUrl: "",
  });

  // Effect to sync initialData when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        preacher: initialData.preacher || "",
        date: initialData.date ? new Date(initialData.date).toISOString().split("T")[0] : "",
        series: initialData.series || "",
        category: initialData.category || "",
        videoUrl: initialData.videoUrl || "",
        thumbnailUrl: initialData.thumbnailUrl || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation logic
    if (!formData.videoUrl.includes("http")) {
      return toast.error("Please provide a valid URL for the video.");
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 space-y-6">
      
      {/* Grid Layout for better spacing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Title Field */}
        <div className="md:col-span-2">
          <label className="block text-xs font-black uppercase text-blue-500 tracking-widest mb-2 ml-1">Sermon Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., The Grace of God"
            className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium transition-all"
            required
          />
        </div>

        {/* Preacher Field */}
        <div>
          <label className="block text-xs font-black uppercase text-blue-500 tracking-widest mb-2 ml-1">Name of Preacher</label>
          <div className="relative">
            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
            <input
              type="text"
              name="preacher"
              value={formData.preacher}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              required
            />
          </div>
        </div>

        {/* Date Field */}
        <div>
          <label className="block text-xs font-black uppercase text-blue-500 tracking-widest mb-2 ml-1">Service Date</label>
          <div className="relative">
            <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              required
            />
          </div>
        </div>

        {/* Video URL Field */}
        <div className="md:col-span-2">
          <label className="block text-xs font-black uppercase text-blue-500 tracking-widest mb-2 ml-1">Video link (YouTube/Vimeo)</label>
          <div className="relative">
            <VideoCameraIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
            <input
              type="url"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              placeholder="https://youtube.com/..."
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-sm"
              required
            />
          </div>
        </div>

        {/* Thumbnail Preview Area */}
        <div className="md:col-span-2">
          <label className="block text-xs font-black uppercase text-blue-500 tracking-widest mb-2 ml-1">Thumbnail Preview</label>
          <div className="mt-2 flex flex-col sm:flex-row gap-4 items-start">
            <div className="w-full sm:w-48 aspect-video bg-gray-100 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 flex items-center justify-center">
              {formData.thumbnailUrl ? (
                <img src={formData.thumbnailUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <PhotoIcon className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <div className="flex-1 w-full">
              <input
                type="url"
                name="thumbnailUrl"
                value={formData.thumbnailUrl}
                onChange={handleChange}
                placeholder="Paste Image URL here..."
                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-xs"
                required
              />
              <p className="mt-2 text-[10px] text-gray-700 italic">Recommended: 1280x720px (16:9 aspect ratio)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="pt-4 flex justify-center items-center">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-48 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-sm transition-all shadow-lg shadow-blue-100
            ${isLoading 
              ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
              : "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]"
            }`}
        >
          {isLoading ? "Processing..." : initialData ? "Update Sermon Archive" : "Publish Sermon"}
        </button>
      </div>
    </form>
  );
};

export default SermonForm;
