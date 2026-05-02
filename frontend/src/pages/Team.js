import React, { useState } from 'react';
import Layout from '../components/Layout';
import Card, { CardBody } from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Badge from '../components/Badge';
import { FiPlus, FiUsers, FiTrash2, FiMail } from 'react-icons/fi';

const Team = () => {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      avatar: 'JD',
      joinedDate: '2024-01-01',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Member',
      avatar: 'JS',
      joinedDate: '2024-01-05',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'Member',
      avatar: 'MJ',
      joinedDate: '2024-01-10',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ email: '' });

  const handleAddMember = () => {
    if (formData.email.trim()) {
      setIsModalOpen(false);
      setFormData({ email: '' });
    }
  };

  const handleRemoveMember = (id) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  return (
    <Layout title="Team">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-dark-900 dark:text-dark-50 mb-2">
              Team Members
            </h1>
            <p className="text-dark-600 dark:text-dark-400">
              Manage your team and permissions.
            </p>
          </div>
          <Button
            variant="primary"
            icon={FiPlus}
            onClick={() => setIsModalOpen(true)}
          >
            Add Member
          </Button>
        </div>

        {/* Members List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <Card key={member.id} hoverable>
              <CardBody className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {member.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-dark-900 dark:text-dark-50">
                        {member.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-dark-500 dark:text-dark-400 mt-1">
                        <FiMail size={14} />
                        {member.email}
                      </div>
                    </div>
                  </div>
                  {member.role !== 'Admin' && (
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition text-accent-red"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  )}
                </div>

                {/* Role & Date */}
                <div className="space-y-2 pt-2 border-t border-dark-200 dark:border-dark-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-dark-600 dark:text-dark-400">Role</span>
                    <Badge variant={member.role === 'Admin' ? 'info' : 'pending'}>
                      {member.role}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-dark-600 dark:text-dark-400">
                      Joined
                    </span>
                    <span className="text-xs text-dark-900 dark:text-dark-50">
                      {new Date(member.joinedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {members.length === 0 && (
          <div className="text-center py-12 card">
            <FiUsers size={48} className="mx-auto text-dark-400 mb-4" />
            <p className="text-dark-600 dark:text-dark-400 mb-4">
              No team members yet. Add your first member!
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Team Member"
      >
        <div className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="member@example.com"
          />
          <Input
            label="Role"
            as="select"
            defaultValue="Member"
          >
            <option>Member</option>
            <option>Admin</option>
          </Input>
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
              onClick={handleAddMember}
              className="flex-1"
            >
              Add Member
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default Team;