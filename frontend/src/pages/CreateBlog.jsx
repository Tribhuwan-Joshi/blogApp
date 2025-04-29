import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/blogs", { title, content });
      navigate("/");
    } catch (err) {
      alert("Error creating blog");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Create Blog</h1>
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
        <button className="bg-green-500 text-white py-2">Publish</button>
      </form>
    </div>
  );
}
