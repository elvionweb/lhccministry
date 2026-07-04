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

  return (
    <form
      className="bg-white p-6 rounded shadow-md space-y-4"
      onSubmit={handleSubmit}
    >
      {/* Title, Author, Category, Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </div>

      {/* Content */}
      <div>
        <label className="block font-medium mb-1">Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows="6"
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      {/* Banner Image */}
      <div>
        <label className="block font-medium mb-1">Banner Image</label>
        {formData.image && (
          <img
            src={formData.image}
            alt="Blog Banner"
            className="mb-2 w-full max-h-60 object-cover rounded"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border p-2 rounded cursor-pointer"
          disabled={uploading}
        />
        {uploading && <p className="text-gray-500 mt-1">Uploading image...</p>}
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
          disabled={loading || uploading}
        >
          {loading ? "Saving..." : data.title ? "Update Blog" : "Add Blog"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default BlogForm;