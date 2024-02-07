import express from "express";
import { createPost, getAllPosts, getAllPostsByUser } from "../controllers/postController";

const router = express.Router();

router.post("/create", createPost);

router.get("/", getAllPosts);

router.get("/:userId", getAllPostsByUser); // Get all posts by userId

export default router;
