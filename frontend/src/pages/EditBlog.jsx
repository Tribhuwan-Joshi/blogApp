import { useState, useEffect } from "react";
import API from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

export default function EditBlog() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/blogs/${id}`).then((res) => {
      setTitle(res.data.title);
      setContent(res.data.content);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.put(`/blogs/${id}`, { title, content });
    navigate("/");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Edit Blog</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          className="p-2 border"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="p-2 border h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="bg-blue-500 text-white py-2">Update</button>
      </form>
    </div>
  );
}
