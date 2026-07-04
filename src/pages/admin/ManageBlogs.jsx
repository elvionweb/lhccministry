import { useState, useEffect, useCallback } from "react";
import DataTable from "../../components/admin/DataTable";
import BlogForm from "../../components/admin/BlogForm";
import { useAuthContext } from "../../context/AuthContext";
import api from "../../utils/api"; // 🔹 Use unified API instance
import { toast } from "react-hot-toast";
import { PlusIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

const ManageBlogs = () => {
  const { user, token } = useAuthContext();
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/blogs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // `paginate` from backend returns `{ success: true, docs: [...] }`
      const fetchedBlogs = res.data.docs || res.data.data || (Array.isArray(res.data) ? res.data : []);
      setBlogs(fetchedBlogs);
    } catch (err) {
      toast.error("Failed to sync blog database.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleDelete = async (blog) => {
    if (!window.confirm(`Permanently delete "${blog.title}"?`)) return;
    const loadId = toast.loading("Removing post...");
    try {
      await api.delete(`/blogs/${blog._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs((prev) => prev.filter((b) => b._id !== blog._id));
      toast.success("Post deleted", { id: loadId });
    } catch (err) {
      toast.error("Delete failed", { id: loadId });
    }
  };

  const handleSubmit = async (formData) => {
    const loadId = toast.loading(editingBlog ? "Updating post..." : "Publishing post...");
    try {
      let res;
      if (editingBlog) {
        res = await api.put(`/blogs/${editingBlog._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const updated = res.data.blog || res.data.data || res.data;
        setBlogs(prev => Array.isArray(prev) ? prev.map(b => b._id === editingBlog._id ? updated : b) : [updated]);
        toast.success("Blog updated!", { id: loadId });
      } else {
        res = await api.post("/blogs", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const newBlog = res.data.blog || res.data.data || res.data;
        setBlogs(prev => Array.isArray(prev) ? [newBlog, ...prev] : [newBlog]);
        toast.success("Blog published!", { id: loadId });
      }
      setShowForm(false);
      setEditingBlog(null);
    } catch (err) {
      toast.error("Process failed. Check image size/fields.", { id: loadId });
    }
  };

  const columns = [
    { key: "title", label: "Post Title" },
    { key: "author", label: "Author" },
    { 
      key: "createdAt", 
      label: "Published",
      render: (val) => new Date(val).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
    },
    { 
      key: "category", 
      label: "Category",
      render: (val) => <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md text-xs font-bold uppercase">{val}</span>
    },
  ];

  if (showForm) {
    return (
      <div className="p-8 bg-white min-h-screen animate-in fade-in duration-300">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h3 className="text-2xl font-black text-blue-700 uppercase tracking-tighter">
            {editingBlog ? "📝 Edit Article" : "New Article"}
          </h3>
          <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-red-500 transition-colors">
            Cancel & Close
          </button>
        </div>
        <div className="max-w-5xl mx-auto">
          <BlogForm initialData={editingBlog} onSubmit={handleSubmit} />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-black text-blue-700 tracking-tighter uppercase">Content Management</h2>
          <p className="text-gray-500 font-medium">Draft, edit, and publish church news.</p>
        </div>
        
        {user?.role === "admin" && (
          <button
            onClick={() => { setEditingBlog(null); setShowForm(true); }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all transform active:scale-95"
          >
            <PlusIcon className="w-5 h-5" /> Write Article
          </button>
        )}
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {loading && blogs.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center animate-pulse">
            <DocumentTextIcon className="w-12 h-12 text-gray-200" />
            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-2">Loading Library...</p>
          </div>
        ) : (
          <DataTable 
            columns={columns} 
            data={blogs} 
            actions={[
              { label: "Edit", color: "text-indigo-600", onClick: (b) => { setEditingBlog(b); setShowForm(true); } },
              { label: "Delete", color: "text-red-600", onClick: handleDelete }
            ]} 
          />
        )}
      </div>
    </div>
  );
};

export default ManageBlogs;