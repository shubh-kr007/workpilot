import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Card, { CardBody } from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import { FiPlus, FiFolder, FiUsers, FiTrash2 } from 'react-icons/fi';
import { projectAPI } from '../services/api';
import toast from 'react-hot-toast';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectAPI.getAll();
      setProjects(response.data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
      // Set dummy data as fallback
      setProjects([
        {
          _id: '1',
          name: 'Website Redesign',
          description: 'Complete redesign of company website',
          members: [{ _id: '1', name: 'John' }],
          progress: 65,
        },
        {
          _id: '2',
          name: 'Mobile App',
          description: 'iOS and Android application',
          members: [{ _id: '1' }, { _id: '2' }],
          progress: 45,
        },
        {
          _id: '3',
          name: 'API Integration',
          description: 'Third-party service integration',
          members: [{ _id: '1' }, { _id: '2' }, { _id: '3' }],
          progress: 85,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async () => {
    if (!formData.name.trim()) {
      toast.error('Project name is required');
      return;
    }

    setSubmitting(true);
    try {
      const response = await projectAPI.create(formData);
      setProjects([...projects, response.data]);
      setFormData({ name: '', description: '' });
      setIsModalOpen(false);
      toast.success('Project created successfully!');
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error(error.response?.data?.message || 'Failed to create project');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectAPI.delete(id);
        setProjects(projects.filter((p) => p._id !== id));
        toast.success('Project deleted successfully!');
      } catch (error) {
        console.error('Error deleting project:', error);
        toast.error('Failed to delete project');
      }
    }
  };

  if (loading) {
    return (
      <Layout title="Projects">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-900 border-t-transparent"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Projects">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-dark-50 mb-2">
              Projects
            </h1>
            <p className="text-dark-400">
              Manage all your projects and track progress.
            </p>
          </div>
          <Button
            variant="primary"
            icon={FiPlus}
            onClick={() => setIsModalOpen(true)}
          >
            New Project
          </Button>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project._id} hoverable>
                <CardBody className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary-800/30 rounded-lg border border-dark-700">
                        <FiFolder className="text-accent-blue" size={20} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-dark-50">
                          {project.name}
                        </h3>
                        <p className="text-xs text-dark-400">
                          {project.description}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteProject(project._id)}
                      className="p-1 hover:bg-accent-red/20 rounded-lg transition text-accent-red"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>

                  {/* Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-dark-400">
                        Progress
                      </span>
                      <span className="text-sm font-bold text-dark-50">
                        {project.progress || 0}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-dark-800 rounded-full overflow-hidden border border-dark-700">
                      <div
                        className="h-full bg-primary-900 transition-all"
                        style={{ width: `${project.progress || 0}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-dark-700">
                    <div className="flex items-center gap-2 text-sm">
                      <FiUsers size={16} className="text-dark-500" />
                      <span className="text-dark-400">
                        {project.members?.length || 0} members
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FiFolder size={16} className="text-dark-500" />
                      <span className="text-dark-400">
                        {project.tasks?.length || 0} tasks
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 card">
            <FiFolder size={48} className="mx-auto text-dark-500 mb-4" />
            <p className="text-dark-400 mb-4">
              No projects yet. Create your first one!
            </p>
            <Button variant="primary" icon={FiPlus} onClick={() => setIsModalOpen(true)}>
              Create Project
            </Button>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Project"
      >
        <div className="space-y-4">
          <Input
            label="Project Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Website Redesign"
          />
          <Input
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Brief description of the project"
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
              onClick={handleCreateProject}
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

export default Projects;