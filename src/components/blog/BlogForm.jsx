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

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Blog Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-4 bg-red-50 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Author</label>
          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Publish Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Publish Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 h-64"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Cover Image</label>
          <div className="border-2 border-dashed border-gray-200 rounded-3xl p-4 text-center hover:bg-gray-50 transition-colors">
            {preview ? (
              <div className="relative inline-block w-full">
                <img src={preview} alt="Preview" className="h-48 w-full object-cover rounded-2xl" />
                <button 
                  type="button"
                  onClick={() => {setFile(null); setPreview("");}}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer py-10 block">
                <PhotoIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">Upload a high-resolution banner</p>
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
            )}
          </div>
        </div>
      </div>

      <button
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-transform active:scale-95 disabled:opacity-50"
      >
        {loading ? "SAVING..." : initialData ? "UPDATE POST" : "PUBLISH ARTICLE"}
      </button>
    </form>
  );
};

export default BlogForm;