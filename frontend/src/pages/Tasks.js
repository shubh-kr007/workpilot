import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Card, { CardBody } from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import Input from '../components/Input';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../components/Table';
import { FiPlus, FiFilter, FiTrash2 } from 'react-icons/fi';
import { taskAPI, projectAPI } from '../services/api';
import toast from 'react-hot-toast';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project: '',
    priority: 'Medium',
    deadline: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [tasksRes, projectsRes] = await Promise.all([
        taskAPI.getAll(),
        projectAPI.getAll(),
      ]);
      setTasks(tasksRes.data || []);
      setProjects(projectsRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
      // Dummy fallback
      setTasks([]);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async () => {
    if (!formData.title.trim()) {
      toast.error('Task title is required');
      return;
    }
    if (!formData.project) {
      toast.error('Please select a project');
      return;
    }
    if (!formData.deadline) {
      toast.error('Please set a deadline');
      return;
    }

    setSubmitting(true);
    try {
      const response = await taskAPI.create({
        ...formData,
        deadline: new Date(formData.deadline).toISOString(),
      });
      setTasks([...tasks, response.data]);
      setFormData({
        title: '',
        description: '',
        project: '',
        priority: 'Medium',
        deadline: '',
      });
      setIsModalOpen(false);
      toast.success('Task created successfully!');
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error(error.response?.data?.message || 'Failed to create task');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.delete(id);
        setTasks(tasks.filter((t) => t._id !== id));
        toast.success('Task deleted successfully!');
      } catch (error) {
        console.error('Error deleting task:', error);
        toast.error('Failed to delete task');
      }
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await taskAPI.update(id, { status: newStatus });
      setTasks(tasks.map((t) => (t._id === id ? response.data : t)));
      toast.success('Task updated successfully!');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = filterStatus === 'All' || task.status === filterStatus;
    const priorityMatch = filterPriority === 'All' || task.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  const getStatusBadge = (status) => {
    const variants = {
      'Completed': 'status-completed',
      'In Progress': 'status-inprogress',
      'Pending': 'status-pending',
      'Overdue': 'status-overdue',
    };
    return variants[status] || 'status-pending';
  };

  const getPriorityBadge = (priority) => {
    const variants = {
      'High': 'priority-high-badge',
      'Medium': 'priority-medium-badge',
      'Low': 'priority-low-badge',
    };
    return variants[priority] || 'priority-low-badge';
  };

  if (loading) {
    return (
      <Layout title="Tasks">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-900 border-t-transparent"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Tasks">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-dark-50 mb-2">
              Tasks
            </h1>
            <p className="text-dark-400">
              Manage and track all your tasks.
            </p>
          </div>
          <Button variant="primary" icon={FiPlus} onClick={() => setIsModalOpen(true)}>
            New Task
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <FiFilter size={18} className="text-dark-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-base text-sm"
            >
              <option>All Statuses</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Overdue</option>
            </select>
          </div>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="input-base text-sm"
          >
            <option>All Priorities</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        {/* Tasks Table */}
        {filteredTasks.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Task</TableHeader>
                <TableHeader>Project</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Priority</TableHeader>
                <TableHeader>Due Date</TableHeader>
                <TableHeader>Action</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task._id}>
                  <TableCell>
                    <p className="font-medium text-dark-50">
                      {task.title}
                    </p>
                  </TableCell>
                  <TableCell>{task.project?.name || 'N/A'}</TableCell>
                  <TableCell>
                    <select
                      value={task.status}
                      onChange={(e) => handleUpdateStatus(task._id, e.target.value)}
                      className="input-base text-xs py-1"
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPriorityBadge(task.priority)}>
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(task.deadline).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="p-1 hover:bg-accent-red/20 rounded transition text-accent-red"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-12 card">
            <p className="text-dark-400 mb-4">
              No tasks found. Create your first task!
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Task"
      >
        <div className="space-y-4">
          <Input
            label="Task Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Design landing page"
          />
          <Input
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Task description"
          />
          <Input
            label="Project"
            as="select"
            value={formData.project}
            onChange={(e) => setFormData({ ...formData, project: e.target.value })}
          >
            <option value="">Select a project</option>
            {projects.map((proj) => (
              <option key={proj._id} value={proj._id}>
                {proj.name}
              </option>
            ))}
          </Input>
          <Input
            label="Priority"
            as="select"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </Input>
          <Input
            label="Deadline"
            type="date"
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
          />
          <div className="flex gap-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateTask}
              loading={submitting}
              className="flex-1"
            >
              Create
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default Tasks;