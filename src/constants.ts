import { statusCodesInterface } from "./types";

export const statusCodes: statusCodesInterface = {
	SUCCESSFUL: 200,
	VALIDATION_ERROR: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	SERVER_ERROR: 500,
};

export const defaultSuccessMessage = "Request processed successfully";
export const serverErrorMessage = "Internal server error";
