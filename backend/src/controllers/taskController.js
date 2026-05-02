const Task = require('../models/Task');

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private (Project Admin only)
const createTask = async (req, res) => {
  try {
    const { title, description, project, assignedTo, priority, deadline } = req.body;

    if (!title || !project || !deadline) {
      return res.status(400).json({ message: 'Please provide title, project, and deadline' });
    }

    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      priority: priority || 'Medium',
      deadline,
      createdBy: req.user._id
    });

    const populatedTask = await Task.findById(task._id)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .populate('project', 'name');

    res.status(201).json(populatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all tasks for a project
// @route   GET /api/tasks?project=projectId
// @access  Private (Project members)
const getTasks = async (req, res) => {
  try {
    const { project, status } = req.query;

    let query = {};

    if (project) {
      query.project = project;
    }

    if (status) {
      query.status = status;
    }

    // Members only see their assigned tasks
    if (req.user.role === 'Member') {
      query.assignedTo = req.user._id;
    }

    const tasks = await Task.find(query)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .populate('project', 'name')
      .sort({ createdAt: -1 });

    // Add overdue flag
    const tasksWithOverdue = tasks.map(task => {
      const isOverdue = new Date(task.deadline) < new Date() && task.status !== 'Completed';
      return {
        ...task.toObject(),
        isOverdue
      };
    });

    res.json(tasksWithOverdue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .populate('project', 'name');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const isOverdue = new Date(task.deadline) < new Date() && task.status !== 'Completed';

    res.json({
      ...task.toObject(),
      isOverdue
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Members can only update status of their assigned tasks
    if (req.user.role === 'Member') {
      if (task.assignedTo.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to update this task' });
      }
      // Members can only update status
      if (req.body.status) {
        task.status = req.body.status;
      }
    } else {
      // Admins can update everything
      Object.assign(task, req.body);
    }

    await task.save();

    const updatedTask = await Task.findById(task._id)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .populate('project', 'name');

    const isOverdue = new Date(updatedTask.deadline) < new Date() && updatedTask.status !== 'Completed';

    res.json({
      ...updatedTask.toObject(),
      isOverdue
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private (Project Admin only)
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get dashboard stats
// @route   GET /api/tasks/dashboard/stats
// @access  Private
const getDashboardStats = async (req, res) => {
  try {
    let query = {};

    // Members only see their tasks
    if (req.user.role === 'Member') {
      query.assignedTo = req.user._id;
    }

    const tasks = await Task.find(query);

    const stats = {
      total: tasks.length,
      pending: tasks.filter(t => t.status === 'Pending').length,
      inProgress: tasks.filter(t => t.status === 'In Progress').length,
      completed: tasks.filter(t => t.status === 'Completed').length,
      overdue: tasks.filter(t => 
        new Date(t.deadline) < new Date() && t.status !== 'Completed'
      ).length,
      highPriority: tasks.filter(t => t.priority === 'High').length
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  getDashboardStats
};