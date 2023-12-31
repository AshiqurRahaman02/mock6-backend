const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
	userID: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	userName: {
		type: String,
		required: true,
	},
	userAvatar: {
		type: String,
		required: true,
	},
	title: {
		type: String,
	},
	content: {
		type: String,
	},
	category: {
		type: String,
		default: "Business"
	},
	date: {
		type: Date,
		default: Date.now,
	},
	likes: {
		type: Number,
		default: 0,
	},
	comments: {
		type: Array,
		default: [],
	},
});

const BlogModel = mongoose.model("blog", blogSchema);

module.exports = {
	BlogModel
};
