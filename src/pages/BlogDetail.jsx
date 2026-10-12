// src/pages/BlogDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogById } from "../utils/api";
import formatDate from "../utils/formatDate";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await getBlogById(id);
        setBlog(response.blog || response.data || response);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      }
    };
    getBlog();
  }, [id]);

  if (!blog)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4 pt-20 text-center">
        <p className="text-lg font-medium text-gray-700">Blog not found.</p>
        <Link
          to="/blog"
          className="rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-600"
        >
          ← Back to Blog
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50 pb-16 sm:pb-24">
      {/* ---------- Header band ---------- */}
      <header className="relative isolate overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 px-4 pb-24 pt-28 sm:pb-32 sm:pt-32">
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-16 -z-10 h-64 w-64 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-20 -left-10 -z-10 h-64 w-64 rounded-full bg-amber-300/20 blur-3xl"
        />

        <div className="mx-auto max-w-3xl text-center">
          <Link
            to="/blog"
            className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-300 transition hover:text-amber-200"
          >
            ← Back to Blog
          </Link>

          {blog.category && (
            <p className="mb-3">
              <span className="rounded-full bg-white/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white backdrop-blur">
                {blog.category}
              </span>
            </p>
          )}

          <h1 className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            {blog.title}
          </h1>

          <p className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm font-medium text-blue-100">
            {blog.author && <span>By {blog.author}</span>}
            {blog.author && <span aria-hidden="true">•</span>}
            <span>{formatDate(blog.date || blog.createdAt)}</span>
            {blog.time && (
              <>
                <span aria-hidden="true">•</span>
                <span>{blog.time}</span>
              </>
            )}
          </p>
        </div>
      </header>

      {/* ---------- Article ---------- */}
      <article className="relative z-10 mx-auto -mt-16 w-full max-w-3xl px-4 sm:-mt-24 sm:px-6">
        {blog.image && (
          <div className="mb-6 overflow-hidden rounded-2xl bg-gray-200 shadow-2xl ring-1 ring-black/5 sm:mb-8 sm:rounded-3xl">
            <img
              src={blog.image}
              alt={blog.title}
              className="aspect-[16/10] w-full object-cover object-top sm:aspect-[16/9]"
            />
          </div>
        )}

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-lg sm:rounded-3xl sm:p-8 md:p-12">
          <p className="whitespace-pre-line break-words font-body text-base leading-8 text-gray-800 sm:text-lg md:text-xl md:leading-9">
            {blog.content}
          </p>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-6 sm:flex-row">
            <p className="text-sm text-gray-500">
              {blog.author ? `Written by ${blog.author}` : "Thanks for reading"}
            </p>
            <Link
              to="/blog"
              className="w-44 rounded-xl bg-blue-700 px-6 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:bg-blue-600 active:scale-95 sm:w-auto"
            >
              ← More Articles
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;