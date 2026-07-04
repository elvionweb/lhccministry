import { useNavigate } from "react-router-dom";
import SermonForm from "../../components/admin/SermonForm";
import { addSermon } from "../../utils/api";
import { toast } from "react-hot-toast";

const AddSermon = () => {
  const navigate = useNavigate();

  const handleAddSermon = async (formData) => {
    const loadId = toast.loading("Uploading sermon content...");
    try {
      await addSermon(formData);
      toast.success("Sermon published!", { id: loadId });
      navigate("/admin/sermons");
    } catch (err) {
      toast.error(err.message || "Failed to add sermon.", { id: loadId });
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex justify-center">
      <div className="w-full max-w-4xl bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
        <h2 className="text-3xl font-black text-gray-800 mb-8 uppercase tracking-tighter">Add New Sermon</h2>
        <SermonForm onSubmit={handleAddSermon} />
      </div>
    </div>
  );
};

export default AddSermon;