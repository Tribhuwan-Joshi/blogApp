import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    API.get(`/blogs/${id}`).then((res) => setBlog(res.data));
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl mb-2">{blog.title}</h1>
      <p className="text-gray-700 mb-4">{blog.content}</p>
    </div>
  );
}
