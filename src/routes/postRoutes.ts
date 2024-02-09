import express from "express";
import { createPost, getAllPosts, getPost, updatePost } from "../controllers/postController";

const router = express.Router();

router.post("/create", createPost);

router.get("/", getAllPosts);

router.get("/:postId", getPost);

router.put("/update/:postId", updatePost);

router.delete("/delete/:postId"); // Delete a post

export default router;
