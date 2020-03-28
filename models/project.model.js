const mongoose = require("mongoose");

const categories = ["Health", "Sports", "Elderly care", "Community", "Food"]

const projectSchema = new mongoose.Schema(
	{
		title: {
			required: true,
			type: String,
		},
		category: {
			type: String,
			enum: categories, 
			required: true,
		},
		image: String,
		description: {
			required: true,
			type: String,
		},
		goal: {
			required: true,
			type: Number,
		},
		goalItem: {
			required: true,
			type: String,
		},
	},
	{ timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
