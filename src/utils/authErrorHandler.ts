import Joi from "joi";

// Check the duplicate error codes for Sequelize
export const authErrors = (err: any) => {
	// Duplicate error codes
	if (err.code === 11000) {
		// Duplicate username error
		if (err.message.includes("username")) {
			return "Username already taken";
		}

		// Duplicate email error
		if (err.message.includes("email")) {
			return "Email already taken";
		}
	}

	// Incorrect email error & Incorrect password error
	if (err.message === "Invalid email" || err.message === "Invalid email or password") {
		return err.message;
	}
};

export const registrationSchema = Joi.object({
	firstName: Joi.string().required().messages({
		"string.empty": "Please enter a first name",
	}),
	lastName: Joi.string().required().messages({
		"string.empty": "Please enter a last name",
	}),
	username: Joi.string().min(6).required().messages({
		"string.empty": "Please enter a username",
		"string.min": "Username must be at least 3 characters",
	}),
	email: Joi.string().email().required().messages({
		"string.empty": "Please enter an email",
		"string.email": "Please enter a valid email",
	}),
	password: Joi.string().min(6).required().messages({
		"string.empty": "Please enter a password",
		"string.min": "Password must be at least 6 characters",
	}),
});

export const loginSchema = Joi.object({
	email: Joi.string().email().required().messages({
		"string.empty": "Please enter an email",
		"string.email": "Please enter a valid email",
	}),
	password: Joi.string().min(6).required().messages({
		"string.empty": "Please enter a password",
		"string.min": "Password must be at least 6 characters",
	}),
});
