import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogForm from "../../components/admin/BlogForm";
import { useAuthContext } from "../../context/AuthContext";
import api from "../../utils/api"; // 🔹 Use your custom api instance
import { toast } from "react-hot-toast";

const AddBlog = () => {
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 🔹 This is where your logic goes
  const handleAddBlog = async (data) => {
    setLoading(true);
    const loadId = toast.loading("Publishing to live site...");
    
    try {
      // 🔹 We use api.post to ensure our baseURL and global settings are applied
      await api.post("/blogs", data, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data" 
        },
      });

      toast.success("Blog is live!", { id: loadId });
      navigate("/admin/blogs"); // Redirect back to the list after success
    } catch (err) {
      console.error("Failed to create blog:", err);
      toast.error(err.response?.data?.message || "Failed to publish post.", { id: loadId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
            <button 
                onClick={() => navigate("/admin/blogs")}
                className="text-gray-500 hover:text-indigo-600 font-bold text-sm"
            >
                ← Back to List
            </button>
            <h2 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">
                Add New Blog Post
            </h2>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <BlogForm onSubmit={handleAddBlog} />
          
          {loading && (
            <div className="mt-4 flex items-center justify-center gap-2 text-indigo-600 font-bold animate-pulse">
                <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                <p className="text-sm uppercase tracking-widest">Uploading Media & Content...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddBlog;