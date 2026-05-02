const express = require('express');
const router = express.Router();
const {
  createProject,
  getProjects,
  getProject,
  addMember,
  removeMember,
  deleteProject
} = require('../controllers/projectController');
const { protect } = require('../middleware/auth');
const { isAdmin, isProjectAdmin } = require('../middleware/roleCheck');

router.route('/')
  .post(protect, isAdmin, createProject)
  .get(protect, getProjects);

router.route('/:id')
  .get(protect, getProject)
  .delete(protect, isProjectAdmin, deleteProject);

router.route('/:projectId/members')
  .post(protect, isProjectAdmin, addMember);

router.route('/:projectId/members/:memberId')
  .delete(protect, isProjectAdmin, removeMember);

module.exports = router;