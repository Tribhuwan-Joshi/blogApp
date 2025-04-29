import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/edit/:id" element={<EditBlog />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
