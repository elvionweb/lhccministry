import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SermonForm from "../../components/admin/SermonForm";
import { getSermonById, updateSermon } from "../../utils/api";
import { toast } from "react-hot-toast";

const EditSermon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sermon, setSermon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSermonData = async () => {
      try {
        const data = await getSermonById(id);
        setSermon(data.data || data);
      } catch (err) {
        toast.error("Could not find that sermon.");
        navigate("/admin/sermons");
      } finally {
        setLoading(false);
      }
    };
    fetchSermonData();
  }, [id, navigate]);

  const handleEditSermon = async (formData) => {
    const loadId = toast.loading("Updating sermon archive...");
    try {
      await updateSermon(id, formData);
      toast.success("Sermon updated successfully!", { id: loadId });
      navigate("/admin/sermons");
    } catch (err) {
      toast.error(err.message || "Failed to update.", { id: loadId });
    }
  };

  if (loading) return <div className="p-10 text-center animate-pulse font-bold text-gray-400">LOADING SERMON DATA...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex justify-center">
      <div className="w-full max-w-4xl bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
        <h2 className="text-3xl font-black text-gray-800 mb-8 uppercase tracking-tighter">Edit Sermon</h2>
        <SermonForm initialData={sermon} onSubmit={handleEditSermon} />
      </div>
    </div>
  );
};

export default EditSermon;