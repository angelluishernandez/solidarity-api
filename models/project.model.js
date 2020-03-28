const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
	{
		title: {
			required: true,
			type: String,
		},
		category: {
			type: String,
			unique: true,
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
