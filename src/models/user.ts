import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig";
import bcrypt from "bcrypt";

export default function () {
	const User = sequelize.define(
		"user",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
		},
		{
			hooks: {
				async beforeCreate(user, options) {
					const salt = await bcrypt.genSalt();
					user.dataValues.password = await bcrypt.hash(user.dataValues.password, salt);
				},

				afterCreate(user, options) {
					delete user.dataValues.password;
				},
			},
		}
	);

	User.prototype.login = async function (email: string, password: string) {
		const user = await User.findOne({ where: { email } });

		if (user) {
			const auth = await bcrypt.compare(password, user.dataValues.password);
			if (auth) {
				delete user.dataValues.password;
				return user;
			}
			throw Error("Invalid email or password");
		}

		throw Error("Invalid email");
	};

	return User;
}
