// src/pages/Blog.jsx

import { useEffect, useState, useMemo } from "react";
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
      <div className="flex justify-center py-12">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <p className="text-center text-red-600 py-10">
        {error}
      </p>
    );
  }

  return (
    <div className="max-w-8xl mx-auto px-4 pt-16 pb-6 md:pb-10 sm:pb-8">
      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row md:justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-28 md:w-44 sm:w-36 text-sm md:text-base"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentBlogs.length > 0 ? (
          currentBlogs.map((blog) => (
            <BlogCard key={blog._id || blog.id} blog={blog} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">
            No blogs available yet.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 gap-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 text-white font-body py-2 border rounded-xl disabled:opacity-50 bg-blue-500 hover:bg-blue-600"
          >
            Prev
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 text-white font-body py-2 border rounded-xl disabled:opacity-50 bg-blue-500 hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;