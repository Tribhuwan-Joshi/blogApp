import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/blogs/${id}`).then((res) => setBlog(res.data));
  }, [id]);

  const handleDelete = async () => {
    if (confirm("Are you sure?")) {
      await API.delete(`/blogs/${id}`);
      navigate("/");
    }
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl mb-2">{blog.title}</h1>
      <p className="text-gray-700 mb-4">{blog.content}</p>

      {user && user._id === blog.author && (
        <div className="flex gap-2">
          <Link
            to={`/edit/${blog._id}`}
            className="bg-yellow-500 px-4 py-2 text-white rounded"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 px-4 py-2 text-white rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
