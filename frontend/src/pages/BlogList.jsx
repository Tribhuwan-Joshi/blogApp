import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    API.get("/blogs")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => console.error("Failed to fetch blogs:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      await API.delete(`/blogs/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (err) {
      alert("Failed to delete blog");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading blogs...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl mb-4">Blogs</h1>
      <div className="grid gap-4">
        {blogs.length === 0 ? (
          <p className="text-gray-600">No blogs found.</p>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="border p-4 rounded hover:bg-gray-50 transition"
            >
              <Link to={`/blogs/${blog._id}`}>
                <h2 className="text-xl font-semibold">{blog.title}</h2>
                <p className="text-gray-600">
                  {blog.content.substring(0, 100)}...
                </p>
              </Link>

              {user?.id === blog.author && (
                <div className="mt-3 flex gap-4 text-sm">
                  <Link
                    to={`/edit/${blog._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
