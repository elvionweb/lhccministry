import React from "react";
import { Link } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import { CalendarIcon, UserIcon, ArrowRightIcon, ClockIcon } from "@heroicons/react/24/outline";

const BlogCard = ({ blog }) => {
  return (
    <article className="group bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative overflow-hidden h-56">
        <img
          src={blog.image || "/lhcc.jpeg.jpeg"}
          alt={blog.title}
          loading="lazy"
          className="w-full h-126  md:h-100 object-cover md:object-[50%_12%] sm:object-[50%_16%] object-center bg-no-repeat group-hover:scale-105 transition-transform duration-700"
        />
        {blog.category && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-blue-700 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
            {blog.category}
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-4 flex flex-col flex-grow text-left">
        <div className="flex items-center gap-4 text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-2 md:mb-3">
          <span className="flex items-center gap-1">
            <CalendarIcon className="w-3.5 h-3.5" />
            {formatDate(blog.date || blog.createdAt)}
          </span>
          {blog.time && (
            <span className="flex items-center gap-1 border-l pl-4 border-gray-200">
              <ClockIcon className="w-3.5 h-3.5" />
              {blog.time}
            </span>
          )}
          {blog.author && (
            <span className="flex items-center gap-1 border-l pl-4 border-gray-200">
              <UserIcon className="w-3.5 h-3.5" />
              {blog.author}
            </span>
          )}
        </div>

        <h3 className="text-xl font-black text-gray-800 leading-tight mb-1 group-hover:text-blue-700 transition-colors">
          {blog.title}
        </h3>
        
        <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-grow leading-relaxed">
          {blog.content}
        </p>

        <Link
          to={`/blog/${blog._id || blog.id}`}
          className="flex items-center gap-2 text-blue-700 font-black text-xs uppercase tracking-widest hover:gap-3 transition-all"
        >
          Read Article <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
