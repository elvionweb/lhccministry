import React from "react";
import { Link } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import { CalendarIcon, UserIcon, ArrowRightIcon, ClockIcon } from "@heroicons/react/24/outline";

const BlogCard = ({ blog }) => {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl">
      {/* Image Container — fixed ratio so every card image fits the grid */}
      <Link
        to={`/blog/${blog._id || blog.id}`}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-900"
      >
        <img
          src={blog.image || "/lhcc.jpeg.jpeg"}
          alt={blog.title}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {blog.category && (
          <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-blue-700 shadow-sm backdrop-blur-sm">
            {blog.category}
          </div>
        )}
      </Link>

      {/* Content Container */}
      <div className="flex flex-grow flex-col p-5 text-left sm:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-500">
          <span className="flex items-center gap-1">
            <CalendarIcon className="h-3.5 w-3.5 shrink-0 text-blue-700" />
            {formatDate(blog.date || blog.createdAt)}
          </span>
          {blog.time && (
            <span className="flex items-center gap-1">
              <ClockIcon className="h-3.5 w-3.5 shrink-0 text-blue-700" />
              {blog.time}
            </span>
          )}
          {blog.author && (
            <span className="flex min-w-0 items-center gap-1">
              <UserIcon className="h-3.5 w-3.5 shrink-0 text-blue-700" />
              <span className="truncate">{blog.author}</span>
            </span>
          )}
        </div>

        <h3 className="mb-2 line-clamp-2 font-heading text-lg font-black leading-snug text-gray-900 transition-colors group-hover:text-blue-700 sm:text-xl">
          {blog.title}
        </h3>

        <p className="mb-5 line-clamp-3 flex-grow text-sm leading-relaxed text-gray-600">
          {blog.content}
        </p>

        <Link
          to={`/blog/${blog._id || blog.id}`}
          className="mt-auto inline-flex w-fit items-center gap-2 border-t border-transparent pt-1 text-xs font-black uppercase tracking-widest text-blue-700 transition-all hover:gap-3 focus:outline-none focus-visible:underline"
        >
          Read Article <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;