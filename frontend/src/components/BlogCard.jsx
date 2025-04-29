import { Link } from "react-router-dom";
import { useState } from "react";

export default function BlogCard({ blog, userId, onDelete }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this blog?");
    if (!confirmed) return;

    try {
      setDeleting(true);
      await onDelete(blog._id);
    } catch (err) {
      alert("Failed to delete blog");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="border p-4 rounded hover:bg-gray-50 transition">
      <Link to={`/blogs/${blog._id}`}>
        <h2 className="text-xl font-semibold">{blog.title}</h2>
        <p className="text-gray-600">{blog.content.substring(0, 100)}...</p>
      </Link>

      {userId === blog.author && (
        <div className="mt-3 flex gap-4 text-sm items-center">
          <Link
            to={`/edit/${blog._id}`}
            className="text-blue-600 hover:underline"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:underline flex items-center gap-1"
            disabled={deleting}
          >
            {deleting && (
              <svg
                className="animate-spin h-4 w-4 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8z"
                ></path>
              </svg>
            )}
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
