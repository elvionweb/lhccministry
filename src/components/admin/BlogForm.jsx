// src/components/admin/BlogForm.jsx
import { useState } from "react";
import { uploadImage } from "../../utils/api";

const BlogForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const data = initialData || {};

  const [formData, setFormData] = useState({
    title: data.title || "",
    author: data.author || "",
    category: data.category || "",
    date: data.date || "",
    time: data.time || "",
    content: data.content || "",
    image: data.image || "",
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Update form data on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Upload image to backend (Cloudinary)
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const secureUrl = await uploadImage(file);
      setFormData((prev) => ({ ...prev, image: secureUrl }));
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Failed to upload image. Try again.");
    } finally {
      setUploading(false);
    }
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.image) {
      alert("Title, Content, and Banner Image are required.");
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      console.error("Failed to submit blog:", err);
      alert("Error saving blog. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const labelClass =
    "mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-600";
  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/30 sm:text-base";
  const Req = () => <span className="text-red-500"> *</span>;

  return (
    <form
      className="space-y-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-md sm:p-6 lg:p-8"
      onSubmit={handleSubmit}
    >
      {/* Title, Author, Category, Date, Time */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
        <div className="min-w-0 md:col-span-2">
          <label htmlFor="admin-blog-title" className={labelClass}>
            Title<Req />
          </label>
          <input
            id="admin-blog-title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter a title"
            className={inputClass}
            required
          />
        </div>
        <div className="min-w-0">
          <label htmlFor="admin-blog-author" className={labelClass}>
            Author<Req />
          </label>
          <input
            id="admin-blog-author"
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author name"
            className={inputClass}
            required
          />
        </div>
        <div className="min-w-0">
          <label htmlFor="admin-blog-category" className={labelClass}>
            Category<Req />
          </label>
          <input
            id="admin-blog-category"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g. Devotional"
            className={inputClass}
            required
          />
        </div>
        <div className="min-w-0">
          <label htmlFor="admin-blog-date" className={labelClass}>
            Date
          </label>
          <input
            id="admin-blog-date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div className="min-w-0">
          <label htmlFor="admin-blog-time" className={labelClass}>
            Time
          </label>
          <input
            id="admin-blog-time"
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      {/* Content */}
      <div className="min-w-0">
        <label htmlFor="admin-blog-content" className={labelClass}>
          Content<Req />
        </label>
        <textarea
          id="admin-blog-content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows="6"
          placeholder="Write your article here..."
          className={`${inputClass} resize-y leading-7`}
          required
        />
      </div>

      {/* Banner Image */}
      <div className="min-w-0">
        <span className={labelClass}>
          Banner Image<Req />
        </span>

        <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-3 transition-colors hover:border-blue-400 hover:bg-blue-50/40 sm:p-4">
          {formData.image && (
            <div className="relative mb-3 overflow-hidden rounded-xl">
              <img
                src={formData.image}
                alt="Blog Banner"
                className="aspect-[16/9] max-h-72 w-full object-cover"
              />
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <span className="h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-white" />
                </div>
              )}
            </div>
          )}

          <label
            className={`flex flex-col items-center justify-center gap-1 rounded-xl px-3 py-5 text-center focus-within:ring-2 focus-within:ring-blue-600 ${
              uploading ? "cursor-not-allowed opacity-60" : "cursor-pointer"
            }`}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-700">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M4 16l4-4a2 2 0 0 1 3 0l5 5M14 14l1-1a2 2 0 0 1 3 0l2 2M14 8h.01M5 20h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />
              </svg>
            </span>
            <span className="text-sm font-semibold text-gray-700">
              {formData.image ? "Replace banner image" : "Tap to upload a banner image"}
            </span>
            <span className="text-xs text-gray-500">PNG, JPG or WEBP</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="sr-only"
              disabled={uploading}
            />
          </label>

          {uploading && (
            <p
              role="status"
              className="mt-1 flex items-center justify-center gap-2 text-sm font-medium text-blue-700"
            >
              Uploading image...
            </p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full rounded-xl bg-gray-200 px-6 py-3 font-semibold text-gray-800 transition hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 active:scale-95 sm:w-auto"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          disabled={loading || uploading}
        >
          {loading && (
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
            />
          )}
          {loading ? "Saving..." : data.title ? "Update Blog" : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
