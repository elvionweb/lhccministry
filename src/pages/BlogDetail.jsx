// src/pages/BlogDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  if (!blog) return <p className="text-center py-10">Blog not found.</p>;

  return (
    <div className="overflow-hidden max-w-3xl mx-auto p-4">
      <h1 className="text-2xl md:text-4xl sm:text-3xl mt-14 font-bold mb-2">
        {blog.title}
      </h1>
      <p className="text-gray-700 mb-4">
        {blog.author && `By ${blog.author} • `}
        {formatDate(blog.date || blog.createdAt)}
        {blog.time && ` • ${blog.time}`}
      </p>
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full md:w-full md:h-120 sm:w-full sm:h-full md:object-[50%_7%] mt-10 object-cover bg-no-repeat rounded-2xl mb-6 sm:mb-8"
        />
      )}
      <p className="text-gray-800 whitespace-pre-line mb-2 sm:mb-4 md:text-xl">{blog.content}</p>
    </div>
  );
};

export default BlogDetail;
