import { Request, Response } from "express";
import {
	defaultSuccessMessage,
	forbiddenErrorMessage,
	serverErrorMessage,
	statusCodes,
} from "../constants";
import { Comment, Post, User } from "../models";
import { commentSchema } from "../security/commentValidator";
import sequelize from "../config/dbConfig";

export const createComment = async (req: Request, res: Response) => {
	const postId = req.params.postId;
	const authorId = res.locals.user.id;
	const { error } = commentSchema.validate(req.body);

	if (error) {
		res.status(statusCodes.VALIDATION_ERROR).json({ message: error.details[0].message });
		return;
	}

	try {
		const comment = await Comment.create({ ...req.body, postId, authorId });
		res
			.status(statusCodes.SUCCESSFUL)
			.json({ message: "Comment added successfully", data: comment });
	} catch (error) {
		res.status(statusCodes.SERVER_ERROR).json({ message: serverErrorMessage });
	}
};

export const getCommentsByPost = async (req: Request, res: Response) => {
	const postId = req.params.postId;

	try {
		const comments = await Comment.findAll({
			where: { postId },
			order: [["createdAt", "DESC"]],
			attributes: {
				include: [
					[sequelize.col("author.username"), "authorUsername"],
					[sequelize.col("post.title"), "postTitle"],
				],
			},
			include: [
				{
					model: User,
					as: "author",
					attributes: [],
				},
				{
					model: Post,
					as: "post",
					attributes: [],
				},
			],
		});
		res.status(statusCodes.SUCCESSFUL).json({ message: defaultSuccessMessage, data: comments });
	} catch (error) {
		console.log(error);
		res.status(statusCodes.SERVER_ERROR).json({ message: serverErrorMessage });
	}
};

export const deleteComment = async (req: Request, res: Response) => {
	const commentId = req.params.commentId;
	const userId = res.locals.user.id;

	try {
		const commentToDelete = await Comment.findByPk(commentId);

		if (!commentToDelete) {
			res.status(statusCodes.NOT_FOUND).json({ message: "No comment found" });
			return;
		}

		if (commentToDelete.dataValues.authorId !== userId) {
			res.status(statusCodes.FORBIDDEN).json({ message: forbiddenErrorMessage });
			return;
		}

		const comment = await Comment.destroy({ where: { id: commentId } });
		res.status(statusCodes.SUCCESSFUL).json({ message: "Comment deleted successfully", data: {} });
	} catch (error) {
		res.status(statusCodes.SERVER_ERROR).json({ message: serverErrorMessage });
	}
};
