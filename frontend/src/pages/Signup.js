import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';
import Button from '../components/Button';
import Input from '../components/Input';
import { FiUser, FiMail, FiLock, FiKey } from 'react-icons/fi';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const signupData = {
        ...formData,
        ...(isAdmin && adminCode ? { adminCode } : {}),
      };

      const { data } = await authAPI.signup(signupData);
      login(data);
      toast.success(`Account created successfully! Role: ${data.role}`);
      navigate('/dashboard');
    } catch (error) {
      const message = error.response?.data?.message || 'Signup failed';
      toast.error(message);
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
<div className="text-center mb-8">
  {/* LOGO IMAGE */}
  <img 
    src="/workpilotlogo.png" 
    alt="WorkPilot" 
    className="w-16 h-16 mx-auto rounded-lg mb-4"
  />
  <h1 className="text-3xl font-bold text-dark-50 mb-2">
    WorkPilot
  </h1>
  <p className="text-dark-400">
    Create your account
  </p>
</div>

        {/* Form Card */}
        <div className="card p-8 space-y-6">
          <h2 className="text-xl font-semibold text-dark-50">
            Join WorkPilot
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <Input
              label="Full Name"
              type="text"
              icon={FiUser}
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />

            {/* Email */}
            <Input
              label="Email Address"
              type="email"
              icon={FiMail}
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />

            {/* Password */}
            <Input
              label="Password"
              type="password"
              icon={FiLock}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              hint="At least 6 characters"
              required
              minLength={6}
            />

            {/* Admin Signup Toggle */}
            <div className="pt-4 border-t border-dark-700">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  className="w-4 h-4 rounded border-dark-600 bg-dark-800"
                />
                <span className="text-sm font-medium text-dark-300">
                  Sign up as Admin
                </span>
              </label>
              <p className="text-xs text-dark-500 mt-2">
                Check this if you have an admin code
              </p>
            </div>

            {/* Admin Code Input */}
            {isAdmin && (
              <Input
                label="Admin Code"
                type="password"
                icon={FiKey}
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                placeholder="Enter admin code"
                required={isAdmin}
              />
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={loading}
              className="w-full mt-6"
            >
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-dark-400">
            Already have an account?{' '}
            <Link to="/login" className="text-accent-blue font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-dark-500 mt-6">
          © 2024 WorkPilot. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Signup;