import Joi from "joi";

export const postSchema = Joi.object({
	title: Joi.string().required().messages({
		"string.empty": "Title can not be empty",
	}),
	body: Joi.string().required().messages({
		"string.empty": "Body can not be empty",
	}),
});
