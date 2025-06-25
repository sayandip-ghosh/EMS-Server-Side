import { ProjectModel } from '../Models/Projects.model.js';

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { name, description, status, progress, deadline, githubLink, deploymentLink, team } = req.body;

    if (!name || !team || !Array.isArray(team) || team.length === 0) {
      return res.status(400).json({ success: false, message: 'Project name and team are required' });
    }

    const newProject = new ProjectModel({
      name,
      description,
      status,
      progress,
      deadline,
      githubLink,
      deploymentLink,
      team,
    });

    const saved = await newProject.save();
    const populated = await saved.populate('team.id', 'username email'); // Corrected 'name' to 'username'

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: populated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await ProjectModel.find().populate('team.id', 'username email');
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get projects for a specific member
export const getProjectsForMember = async (req, res) => {
  const { memberId } = req.params;
  try {
    const projects = await ProjectModel.find({ 'team.id': memberId }).populate('team.id', 'username email');
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single project by ID
export const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await ProjectModel.findById(id).populate('team.id', 'username email');
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update an existing project
export const updateProject = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await ProjectModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    const populated = await updated.populate('team.id', 'username email');
    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: populated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await ProjectModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
