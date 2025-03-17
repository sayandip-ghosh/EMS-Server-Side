import express from 'express';
import {
  createProject,
  getAllProjects,
  getProjectsForMember,
  getProjectById,
  updateProject,
  deleteProject,
} from '../Controllers/ProjectController.js';

const router = express.Router();

// Create a new project
router.post('/projects', createProject);

// Get all projects (Admin Only)
router.get('/projects', getAllProjects);

// Get projects assigned to a specific member
router.get('/projects/member/:memberId', getProjectsForMember);

// Get a specific project by ID
router.get('/projects/:id', getProjectById);

// Update a project by ID
router.put('/projects/:id', updateProject);

// Delete a project by ID
router.delete('/projects/:id', deleteProject);

export default router;
