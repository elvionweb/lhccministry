import { useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import API from "../../utils/api"; // Integrating your professional API utility

export default function Footer() {
  // 🔹 Newsletter State Logic
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) return;

    setStatus("loading");
    try {
      // 🔗 Connects to your backend (endpoint usually /newsletter or /subscribe)
      await API.post("/newsletter/subscribe", { email });

      setStatus("success");
      setMessage("Thank you for subscribing!");
      setEmail(""); // Clear input on success
    } catch (err) {
      setStatus("error");
      setMessage(err.message || "Something went wrong. Try again.");
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Church Info */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-1">
            Liberty House Christian Center Inc
          </h3>
          <p className="text-sm leading-relaxed">
            A place of worship, love, and community. Join us in spreading faith
            and hope.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-white transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/sermons" className="hover:text-white transition">
                Sermons
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:text-white transition">
                Events
              </Link>
            </li>
            <li>
              <Link to="/gives" className="hover:text-white transition">
                Gives
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Updated Professional Newsletter Section */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-1">Newsletter</h3>
          <p className="text-sm mb-4">
            Get updates, devotionals, and church news.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <div className="flex gap-2">
              <label htmlFor="newsletter-email" className="sr-only">
                Your email
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading" || status === "success"}
                className="flex-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition disabled:bg-gray-600 disabled:cursor-not-allowed min-w-[100px]"
              >
                {status === "loading" ? "..." : "Subscribe"}
              </button>
            </div>

            {/* User Feedback Messages */}
            {message && (
              <p
                className={`text-xs mt-1 ${status === "success" ? "text-green-400" : "text-red-400"}`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-end justify-between">
          {/* Left Side - Address & Contact */}
          <div className="text-gray-200 text-left mb-4 md:mb-0">
            <p>
              1 Liberty Way, Before Pipeline Junction, Benin <br />
              Auchi Road, Eyaen, Benin City, Nigeria
            </p>
            <p className="mt-1">Phone: +234 803 655 3571</p>
            <p>Email: info@lhccm.com</p>
          </div>

          {/* Center - Social Media */}
          <div className="flex justify-center gap-4 text-lg mb-4 md:mb-0">
            <FaFacebook className="hover:text-white cursor-pointer transition" />
            <FaInstagram className="hover:text-white cursor-pointer transition" />
            <FaYoutube className="hover:text-white cursor-pointer transition" />
            <FaTwitter className="hover:text-white cursor-pointer transition" />
          </div>

          {/* Right Side - Copyright */}
          <div className="text-gray-400 text-right">
            © {new Date().getFullYear()} LHCCM. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
