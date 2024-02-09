import { Request, Response } from "express";
import { postSchema } from "../security/postValidator";
import {
	defaultSuccessMessage,
	forbiddenErrorMessage,
	postNotFoundMessage,
	serverErrorMessage,
	statusCodes,
} from "../constants";
import { Comment, Post, User } from "../models";
import sequelize from "../config/dbConfig";

export const createPost = async (req: Request, res: Response) => {
	const authorId = res.locals.user.id;
	const { error } = postSchema.validate(req.body);

	if (error) {
		res.status(statusCodes.VALIDATION_ERROR).json({ message: error.details[0].message });
		return;
	}

	try {
		const post = await Post.create({ ...req.body, authorId });
		res.status(statusCodes.SUCCESSFUL).json({ message: "Post created successfully", data: post });
	} catch (error) {
		res.status(statusCodes.SERVER_ERROR).json({ message: serverErrorMessage });
	}
};

export const getAllPosts = async (req: Request, res: Response) => {
	const userId = req.query.userId;

	try {
		const posts = await Post.findAll({
			where: userId ? { authorId: userId } : undefined,
			order: [["updatedAt", "DESC"]],
			attributes: {
				include: [
					[
						sequelize.literal("(SELECT COUNT(*) FROM Comments WHERE Comments.postId = Post.id)"),
						"totalComments",
					],
				],
			},
			include: [
				{
					model: User,
					as: "author",
					attributes: ["id", "username"],
				},
				// {
				// 	model: Comment,
				// 	as: "comments",
				// 	attributes: [],
				// },
			],
		});

		res.status(statusCodes.SUCCESSFUL).json({ message: defaultSuccessMessage, data: posts });
	} catch (error) {
		res.status(statusCodes.SERVER_ERROR).json({ message: serverErrorMessage });
	}
};

export const getPost = async (req: Request, res: Response) => {
	const postId = req.params.postId;

	try {
		const post = await Post.findByPk(postId, {
			attributes: {
				include: [
					[
						sequelize.literal("(SELECT COUNT(*) FROM Comments WHERE Comments.postId = Post.id)"),
						"totalComments",
					],
				],
			},
			include: [
				{
					model: User,
					as: "author",
					attributes: ["id", "username"],
				},
				{
					model: Comment,
					as: "comments",
					include: [
						{
							model: User,
							as: "author",
							attributes: ["id", "username"],
						},
					],
				},
			],
			order: [[Post.associations.comments, "createdAt", "DESC"]],
		});

		res.status(statusCodes.SUCCESSFUL).json({ message: defaultSuccessMessage, data: post ?? {} });
	} catch (error) {
		res.status(statusCodes.SERVER_ERROR).json({ message: serverErrorMessage });
	}
};

export const updatePost = async (req: Request, res: Response) => {
	const userId = res.locals.user.id;
	const postId = req.params.postId;
	const { error } = postSchema.validate(req.body);

	if (error) {
		res.status(statusCodes.VALIDATION_ERROR).json({ message: error.details[0].message });
		return;
	}

	try {
		const postToUpdate = await Post.findByPk(postId);

		if (!postToUpdate) {
			res.status(statusCodes.NOT_FOUND).json({ message: postNotFoundMessage });
			return;
		}

		if (postToUpdate.dataValues.authorId !== userId) {
			res.status(statusCodes.FORBIDDEN).json({ message: forbiddenErrorMessage });
			return;
		}

		let editedPost: any = await Post.update(req.body, { where: { id: postId } });
		editedPost = await Post.findByPk(postId);
		res
			.status(statusCodes.SUCCESSFUL)
			.json({ message: "Post updated successfully", data: editedPost });
	} catch (error) {
		res.status(statusCodes.SERVER_ERROR).json({ message: serverErrorMessage });
	}
};

export const deletePost = async (req: Request, res: Response) => {
	const userId = res.locals.user.id;
	const postId = req.params.postId;

	try {
		const postToDelete = await Post.findByPk(postId);

		if (!postToDelete) {
			res.status(statusCodes.NOT_FOUND).json({ message: postNotFoundMessage });
			return;
		}

		if (postToDelete.dataValues.authorId !== userId) {
			res.status(statusCodes.FORBIDDEN).json({ message: forbiddenErrorMessage });
			return;
		}

		const post = await Post.destroy({ where: { id: postId } });
		res.status(statusCodes.SUCCESSFUL).json({ message: "Post deleted successfully", data: {} });
	} catch (error) {
		res.status(statusCodes.SERVER_ERROR).json({ message: serverErrorMessage });
	}
};
