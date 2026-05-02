import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiHome,
  FiFolder,
  FiCheckSquare,
  FiUsers,
  FiBarChart2,
  FiLogOut,
  FiMenu,
  FiX,
} from 'react-icons/fi';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: FiHome },
    { name: 'Projects', path: '/projects', icon: FiFolder },
    { name: 'Tasks', path: '/tasks', icon: FiCheckSquare },
    { name: 'Team', path: '/team', icon: FiUsers },
    { name: 'Reports', path: '/reports', icon: FiBarChart2 },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 hover:bg-dark-800 rounded-lg transition"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-dark-900 border-r border-dark-800 z-40 transform transition-transform duration-300 md:translate-x-0 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
<div className="h-16 flex items-center px-6 border-b border-dark-800">
  <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2">
    {/* LOGO IMAGE */}
    <img 
      src="/workpilotlogo.png" 
      alt="WorkPilot" 
      className="w-8 h-8 rounded-lg"
    />
    {/* TEXT LOGO */}
    <span className="font-bold text-lg hidden sm:inline text-dark-50">WorkPilot</span>
  </button>
</div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                  active
                    ? 'bg-primary-900 text-dark-50 border border-dark-700'
                    : 'text-dark-400 hover:text-dark-50 hover:bg-dark-800'
                }`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer Section */}
        <div className="p-4 border-t border-dark-800 space-y-3">
          {/* User Info */}
          <div className="px-4 py-3 bg-dark-800 rounded-lg border border-dark-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-primary-800 rounded-full flex items-center justify-center text-dark-50 font-semibold text-sm border border-dark-600">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-dark-50 truncate">{user?.name}</p>
                <p className="text-xs text-dark-400 truncate">{user?.role}</p>
              </div>
            </div>
            <button
              onClick={() => handleNavClick('/profile')}
              className="w-full text-xs text-dark-400 hover:text-accent-blue font-medium transition"
            >
              Edit Profile
            </button>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-dark-400 hover:text-accent-red hover:bg-dark-800 transition font-medium"
          >
            <FiLogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;