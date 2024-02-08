import express from "express";
import { createComment } from "../controllers/commentController";

const router = express.Router();

router.get("/:postId"); // Get comments of a specific post

router.post("/create/:postId", createComment);

router.delete("/delete/:commentId"); // Delete a comment from a post

export default router;
