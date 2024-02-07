import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig";

export default function () {
	const Comment = sequelize.define(
		"comment",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			body: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			postId: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			authorId: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{}
	);

	return Comment;
}
