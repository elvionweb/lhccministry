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

  const labelClass =
    "mb-2 ml-1 block text-xs font-bold uppercase tracking-wider text-blue-700";
  const fieldClass =
    "w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/30 sm:text-base";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        
        {/* Title Input */}
        <div className="min-w-0 sm:col-span-2">
          <label htmlFor="event-form-title" className={labelClass}>Event Title</label>
          <input
            id="event-form-title"
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Sunday Celebration Service"
            className={`${fieldClass} font-medium`}
            required
          />
        </div>

        {/* Description Input */}
        <div className="min-w-0 sm:col-span-2">
          <label htmlFor="event-form-description" className={labelClass}>Event Description</label>
          <textarea
            id="event-form-description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Detailed description of the event..."
            className={`${fieldClass} h-36 resize-y font-medium leading-7`}
            required
          ></textarea>
        </div>

        {/* Date & Time */}
        <div className="col-span-1 min-w-0">
          <label htmlFor="event-form-date" className={labelClass}>Date</label>
          <input
            id="event-form-date"
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className={`${fieldClass} font-bold text-gray-700`}
            required
          />
        </div>

        <div className="col-span-1 min-w-0">
          <label htmlFor="event-form-time" className={labelClass}>Time</label>
          <input
            id="event-form-time"
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className={`${fieldClass} font-bold text-gray-700`}
            required
          />
        </div>

        {/* Location & Category */}
        <div className="col-span-1 min-w-0">
          <label htmlFor="event-form-location" className={labelClass}>Venue / Location</label>
          <input
            id="event-form-location"
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="The Main Sanctuary"
            className={`${fieldClass} font-medium`}
            required
          />
        </div>

        <div className="col-span-1 min-w-0">
          <label htmlFor="event-form-category" className={labelClass}>Category</label>
          <select
            id="event-form-category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className={`${fieldClass} font-bold text-gray-600`}
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
        <div className="min-w-0 sm:col-span-2">
          <span className={labelClass}>Event Banner</span>
          <div className="group relative rounded-3xl border-2 border-dashed border-gray-300 bg-gray-50 p-3 transition-colors hover:border-blue-400 hover:bg-blue-50/40 sm:p-4">
            {preview ? (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl sm:aspect-[21/9]">
                <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                <button 
                  type="button"
                  aria-label="Remove banner image"
                  onClick={() => setForm(f => ({ ...f, bannerImage: "" }))}
                  className="absolute right-2 top-2 rounded-full bg-red-500 p-1.5 text-white shadow-lg transition hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 active:scale-90"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
                {uploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <span className="h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-white" />
                  </div>
                )}
              </div>
            ) : (
              <label className="relative flex min-h-[10rem] cursor-pointer flex-col items-center justify-center rounded-2xl px-3 py-8 text-center focus-within:ring-2 focus-within:ring-blue-600 sm:min-h-[12rem]">
                {uploading ? (
                  <>
                    <span className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-700" />
                    <span className="mt-3 text-sm font-semibold text-blue-700">Uploading...</span>
                  </>
                ) : (
                  <>
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-700 transition-transform group-hover:scale-110">
                      <PhotoIcon className="h-7 w-7" />
                    </span>
                    <span className="mt-3 text-sm font-semibold text-gray-700">Click to upload banner</span>
                    <span className="mt-1 text-xs text-gray-500">Max 5MB · Wide images look best</span>
                  </>
                )}
                <input type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
              </label>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center border-t border-gray-100 pt-6">
        <button
          type="submit"
          disabled={loading || uploading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl transition-all hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:min-w-[14rem]"
        >
          {(loading || uploading) && (
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
            />
          )}
          {uploading ? "Uploading Image..." : loading ? "Syncing Data..." : initialData ? "Confirm Changes" : "Create Event"}
        </button>
      </div>
    </form>
  );
};

export default EventForm;
