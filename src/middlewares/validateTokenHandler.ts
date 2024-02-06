import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
	badTokenFormatMessage,
	invalidTokenMessage,
	statusCodes,
	unauthorizedMessage,
} from "../constants";

const validateToken = function (req: Request, res: Response, next: NextFunction) {
	let token;
	let authHeader = req.headers.authorization;
	if (authHeader && authHeader.startsWith("Bearer")) {
		token = authHeader.split("Bearer ")[1];
		if (token) {
			jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET!, (err, decodedToken: any) => {
				if (err) {
					if (err.message.includes("jwt expired")) {
						res.status(statusCodes.UNAUTHORIZED).json({ message: invalidTokenMessage });
					} else {
						res.status(statusCodes.UNAUTHORIZED).json({ message: unauthorizedMessage });
					}
				} else {
					next();
				}
			});
		} else {
			res.status(statusCodes.FORBIDDEN).json({ message: badTokenFormatMessage });
		}
	} else {
		res.status(statusCodes.FORBIDDEN).json({ message: badTokenFormatMessage });
	}
};

export default validateToken;
