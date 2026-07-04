// src/components/contact/ContactForm.jsx
import { useState } from "react";
import { sendContactMessage } from "../../utils/api";
import { motion } from "framer-motion";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await sendContactMessage(formData);
      setSuccess("Your message has been sent successfully");
      setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-lg p-4 md:p-8"
    >
      <motion.h2 initial={{ opacity: 0, x: -100 }}
whileInView={{ opacity: 1, x: 0 }}
transition={{
  duration: 0.8,
  ease: "easeOut"
}}
viewport={{ once: true }} className="text-2xl font-semibold font-heading mb-3 flex justify-center text-blue-700">Send Us a Message</motion.h2>

      {success && <p className="text-green-600 mb-4">{success}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
        <input
          id="email"
          name="email"
          autoComplete="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
        <input
          id="subject"
          type="text"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          required
          value={formData.message}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>

      <div className="text-center">
        <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
      </div>
      
    </form>
  );
};

export default ContactForm;
