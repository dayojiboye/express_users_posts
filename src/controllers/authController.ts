import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { authErrors, registrationSchema } from "../security/authValidators";
import { defaultSuccessMessage, statusCodes } from "../constants";
import { User } from "../models";

const createToken = (id: any) => {
	return jwt.sign({ id }, process.env.JWT_ACCESS_TOKEN_SECRET ?? "", {
		expiresIn: Number(process.env.ACCESS_TOKEN_MAX_AGE_MINUTES) * 60,
	});
};

export const register = async (req: Request, res: Response) => {
	const { error } = registrationSchema.validate(req.body);

	if (error) {
		console.log(error);
		res.status(statusCodes.VALIDATION_ERROR).json({ message: error.details[0].message });
		return;
	}

	try {
		const user = await User.create(req.body);
		const accessToken = createToken(user.dataValues.id);
		res.status(statusCodes.SUCCESSFUL).json({
			message: defaultSuccessMessage,
			data: {
				user,
				accessToken: {
					token: accessToken,
					expiryTimeInMinutes: Number(process.env.ACCESS_TOKEN_MAX_AGE_MINUTES),
				},
			},
		});
	} catch (error: any) {
		const validationError = authErrors(error.errors[0]);
		res.status(statusCodes.VALIDATION_ERROR).json({ message: validationError });
	}
};
