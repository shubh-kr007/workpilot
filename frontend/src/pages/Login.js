import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';
import Button from '../components/Button';
import Input from '../components/Input';
import { FiMail, FiLock } from 'react-icons/fi';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await authAPI.login({ email, password });
      login(data);
      toast.success(`Welcome back, ${data.name}!`);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const setDemoAdmin = () => {
    setEmail('admin@workpilot.com');
    setPassword('admin123');
  };

  const setDemoMember = () => {
    setEmail('member@workpilot.com');
    setPassword('member123');
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
    Plan. Assign. Track. Achieve.
  </p>
</div>

        {/* Form Card */}
        <div className="card p-8 space-y-6">
          <h2 className="text-xl font-semibold text-dark-50">
            Sign in to your account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              icon={FiMail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />

            <Input
              label="Password"
              type="password"
              icon={FiLock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={loading}
              className="w-full mt-6"
            >
              Sign In
            </Button>
          </form>

          {/* Demo Accounts */}
          <div className="pt-4 border-t border-dark-700 space-y-3">
            <p className="text-xs text-dark-400 font-medium">Demo Accounts:</p>
            
            <button
              type="button"
              onClick={setDemoAdmin}
              className="w-full p-4 bg-dark-800 hover:bg-dark-700 rounded-lg text-left transition border border-dark-700 group"
            >
              <p className="text-sm font-semibold text-accent-blue group-hover:text-accent-blue transition">
                👨‍💼 Admin Account
              </p>
              <p className="text-xs text-dark-500 mt-1">
                admin@workpilot.com
              </p>
              <p className="text-xs text-dark-600 mt-1">
                Full access • Click to auto-fill
              </p>
            </button>

            <button
              type="button"
              onClick={setDemoMember}
              className="w-full p-4 bg-dark-800 hover:bg-dark-700 rounded-lg text-left transition border border-dark-700 group"
            >
              <p className="text-sm font-semibold text-accent-green group-hover:text-accent-green transition">
                👤 Member Account
              </p>
              <p className="text-xs text-dark-500 mt-1">
                member@workpilot.com
              </p>
              <p className="text-xs text-dark-600 mt-1">
                Limited access • Click to auto-fill
              </p>
            </button>
          </div>

          <p className="text-center text-sm text-dark-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-accent-blue font-medium hover:underline">
              Create one
            </Link>
          </p>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-dark-900 rounded-lg border border-dark-800">
          <p className="text-xs text-dark-400">
            💡 <span className="font-medium text-dark-300">Tip:</span> To sign up as Admin during registration, use code: <span className="text-accent-yellow font-mono">admin2024</span>
          </p>
        </div>

        <p className="text-center text-xs text-dark-500 mt-6">
          © 2024 WorkPilot. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;