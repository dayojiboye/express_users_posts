import comment from "./comment";
import post from "./post";
import user from "./user";

// Models
const User = user();
const Post = post();
const Comment = comment();

// Relationships
User.hasMany(Post, {
	foreignKey: "userId",
	as: "posts",
});

Post.belongsTo(User, {
	foreignKey: "userId",
	as: "author",
});

Post.hasMany(Comment, {
	foreignKey: "postId",
	as: "comments",
});

Comment.belongsTo(Post, {
	foreignKey: "postId",
	as: "post",
});

export { User, Post, Comment };
