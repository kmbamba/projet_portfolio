const express = require("express");
const router = express.Router();

const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

// ─────────────────────────────────────────────
//  Route de base : /api/projects
// ─────────────────────────────────────────────

// GET  /api/projects       → Tous les projets
// POST /api/projects       → Créer un projet
router.route("/").get(getAllProjects).post(createProject);

// GET    /api/projects/:id  → Un projet par ID
// PUT    /api/projects/:id  → Modifier un projet
// DELETE /api/projects/:id  → Supprimer un projet
router.route("/:id").get(getProjectById).put(updateProject).delete(deleteProject);

module.exports = router;
