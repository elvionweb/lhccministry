// src/pages/Blog.jsx

import { useEffect, useState, useMemo } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import BlogCard from "../components/blog/BlogCard";
import { fetchBlogs } from "../utils/api";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 6;

  const categories = [
    "All",
    "Devotional",
    "Testimony",
    "Announcement",
    "Inspirational",
  ];

  // Fetch blogs
  useEffect(() => {
    const getBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetchBlogs();

        // Normalize response safely
        let blogsArray = [];

        if (Array.isArray(response)) {
          blogsArray = response;
        } else if (Array.isArray(response?.docs)) {
          blogsArray = response.docs;
        } else if (Array.isArray(response?.data)) {
          blogsArray = response.data;
        } else if (Array.isArray(response?.blogs)) {
          blogsArray = response.blogs;
        } else {
          blogsArray = [];
        }

        // Sort newest first
        const sortedBlogs = blogsArray.sort(
          (a, b) =>
            new Date(b.createdAt || b.date || 0) -
            new Date(a.createdAt || a.date || 0)
        );

        setBlogs(sortedBlogs);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError("Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, []);

  // Filter blogs
  const filteredBlogs = useMemo(() => {
    let filtered = blogs;

    if (search) {
      filtered = filtered.filter((blog) =>
        blog.title?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      filtered = filtered.filter((blog) => blog.category === category);
    }

    return filtered;
  }, [blogs, search, category]);

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);

  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePrev = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category]);

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 pt-20">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-blue-700" />
        <p className="text-sm font-medium text-gray-500">Loading articles…</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 pt-20">
        <p
          role="alert"
          className="max-w-md rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-center font-medium text-red-700 shadow-sm"
        >
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
      {/* ---------- Hero header ---------- */}
      <header className="relative isolate overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 px-4 pb-20 pt-28 text-center sm:pb-24 sm:pt-32">
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-16 -z-10 h-64 w-64 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-20 -left-10 -z-10 h-64 w-64 rounded-full bg-amber-300/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />

        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300 sm:text-sm">
          Read &amp; Be Inspired
        </p>
        <h1 className="mt-2 font-heading text-4xl font-bold text-white sm:text-5xl md:text-6xl">
          Our Blog
        </h1>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-amber-300" />
        <p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-6 text-blue-100 sm:text-base md:text-lg">
          Devotionals, testimonies, announcements and words of inspiration.
        </p>
      </header>

      <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        {/* ---------- Search + Filter (overlaps the header) ---------- */}
        <div className="relative z-10 -mt-10 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl sm:-mt-12 sm:p-5">
          <div className="relative">
            <MagnifyingGlassIcon
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by title..."
              aria-label="Search blog posts by title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm text-gray-900 placeholder-gray-400 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30 sm:text-base"
            />
          </div>

          {/* Category chips (scroll sideways on small screens) */}
          <div
            role="group"
            aria-label="Filter by category"
            className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  aria-pressed={active}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 sm:text-sm ${
                    active
                      ? "bg-blue-700 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <p className="mb-5 mt-6 px-1 text-sm font-medium text-gray-500">
          {filteredBlogs.length}{" "}
          {filteredBlogs.length === 1 ? "article" : "articles"}
          {category !== "All" && ` in ${category}`}
        </p>

        {/* ---------- Blog Grid ---------- */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {currentBlogs.length > 0 ? (
            currentBlogs.map((blog) => (
              <BlogCard key={blog._id || blog.id} blog={blog} />
            ))
          ) : (
            <div className="col-span-full rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-600">
              No blogs available yet.
            </div>
          )}
        </div>

        {/* ---------- Pagination ---------- */}
        {totalPages > 1 && (
          <nav
            aria-label="Pagination"
            className="mx-auto mt-10 flex max-w-md items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-white p-2.5 shadow-lg sm:mt-12"
          >
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="rounded-xl bg-blue-700 px-4 py-2.5 font-body text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none sm:px-5"
            >
              ← Prev
            </button>

            <span className="text-center text-xs font-semibold text-gray-700 sm:text-sm">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="rounded-xl bg-blue-700 px-4 py-2.5 font-body text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none sm:px-5"
            >
              Next →
            </button>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Blog;