import { Request, Response } from "express";
import { postSchema } from "../security/postValidator";
import { serverErrorMessage, statusCodes } from "../constants";
import { Post, User } from "../models";

export const createPost = async (req: Request, res: Response) => {
	const userId = res.locals.user.id;
	const { error } = postSchema.validate(req.body);

	if (error) {
		res.status(statusCodes.VALIDATION_ERROR).json({ message: error.details[0].message });
		return;
	}

	try {
		const post = await Post.create(
			{ ...req.body, userId },
			{
				include: {
					model: User,
					as: "author",
					attributes: ["id", "username"],
				},
			}
		);
		res.status(statusCodes.SUCCESSFUL).json({ message: "Post created successfully", data: post });
	} catch (error) {
		console.log(error);
		res.status(statusCodes.SERVER_ERROR).json({ message: serverErrorMessage });
	}
};
