// src/components/contact/ContactSocials.jsx
import { Facebook, Instagram, Youtube, Twitter, X } from "lucide-react";


const ContactSocials = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>

      <div className="flex space-x-6">
        <a
          href="#"
          className="text-blue-600 hover:text-indigo-600 transition "
          aria-label="Facebook"
        >
          <Facebook size={28} />
        </a>

        <a
          href="#"
          className="text-red-400 hover:text-indigo-600 transition"
          aria-label="Instagram"
        >
          <Instagram size={28} />
        </a>

        <a
          href="#"
          className="text-red-500 hover:text-indigo-600 transition"
          aria-label="YouTube"
        >
          <Youtube size={28} />
        </a>

        <a
          href="#"
          className="text-blue-600 hover:text-indigo-600 transition"
          aria-label="YouTube"
        >
          <Twitter size={28} />
        </a>
      </div>
    </div>
  );
};

export default ContactSocials;
