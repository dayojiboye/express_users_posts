import post from "./post";
import user from "./user";

// Models
const User = user();
const Post = post();

// Relationships
User.hasMany(Post, {
	foreignKey: "userId",
	as: "posts",
});

Post.belongsTo(User, {
	foreignKey: "userId",
	as: "author",
});

export { User, Post };
