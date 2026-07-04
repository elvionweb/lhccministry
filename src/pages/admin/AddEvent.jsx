import { useNavigate } from "react-router-dom";
import EventForm from "../../components/admin/EventForm";
import axios from "../../utils/api";
import { toast } from "react-hot-toast";

const AddEvent = () => {
  const navigate = useNavigate();

  const handleAddEvent = async (formData) => {
    const loadingToast = toast.loading("Publishing event...");
    try {
      await axios.post("/events", formData);
      toast.success("Event created successfully", { id: loadingToast });
      navigate("/admin/events");
    } catch (err) {
      toast.error("Failed to create event", { id: loadingToast });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-3xl my-10 shadow-xl border border-gray-100">
      <h2 className="text-3xl font-black text-gray-800 mb-8 uppercase tracking-tighter">New Event</h2>
      <EventForm onSubmit={handleAddEvent} />
    </div>
  );
};

export default AddEvent;