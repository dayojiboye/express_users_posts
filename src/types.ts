import { Dialect } from "sequelize";

export interface dbConfigInterface {
	HOST: string | undefined;
	USER: string;
	PASSWORD: string;
	DB: string;
	dialect: Dialect | undefined;

	pool: {
		max: number;
		min: number;
		acquire: number;
		idle: number;
	};
}

export interface statusCodesInterface {
	SUCCESSFUL: number;
	VALIDATION_ERROR: number;
	UNAUTHORIZED: number;
	FORBIDDEN: number;
	NOT_FOUND: number;
	SERVER_ERROR: number;
}
