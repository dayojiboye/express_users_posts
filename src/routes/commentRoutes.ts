import express from "express";
import { createComment, deleteComment, getCommentsByPost } from "../controllers/commentController";

const router = express.Router();

router.get("/:postId", getCommentsByPost);

router.post("/create/:postId", createComment);

router.delete("/delete/:commentId", deleteComment);

export default router;
