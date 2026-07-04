import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EventForm from "../../components/admin/EventForm";
import axios from "../../utils/api";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load event");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleEditEvent = async (formData) => {
    try {
      await axios.put(`/events/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/admin/events");
    } catch (err) {
      console.error("Failed to update event:", err);
      alert("Error updating event. Try again.");
    }
  };

  if (loading) return <p className="p-6">Loading event...</p>;
  if (!event) return <p className="p-6 text-red-600">Event not found</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Edit Event</h2>
      <EventForm initialData={event} onSubmit={handleEditEvent} />
    </div>
  );
};

export default EditEvent;