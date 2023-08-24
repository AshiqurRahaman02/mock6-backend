const express = require("express");
const { BlogModel } = require("../models/blog.model");

const blogRouter = express.Router();

blogRouter.get("/api/blogs", async (req, res) => {
	try {
		const blogs = await BlogModel.find();
		res.status(200).json({ isError: false, blogs });
	} catch (error) {
		res.status(404).json({ isError: true, message: error.message });
	}
});

blogRouter.get("/api/blogsByTitle", async (req, res) => {
	const title = req.query.title;
	try {
		const blogs = await BlogModel.find({ title });
		res.status(200).json({ isError: false, blogs });
	} catch (error) {
		res.status(404).json({ isError: true, message: error.message });
	}
});

blogRouter.get("/api/blogsByCategory", async (req, res) => {
	const category = req.query.category;
	try {
		const blogs = await BlogModel.find({ category });
		res.status(200).json({ isError: false, blogs });
	} catch (error) {
		res.status(404).json({ isError: true, message: error.message });
	}
});

blogRouter.get("/api/blogsBySort", async (req, res) => {
	const { sort, order } = req.query;
	try {
		let s = -1;
		if (order === "asc") {
			s = 1;
		}
		const blogs = await BlogModel.find().sort({ date: s });
		res.status(200).json({ isError: false, blogs });
	} catch (error) {
		res.status(404).json({ isError: true, message: error.message });
	}
});

blogRouter.post("/api/blogs", async (req, res) => {
	const { _id, name, avater } = req.user;
	const { title, content, category } = req.body;

	try {
		const newBlog = await BlogModel.create({
			userID: _id,
			userName: name,
			userAvatar: avater,
			category: category,
			title: title,
			content: content,
		});
		res.status(201).json({
			isError: false,
			newBlog,
			message: "Blog created successfully",
		});
	} catch (error) {
		res.status(404).json({ isError: true, message: error.message });
	}
});

blogRouter.put("/api/blogs/:id", async (req, res) => {
	const id = req.query.id;
	const updatedData = req.body;
	try {
		await BlogModel.findByIdAndUpdate(id, updatedData);
		res.status(201).json({
			isError: false,
			message: "Blog updated successfully.",
		});
	} catch (error) {
		res.status(404).json({ isError: true, message: error.message });
	}
});

blogRouter.delete("/api/blogs/:id", async (req, res) => {
	const blogId = req.query.id;
	try {
		await BlogModel.findByIdAndDelete(blogId);
		res.status(201).json({
			isError: false,
			message: "Blog deleted successfully.",
		});
	} catch (error) {
		res.status(404).json({ isError: true, message: error.message });
	}
});

module.exports = {
	blogRouter,
};
