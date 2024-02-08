import Joi from "joi";

export const commentSchema = Joi.object({
	body: Joi.string().required().messages({
		"string.empty": "Comment body can not be empty",
	}),
});
