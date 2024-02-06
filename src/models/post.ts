import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig";

export default function () {
	const Post = sequelize.define(
		"post",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			title: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			body: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			userId: {
				type: DataTypes.UUID,
				allowNull: false,
			},
		},
		{}
	);

	return Post;
}
