import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi"; // Install react-icons

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { path: "/admin", label: "Dashboard" },
    { path: "/admin/sermons", label: "Sermons" },
    { path: "/admin/events", label: "Events" },
    { path: "/admin/blogs", label: "Blogs" },
    { path: "/admin/gallery", label: "Gallery Manager" },
    { path: "/admin/gives", label: "Give" },
    { path: "/admin/prayers", label: "Prayer Requests" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className="fixed top-4 left-4 z-50 md:hidden  text-black"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
      </button>

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-50 bg-indigo-700 text-white transform transition-transform duration-300 font-medium ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:inset-0
      `}>
        <div className="p-4 pl-16 md:pl-6 text-xl font-bold border-b border-indigo-500">LHCCM</div>

        <nav className="mt-6 space-y-2 px-4">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)} // Close sidebar on mobile after click
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-lg transition-colors ${
                  isActive ? "bg-blue-600 shadow-lg" : "hover:bg-indigo-600"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;