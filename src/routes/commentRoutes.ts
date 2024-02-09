import express from "express";
import { createComment, getCommentsByPost } from "../controllers/commentController";

const router = express.Router();

router.get("/:postId", getCommentsByPost);

router.post("/create/:postId", createComment);

router.delete("/delete/:commentId"); // Delete a comment from a post

export default router;
