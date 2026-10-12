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

  const inputClass =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 sm:text-base";

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-5 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-5 shadow-inner sm:p-7"
    >
      <div>
        <h3 className="font-heading text-lg font-bold text-gray-900 sm:text-xl">
          Register for this Event
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Reserve your spot by filling in the details below.
        </p>
      </div>

      {successMsg && (
        <p
          role="status"
          className="flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800"
        >
          <span aria-hidden="true">✓</span>
          <span>{successMsg}</span>
        </p>
      )}
      {errorMsg && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          <span aria-hidden="true">!</span>
          <span>{errorMsg}</span>
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
        <div className="min-w-0 space-y-1.5">
          <label
            htmlFor="event-name"
            className="block text-xs font-semibold uppercase tracking-wider text-gray-600"
          >
            Full Name
          </label>
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
            className={inputClass}
          />
        </div>

        <div className="min-w-0 space-y-1.5">
          <label
            htmlFor="event-email"
            className="block text-xs font-semibold uppercase tracking-wider text-gray-600"
          >
            Email Address
          </label>
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
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={loading || submitted}
          aria-busy={loading}
          className={`inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold shadow-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed sm:w-auto ${
            submitted
              ? "bg-green-600 text-white"
              : "bg-blue-700 text-white hover:bg-blue-600 hover:shadow-xl disabled:opacity-60"
          }`}
        >
          {loading && (
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
            />
          )}
          {submitted ? "Registered ✓" : loading ? "Registering..." : "Register"}
        </button>
      </div>
    </form>
  );
};

export default EventRegistrationForm;