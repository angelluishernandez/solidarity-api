const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projects.controller");

router.post("/create-project", projectController.createProject);
router.get("/projects", projectController.listProjects);
router.get("/projects/:id", projectController.projectDetails)
router.patch("/edit-project/:id", projectController.editProject);
router.delete("/projects/:id/delete", projectController.deleteProject)


module.exports = router;
