import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    API.get("/blogs").then((res) => {
      setBlogs(res.data);
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Blogs</h1>
      <div className="grid gap-4">
        {blogs.map((blog) => (
          <Link
            key={blog._id}
            to={`/blogs/${blog._id}`}
            className="border p-4 rounded hover:bg-gray-100"
          >
            <h2 className="text-xl">{blog.title}</h2>
            <p className="text-gray-600">{blog.content.substring(0, 100)}...</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
