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

router.post('/projects', createProject);
router.get('/projects', getAllProjects);
router.get('/projects/member/:memberId', getProjectsForMember);
router.get('/projects/:id', getProjectById);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

export default router;
