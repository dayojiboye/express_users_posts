import { Request, Response } from "express";
import { serverErrorMessage, statusCodes } from "../constants";
import { Comment } from "../models";
import { commentSchema } from "../security/commentValidator";

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
