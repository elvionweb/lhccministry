import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HiMenuAlt3,
  HiX,
  HiHome,
  HiMicrophone,
  HiCalendar,
  HiNewspaper,
  HiPhotograph,
  HiGift,
  HiChatAlt2,
} from "react-icons/hi"; // Install react-icons

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { path: "/admin", label: "Dashboard", icon: HiHome },
    { path: "/admin/sermons", label: "Sermons", icon: HiMicrophone },
    { path: "/admin/events", label: "Events", icon: HiCalendar },
    { path: "/admin/blogs", label: "Blogs", icon: HiNewspaper },
    { path: "/admin/gallery", label: "Gallery Manager", icon: HiPhotograph },
    { path: "/admin/gives", label: "Give", icon: HiGift },
    { path: "/admin/prayers", label: "Prayer Requests", icon: HiChatAlt2 },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className="fixed left-3 top-3 z-50 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-900 shadow-lg ring-1 ring-black/5 transition active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
      </button>

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col overflow-y-auto bg-gradient-to-b from-indigo-800 via-indigo-700 to-blue-800 font-medium text-white shadow-2xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:inset-0 md:shadow-none
      `}>
        {/* Brand */}
        <div className="flex items-center gap-3 border-b border-white/15 p-4 pl-16 md:pl-6">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 text-sm font-black tracking-tight ring-1 ring-white/25">
            L
          </span>
          <div className="min-w-0 leading-tight">
            <p className="text-xl font-bold tracking-wide">LHCCM</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-200">
              Admin Panel
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav aria-label="Admin navigation" className="mt-5 flex-1 space-y-1.5 px-3 pb-6">
          <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-200/80">
            Manage
          </p>
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/admin"} // keeps Dashboard from staying active on sub-pages
                onClick={() => setIsOpen(false)} // Close sidebar on mobile after click
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                    isActive
                      ? "bg-white text-indigo-800 shadow-lg"
                      : "text-indigo-100 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110" />
                <span className="truncate">{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;