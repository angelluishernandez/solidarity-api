const Project = require("../models/project.model");

// List projects

module.exports.listProjects = (req, res, next) => {
	Project.find()
		.then(projects => res.json(projects))
		.catch(error => console.log(error));
};

// Create project

module.exports.createProject = (req, res, next) => {
	const project = new Project({
		title: req.body.title,
		category: req.body.category,
		image: req.file ? req.file.irl : undefined,
		description: req.body.description,
		goal: req.body.goal,
		goalItem: req.body.goalItem,
	});

	project
		.save()
		.then(project => {
			console.log(project);
			res.status(200).json(project);
		})
		.catch(error => console.log(error));
};

// Edit project

module.exports.editProject = (req, res, next) => {
	const { title, category, image, description, goal, goalItem } = req.body;

	const projectToEdit = {
		title,
		category,
		image: req.file ? req.file.url : null,
		description,
		goal,
		goalItem,
	};

	Project.findByIdAndUpdate(req.params.id, projectToEdit, { new: true })
		.then(project => {
			res.json(project);
		})
		.catch(error => console.log(error));
};

// Project details

module.exports.projectDetails = (req, res, next) => {
	Project.findById(req.params.id)
		.then(project => res.json(project))
		.catch(error => console.log(error));
};

// Delete project

module.exports.deleteProject = (req, res, next) => {
	Project.findByIdAndDelete(req.params.id)
		.then(project => {
			console.log(`The project ${project.title} has been deleted`);
			res.json(`The project ${project.title} has been deleted`);
		})
		.catch(error => console.log(error));
};
