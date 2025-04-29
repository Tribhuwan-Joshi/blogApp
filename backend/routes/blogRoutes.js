import express from "express";
import {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllBlogs); // Public: view blogs
router.post("/", protect, createBlog); // Protected: create
router.get("/:id", getBlogById); // Public: view one
router.put("/:id", protect, updateBlog); // Protected: update own
router.delete("/:id", protect, deleteBlog); // Protected: delete own

export default router;
