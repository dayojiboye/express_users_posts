import express from "express";
import {
	createPost,
	getAllPosts,
	getAllPostsByUser,
	updatePost,
} from "../controllers/postController";

const router = express.Router();

router.post("/create", createPost);

router.get("/", getAllPosts);

router.get("/:userId", getAllPostsByUser);

router.put("/update/:postId", updatePost);

export default router;
