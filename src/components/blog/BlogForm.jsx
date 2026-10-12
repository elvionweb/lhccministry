import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";

const BlogForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    date: new Date().toISOString().split("T")[0],
    time: "",
    category: "",
    content: "",
    image: "" // This stores the URL from backend/Cloudinary
  });

  const [file, setFile] = useState(null); // Actual file for upload
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        author: initialData.author || "",
        date: initialData.date ? initialData.date.split("T")[0] : "",
        time: initialData.time || "",
        category: initialData.category || "",
        content: initialData.content || "",
        image: initialData.image || ""
      });
      setPreview(initialData.image || "");
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      if (selected.size > 2 * 1024 * 1024) { // 2MB Limit
        return toast.error("File is too large. Max 2MB.");
      }
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create FormData to send both text and the file
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      if (file) data.append("image", file); // Backend expects 'image' field

      await onSubmit(data);
    } catch (err) {
      toast.error("Failed to save blog post.");
    } finally {
      setLoading(false);
    }
  };

  const labelClass =
    "mb-2 block text-xs font-bold uppercase tracking-wider text-gray-600";
  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/30 sm:text-base";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left">
      <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
        {/* Title */}
        <div className="min-w-0 md:col-span-2">
          <label htmlFor="blog-title" className={labelClass}>
            Blog Title <span className="text-red-500">*</span>
          </label>
          <input
            id="blog-title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter a title"
            className={inputClass}
            required
          />
        </div>

        {/* Author */}
        <div className="min-w-0">
          <label htmlFor="blog-author" className={labelClass}>
            Author
          </label>
          <input
            id="blog-author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author name"
            className={inputClass}
          />
        </div>

        {/* Date + Time */}
        <div className="grid min-w-0 grid-cols-1 gap-5 min-[420px]:grid-cols-2 sm:gap-4">
          <div className="min-w-0">
            <label htmlFor="blog-date" className={labelClass}>
              Publish Date
            </label>
            <input
              id="blog-date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="min-w-0">
            <label htmlFor="blog-time" className={labelClass}>
              Publish Time
            </label>
            <input
              id="blog-time"
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        {/* Content */}
        <div className="min-w-0 md:col-span-2">
          <label htmlFor="blog-content" className={labelClass}>
            Content <span className="text-red-500">*</span>
          </label>
          <textarea
            id="blog-content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your article here..."
            className={`${inputClass} h-56 resize-y leading-7 sm:h-64`}
            required
          />
        </div>

        {/* Cover image */}
        <div className="min-w-0 md:col-span-2">
          <span className={labelClass}>Cover Image</span>
          <div className="rounded-3xl border-2 border-dashed border-gray-300 bg-gray-50 p-3 text-center transition-colors hover:border-blue-400 hover:bg-blue-50/40 sm:p-4">
            {preview ? (
              <div className="relative w-full">
                <img
                  src={preview}
                  alt="Preview"
                  className="aspect-[16/9] w-full rounded-2xl object-cover"
                />
                <button
                  type="button"
                  aria-label="Remove image"
                  onClick={() => {setFile(null); setPreview("");}}
                  className="absolute right-2 top-2 rounded-full bg-red-500 p-1.5 text-white shadow-lg transition hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 active:scale-90"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <label className="block cursor-pointer px-2 py-10 sm:py-12">
                <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <PhotoIcon className="h-7 w-7" />
                </span>
                <p className="text-sm font-semibold text-gray-700">
                  Tap to upload a banner image
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  High-resolution recommended · Max 2MB
                </p>
                <input type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
              </label>
            )}
          </div>
        </div>
      </div>

      <button
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 text-sm font-bold tracking-wide text-white shadow-lg transition-all hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
      >
        {loading && (
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
          />
        )}
        {loading ? "SAVING..." : initialData ? "UPDATE POST" : "PUBLISH ARTICLE"}
      </button>
    </form>
  );
};

export default BlogForm;