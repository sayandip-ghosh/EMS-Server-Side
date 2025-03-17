import { ProjectModel } from '../Models/Projects.model.js';

// Create a new project
export const createProject = async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Debugging log

    const { name, status, progress, deadline, team, githubLink, deploymentLink } = req.body;

    const newProject = new ProjectModel({
      name,
      status,
      progress,
      deadline,
      team,
      githubLink,
      deploymentLink,
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
};

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await ProjectModel.find().populate('team.id', 'name email');
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching projects' });
  }
};

// Get projects for a specific member
export const getProjectsForMember = async (req, res) => {
  const { memberId } = req.params;
  try {
    const projects = await ProjectModel.find({ 'team.id': memberId }).populate('team.id', 'name email');
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching projects for member' });
  }
};

// Get a single project by ID
export const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await ProjectModel.findById(id).populate('team.id', 'name email');
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching project' });
  }
};

// Update an existing project
export const updateProject = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProject = await ProjectModel.findByIdAndUpdate(id, req.body, { new: true }).populate('team.id', 'name email');
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
};

// Delete a project
export const deleteProject = async (req, res) => {
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
};
