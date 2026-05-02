const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  getDashboardStats
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const { isProjectAdmin } = require('../middleware/roleCheck');

router.route('/')
  .post(protect, createTask)
  .get(protect, getTasks);

router.get('/dashboard/stats', protect, getDashboardStats);

router.route('/:id')
  .get(protect, getTask)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;