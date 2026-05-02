const Project = require('../models/Project');
const User = require('../models/User');

// @desc    Create new project
// @route   POST /api/projects
// @access  Private (Admin only)
const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Project name is required' });
    }

    const project = await Project.create({
      name,
      description,
      admin: req.user._id,
      members: []
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all projects (admin sees all, member sees only their projects)
// @route   GET /api/projects
// @access  Private
const getProjects = async (req, res) => {
  try {
    let projects;

    if (req.user.role === 'Admin') {
      // Admin sees all projects they created
      projects = await Project.find({ admin: req.user._id })
        .populate('admin', 'name email')
        .populate('members', 'name email');
    } else {
      // Members see projects they're part of
      projects = await Project.find({
        members: req.user._id
      })
        .populate('admin', 'name email')
        .populate('members', 'name email');
    }

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Private
const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('admin', 'name email')
      .populate('members', 'name email');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add member to project
// @route   POST /api/projects/:id/members
// @access  Private (Project Admin only)
const addMember = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const project = req.project; // From middleware

    // Check if already a member
    if (project.members.includes(user._id)) {
      return res.status(400).json({ message: 'User is already a member' });
    }

    project.members.push(user._id);
    await project.save();

    const updatedProject = await Project.findById(project._id)
      .populate('admin', 'name email')
      .populate('members', 'name email');

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove member from project
// @route   DELETE /api/projects/:id/members/:memberId
// @access  Private (Project Admin only)
const removeMember = async (req, res) => {
  try {
    const project = req.project;

    project.members = project.members.filter(
      member => member.toString() !== req.params.memberId
    );

    await project.save();

    const updatedProject = await Project.findById(project._id)
      .populate('admin', 'name email')
      .populate('members', 'name email');

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Project Admin only)
const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProject,
  addMember,
  removeMember,
  deleteProject
};