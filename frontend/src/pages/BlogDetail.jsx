import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft, FiCalendar, FiEye } from "react-icons/fi";
import api from "../utils/api";

const fallbackImg =
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200&auto=format&fit=crop";

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/blogs/${slug}`)
      .then((r) => setBlog(r.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <div className="w-10 h-10 border-4 border-marigold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="text-center py-32">
        <p className="text-slate mb-4">Blog post not found.</p>
        <Link to="/blog" className="text-terracotta font-semibold hover:underline">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="relative">
        <div className="h-72 md:h-96 overflow-hidden relative">
          <img src={blog.image || fallbackImg} alt={blog.title} className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/60 to-paper/20"></div>
        </div>
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
            <p className="text-marigold font-semibold text-sm uppercase tracking-widest mb-2">{blog.category}</p>
            <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-ink">{blog.title}</h1>
            <div className="flex items-center gap-4 mt-4 text-sm text-slate">
              <span className="flex items-center gap-1">
                <FiCalendar /> {new Date(blog.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </span>
              <span className="flex items-center gap-1">
                <FiEye /> {blog.views} views
              </span>
              {blog.author?.name && <span>By {blog.author.name}</span>}
            </div>
          </div>

        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-terracotta mb-6">
          <FiArrowLeft /> Back to Blog
        </Link>
        <div className="prose-content text-slate leading-relaxed whitespace-pre-wrap">{blog.content}</div>
        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-8">
            {blog.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-marigold/15 text-marigold text-xs font-semibold">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
