import React, { useState } from "react";
import axios from "../../utils/api";

const EventRegistrationForm = ({ eventId, eventTitle }) => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();

    if (!trimmedName) {
      setErrorMsg("Name cannot be empty.");
      setLoading(false);
      return;
    }

    try {
      await axios.post(`/events/${eventId}/register`, {
        ...form,
        name: trimmedName,
        email: trimmedEmail
      });
      setSuccessMsg("Registration successful! See you at the event.");
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setErrorMsg("Error submitting registration. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t pt-4 mt-4 space-y-4">
      <h3 className="font-semibold text-gray-800">Register for this Event</h3>

      {successMsg && <p className="text-green-700">{successMsg}</p>}
      {errorMsg && <p className="text-red-600">{errorMsg}</p>}

      <div className="space-y-1">
        <label htmlFor="event-name" className="block text-sm text-gray-700">Full Name</label>
        <input
          id="event-name"
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          disabled={submitted}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="event-email" className="block text-sm text-gray-700">Email Address</label>
        <input
          id="event-email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          disabled={submitted}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <button
        type="submit"
        disabled={loading || submitted}
        aria-busy={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-60"
      >
        {submitted ? "Registered ✓" : loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default EventRegistrationForm;