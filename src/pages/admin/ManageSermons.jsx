import { useState, useEffect, useCallback } from "react";
import DataTable from "../../components/admin/DataTable";
import SermonForm from "../../components/admin/SermonForm";
import { useAuthContext } from "../../context/AuthContext";
import { fetchSermons, deleteSermon, addSermon, updateSermon } from "../../utils/api";
import { toast } from "react-hot-toast";
import { PlusIcon, PlayIcon } from "@heroicons/react/24/outline";

const ManageSermons = () => {
  const { user } = useAuthContext();
  const [sermons, setSermons] = useState([]);
  const [editingSermon, setEditingSermon] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const getSermons = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchSermons();
      setSermons(data.docs || data.data || (Array.isArray(data) ? data : []));
    } catch (err) {
      toast.error("Failed to load sermons library.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getSermons();
  }, [getSermons]);

  const handleDelete = async (sermon) => {
    if (!window.confirm(`Delete sermon: "${sermon.title}"?`)) return;
    const loadId = toast.loading("Deleting sermon...");
    try {
      await deleteSermon(sermon._id || sermon.id);
      setSermons(prev => prev.filter((s) => (s._id || s.id) !== (sermon._id || sermon.id)));
      toast.success("Sermon removed", { id: loadId });
    } catch (err) {
      toast.error("Delete failed", { id: loadId });
    }
  };

  const handleSubmit = async (formData) => {
    const loadId = toast.loading(editingSermon ? "Updating..." : "Adding...");
    try {
      if (editingSermon) {
        const updated = await updateSermon(editingSermon._id || editingSermon.id, formData);
        setSermons(prev => prev.map(s => (s._id || s.id) === (editingSermon._id || editingSermon.id) ? (updated.sermon || updated.data || updated) : s));
        toast.success("Sermon updated!", { id: loadId });
      } else {
        const created = await addSermon(formData);
        const newSermon = created.sermon || created.data || created;
        setSermons(prev => Array.isArray(prev) ? [...prev, newSermon] : [newSermon]);
        toast.success("Sermon published!", { id: loadId });
      }
      setShowForm(false);
      setEditingSermon(null);
    } catch (err) {
      toast.error(err.message || "Failed to save sermon", { id: loadId });
    }
  };

  const columns = [
    { key: "title", label: "Sermon Title" },
    { key: "preacher", label: "Speaker" },
    { 
      key: "date", 
      label: "Date",
      render: (val) => new Date(val).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    },
    { key: "series", label: "Series" },
  ];

  if (showForm) {
    return (
      <div className="p-8 bg-white min-h-screen animate-in fade-in slide-in-from-bottom-4">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">
            {editingSermon ? "✏️ Edit Sermon" : "Add New Sermon"}
          </h2>
          <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-red-500 font-bold">Cancel</button>
        </div>
        <SermonForm initialData={editingSermon} onSubmit={handleSubmit} />
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-black text-blue-700 tracking-tighter uppercase">Sermon Archive</h2>
          <p className="text-gray-500 font-medium">Manage audio, video, and transcripts.</p>
        </div>
        {user?.role === "admin" && (
          <button
            onClick={() => { setEditingSermon(null); setShowForm(true); }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all transform active:scale-95"
          >
            <PlusIcon className="w-5 h-5" /> Add Sermon
          </button>
        )}
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center animate-pulse">
            <PlayIcon className="w-12 h-12 text-gray-200 mb-2" />
            <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Fetching library...</p>
          </div>
        ) : (
          <DataTable 
            columns={columns} 
            data={sermons} 
            actions={[
              { label: "Edit", color: "text-blue-600", onClick: (s) => { setEditingSermon(s); setShowForm(true); } },
              { label: "Delete", color: "text-red-600", onClick: handleDelete }
            ]} 
          />
        )}
      </div>
    </div>
  );
};

export default ManageSermons;
