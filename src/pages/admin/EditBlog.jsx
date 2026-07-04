/* src/pages/admin/EditBlog.jsx */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BlogForm from "../../components/admin/BlogForm";
import { getBlogById, updateBlog } from "../../utils/api"; // 🔹 Use your helpers!
import { toast } from "react-hot-toast";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const data = await getBlogById(id);
        setBlog(data.data || data); // Handle both nested and flat responses
      } catch (err) {
        toast.error(err.message || "Failed to load blog post.");
        navigate("/admin/blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogData();
  }, [id, navigate]);

  const handleEditBlog = async (formData) => {
    setSaving(true);
    const loadId = toast.loading("Updating your article...");
    try {
      await updateBlog(id, formData);
      toast.success("Blog updated successfully!", { id: loadId });
      navigate("/admin/blogs");
    } catch (err) {
      toast.error(err.message || "Update failed.", { id: loadId });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64 animate-pulse font-bold text-indigo-600 uppercase tracking-widest">
      Retreiving Post Content...
    </div>
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate("/admin/blogs")} className="text-gray-400 hover:text-indigo-600 transition-colors">
            ← Back
          </button>
          <h2 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">Edit Post</h2>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <BlogForm initialData={blog} onSubmit={handleEditBlog} />
          {saving && (
            <div className="mt-4 flex items-center justify-center gap-2 text-indigo-500 font-bold italic animate-bounce">
              Syncing with database...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditBlog;