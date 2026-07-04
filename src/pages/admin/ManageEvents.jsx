import { useState, useEffect, useCallback } from "react";
import DataTable from "../../components/admin/DataTable";
import EventForm from "../../components/admin/EventForm";
import axios from "../../utils/api";
import { toast } from "react-hot-toast";
import { PlusIcon, CalendarIcon } from "@heroicons/react/24/outline";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const getEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("/events");
      // Ensure we always have an array
      setEvents(Array.isArray(res.data) ? res.data : res.data?.docs || []);
    } catch (err) {
      toast.error("Failed to sync event registry");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  const handleDelete = async (eventId) => {
    if (!window.confirm("This will permanently remove the event. Continue?")) return;
    const loadingToast = toast.loading("Deleting event...");
    try {
      await axios.delete(`/events/${eventId}`);
      setEvents(prev => prev.filter((e) => e._id !== eventId));
      toast.success("Event removed", { id: loadingToast });
    } catch (err) {
      toast.error("Delete failed", { id: loadingToast });
    }
  };

  const handleSubmit = async (formData) => {
    const loadingToast = toast.loading(editingEvent ? "Updating..." : "Creating...");
    try {
      // Prepare multipart/form-data
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) data.append(key, formData[key]);
      });

      let res;
      if (editingEvent) {
        res = await axios.put(`/events/${editingEvent._id}`, data);
        const updatedEvent = res.data.event || res.data.data || res.data;
        setEvents(prev => Array.isArray(prev) ? prev.map((e) => (e._id === editingEvent._id ? updatedEvent : e)) : [updatedEvent]);
        toast.success("Event updated", { id: loadingToast });
      } else {
        res = await axios.post("/events", data);
        const newEvent = res.data.event || res.data.data || res.data;
        setEvents(prev => Array.isArray(prev) ? [...prev, newEvent] : [newEvent]);
        toast.success("Event published", { id: loadingToast });
      }
      setShowForm(false);
      setEditingEvent(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Storage error", { id: loadingToast });
    }
  };

  const columns = [
    { key: "title", label: "Event Name" },
    {
      key: "date",
      label: "Date",
      render: (val) => new Date(val).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    },
    { key: "location", label: "Venue" },
    {
      key: "category",
      label: "Category",
      render: (val) => <span className="capitalize bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold">{val}</span>
    },
  ];

  if (showForm) {
    return (
      <div className="p-8 bg-white min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">
            {editingEvent ? "✏️ Edit Event" : "📅 Create New Event"}
          </h2>
          <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 font-bold underline">Cancel</button>
        </div>
        <div className="max-w-4xl mx-auto">
          <EventForm initialData={editingEvent} onSubmit={handleSubmit} />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-black text-blue-700 tracking-tighter uppercase mb-2">Event Management</h2>
          <p className="text-gray-500 font-medium">Schedule and manage church activities.</p>
        </div>
        <button
          onClick={() => { setEditingEvent(null); setShowForm(true); }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all"
        >
          <PlusIcon className="w-5 h-5" /> Add New Event
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center animate-pulse">
            <CalendarIcon className="w-12 h-12 text-gray-200 mb-2" />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Fetching Calendar...</p>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={events}
            actions={[
              { label: "Edit", color: "text-blue-600", onClick: (e) => { setEditingEvent(e); setShowForm(true); } },
              { label: "Delete", color: "text-red-600", onClick: (e) => handleDelete(e._id) },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default ManageEvents;