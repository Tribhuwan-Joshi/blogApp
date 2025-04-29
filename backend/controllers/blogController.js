import Blog from "../models/Blog.js";

// GET all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "email")
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

// POST a blog
export const createBlog = async (req, res) => {
  const { title, content } = req.body;

  try {
    const blog = await Blog.create({
      title,
      content,
      author: req.user._id,
    });
    res.status(201).json(blog);
  } catch {
    res.status(400).json({ message: "Failed to create blog" });
  }
};

// GET single blog
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "email");
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch {
    res.status(500).json({ message: "Error fetching blog" });
  }
};

// PUT (Update blog)
export const updateBlog = async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not allowed" });

    blog.title = title;
    blog.content = content;
    await blog.save();

    res.json(blog);
  } catch {
    res.status(500).json({ message: "Update failed" });
  }
};

// DELETE blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not allowed" });

    await blog.deleteOne();
    res.json({ message: "Blog deleted" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
};
