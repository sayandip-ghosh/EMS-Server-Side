import express from 'express';
import {ProjectModel} from '../Models/Projects.model.js';  
import mongoose from 'mongoose';

const router = express.Router();
router.post('/projects', async (req, res) => {
  try {
    const { projectName, description, members, projectTags, projectLink, projectRepo, projectStatus, progress, projectLead, deadline } = req.body;
    console.log(projectName)
    const newProject = new ProjectModel({
      projectName,
      description,
      members,
      projectTags,
      projectLink,
      projectRepo,
      projectStatus,
      progress,
      projectLead,
      deadline,
    });

    await newProject.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: newProject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error creating project' });
  }
});
router.get('/projects', async (req, res) => {
  try {
    const projects = await ProjectModel.find().populate('members', 'name email'); 
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching projects' });
  }
});

router.get('/projects/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const project = await ProjectModel.findById(id).populate('members', 'name email');
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching project' });
  }
});
router.put('/projects/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProject = await ProjectModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProject) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: updatedProject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error updating project' });
  }
});
router.delete('/projects/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProject = await ProjectModel.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error deleting project' });
  }
});

export default router;
