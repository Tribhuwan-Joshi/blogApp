import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [isSigning, setIsSigning] = useState(false);

  const handleSubmit = async (e) => {
    setIsSigning(true);
    e.preventDefault();
    try {
      const res = await API.post("/auth/signup", { email, password });
      login(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    } finally {
      setIsSigning(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Signup</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          required
          type="email"
          placeholder="Email"
          className="p-2 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          minLength={8}
          placeholder="Password"
          className="p-2 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white py-2">
          {isSigning ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
}
