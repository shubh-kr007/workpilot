import React, { useState } from 'react';
import Layout from '../components/Layout';
import Card, { CardBody, CardHeader } from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../context/AuthContext';
import { FiEdit2, FiSave } from 'react-icons/fi';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
  });

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <Layout title="Profile">
      <div className="max-w-2xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-dark-900 dark:text-dark-50 mb-2">
            Profile Settings
          </h1>
          <p className="text-dark-600 dark:text-dark-400">
            Manage your account information.
          </p>
        </div>

        {/* Profile Card */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-primary-600 to-primary-700">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
                  <p className="text-primary-100">{user?.role}</p>
                </div>
              </div>
              <Button
                variant="secondary"
                icon={isEditing ? FiSave : FiEdit2}
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              >
                {isEditing ? 'Save' : 'Edit'}
              </Button>
            </div>
          </CardHeader>

          <CardBody className="space-y-6">
            {/* Personal Info */}
            <div>
              <h3 className="font-semibold text-dark-900 dark:text-dark-50 mb-4">
                Personal Information
              </h3>
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                />
                <Input
                  label="Role"
                  value={formData.role}
                  disabled
                />
              </div>
            </div>

            {/* Account Settings */}
            <div className="pt-6 border-t border-dark-200 dark:border-dark-700">
              <h3 className="font-semibold text-dark-900 dark:text-dark-50 mb-4">
                Account Settings
              </h3>
              <div className="space-y-4">
                <Button variant="secondary" className="w-full">
                  Change Password
                </Button>
                <Button variant="secondary" className="w-full">
                  Two-Factor Authentication
                </Button>
                <Button variant="danger" className="w-full">
                  Delete Account
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;