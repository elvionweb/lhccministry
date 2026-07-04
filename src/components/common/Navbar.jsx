import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";
import libertylogo from "../../assets/libertylogo.jpeg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // 1. Structured Navigation Data
  const navConfig = [
    { name: "Home", path: "/" },
    {
      name: "Who We Are",
      submenu: [
        { name: "About", path: "/about" },
        { name: "Our Pastor", path: "/pastor" },
        { name: "Ministries", path: "/ministries" },
      ],
    },
    {
      name: "Resources",
      submenu: [
        { name: "Sermons", path: "/sermons" },
        { name: "Events", path: "/events" },
        { name: "Previous Events", path: "/previous-events" },
        { name: "Blog", path: "/blog" },
        { name: "Gallery", path: "/gallery" },
      ],
    },
    { name: "Contact", path: "/contact" },
    { name: "Give", path: "/gives", isButton: true },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 shrink-0">
          <img
            src={libertylogo}
            alt="logo"
            className="h-10 md:h-12 w-auto rounded-md"
          />
          <span className="text-sm md:text-2xl sm:text-2xl font-semibold font-sans text-blue-900 tracking-tighter uppercase leading-tight">
            Liberty House Christian Center Inc
          </span>
        </NavLink>

        {/* 2. Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-6">
          {navConfig.map((item) => (
            <li key={item.name} className="relative group py-2">
              {item.submenu ? (
                // Dropdown Trigger
                <div className="flex items-center gap-1 text-sm font-bold text-gray-700 cursor-pointer group-hover:text-blue-700 transition-colors">
                  {item.name}
                  <HiChevronDown className="group-hover:rotate-180 transition-transform duration-300" />

                  {/* Desktop Dropdown Menu */}
                  <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-500 ease-in-out">
                    <div className="bg-white shadow-xl border border-gray-100 rounded-xl p-2 min-w-[120px]">
                      {item.submenu.map((sub) => (
                        <NavLink
                          key={sub.name}
                          to={sub.path}
                          className="block px-4 py-2 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg"
                        >
                          {sub.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                // Simple Link
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `text-sm font-bold transition-colors ${
                      item.isButton
                        ? "bg-blue-700 text-white px-5 py-2 rounded-full hover:bg-blue-800 shadow-md"
                        : isActive
                          ? "text-blue-700"
                          : "text-gray-700 hover:text-blue-700"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden text-3xl text-blue-900 p-1"
        >
          <HiMenu />
        </button>
      </nav>

      {/* 3. Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
              className="fixed right-0 top-0 h-full w-[220px] bg-gradient-to-br from-blue-50 via-white to-cyan-100 z-[70] shadow-2xl p-6 flex flex-col"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="self-end text-3xl text-gray-700 mb-8 hover:text-red-500"
              >
                <HiX />
              </button>

              <ul className="flex flex-col gap-2">
                {navConfig.map((item) => (
                  <MobileNavItem
                    key={item.name}
                    item={item}
                    closeMenu={() => setIsOpen(false)}
                  />
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

// Sub-component for Mobile to handle internal toggle
function MobileNavItem({ item, closeMenu }) {
  const [isSubOpen, setIsSubOpen] = useState(false);

  if (item.submenu) {
    return (
      <li className="border-b border-gray-100 pb-2">
        <button
          onClick={() => setIsSubOpen(!isSubOpen)}
          className="flex items-center justify-between w-full py-1 text-lg font-bold text-blue-900"
        >
          {item.name}
          <HiChevronDown
            className={`transition-transform ${isSubOpen ? "rotate-180" : ""}`}
          />
        </button>
        <AnimatePresence>
          {isSubOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-gray-50 rounded-xl px-4"
            >
              {item.submenu.map((sub) => (
                <NavLink
                  key={sub.name}
                  to={sub.path}
                  onClick={closeMenu}
                  className="block py-2 text-gray-800 font-medium border-b border-white last:border-0"
                >
                  {sub.name}
                </NavLink>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </li>
    );
  }

  return (
    <li>
      <NavLink
        to={item.path}
        onClick={closeMenu}
        className={({ isActive }) =>
          `block py-2 text-lg font-bold ${
            item.isButton
              ? "bg-blue-700 text-white text-center rounded-xl mt-4 w-[70%] mx-auto shadow-lg active:scale-95"
              : isActive
                ? "text-blue-700"
                : "text-blue-900"
          }`
        }
      >
        {item.name}
      </NavLink>
    </li>
  );
}
