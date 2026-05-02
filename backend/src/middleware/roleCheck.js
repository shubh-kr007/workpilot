const Project = require('../models/Project');

// Check if user is Admin (global role)
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin only.' });
  }
};

// Check if user is Admin of specific project
const isProjectAdmin = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.projectId || req.body.project);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.admin.toString() === req.user._id.toString()) {
      req.project = project; // Attach project to request
      next();
    } else {
      res.status(403).json({ message: 'Access denied. Project admin only.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check if user is member of project
const isProjectMember = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.projectId || req.body.project);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const isMember = project.members.some(
      member => member.toString() === req.user._id.toString()
    );
    
    const isAdmin = project.admin.toString() === req.user._id.toString();

    if (isMember || isAdmin) {
      req.project = project;
      next();
    } else {
      res.status(403).json({ message: 'Access denied. Not a project member.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { isAdmin, isProjectAdmin, isProjectMember };