import comment from "./comment";
import post from "./post";
import user from "./user";

// Models
const User = user();
const Post = post();
const Comment = comment();

// Relationships
User.hasMany(Post, {
	foreignKey: "authorId",
	as: "posts",
});

User.hasMany(Comment, {
	foreignKey: "authorId",
	as: "commentsByUser",
});

Post.belongsTo(User, {
	foreignKey: "authorId",
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

Comment.belongsTo(User, {
	foreignKey: "authorId",
	as: "author",
});

export { User, Post, Comment };
