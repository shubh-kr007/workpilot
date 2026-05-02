import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBell, FiSearch, FiChevronDown } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

const Navbar = ({ title = 'Dashboard' }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-20 bg-dark-900 border-b border-dark-800">
      <div className="h-16 flex items-center justify-between px-6 md:px-8">
        {/* Left Section */}
        <div className="flex items-center gap-4 flex-1">
          <h1 className="text-lg font-semibold text-dark-50 hidden md:block">
            {title}
          </h1>

          {/* Search */}
          <div className="hidden md:flex items-center gap-2 ml-auto">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" size={18} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-base pl-10 w-64"
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="p-2 hover:bg-dark-800 rounded-lg transition relative"
            >
              <FiBell size={20} className="text-dark-400" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent-red rounded-full"></span>
              )}
            </button>

            {/* Notification Dropdown */}
            {notificationOpen && (
              <div className="absolute right-0 top-12 w-80 bg-dark-900 border border-dark-800 rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-dark-800 flex items-center justify-between">
                  <h3 className="font-semibold text-dark-50">Notifications</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-accent-blue hover:text-accent-blue"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => markAsRead(notif.id)}
                        className={`p-4 border-b border-dark-800 cursor-pointer hover:bg-dark-800 transition ${
                          !notif.read ? 'bg-primary-900/20' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-medium text-dark-50 text-sm">
                            {notif.title}
                          </h4>
                          {!notif.read && (
                            <span className="w-2 h-2 bg-accent-blue rounded-full mt-1"></span>
                          )}
                        </div>
                        <p className="text-xs text-dark-400 mb-1">
                          {notif.message}
                        </p>
                        <p className="text-xs text-dark-500">
                          {notif.time}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-dark-500">
                      <p className="text-sm">No notifications</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Search */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden p-2 hover:bg-dark-800 rounded-lg transition"
          >
            <FiSearch size={20} className="text-dark-400" />
          </button>

          {/* User Menu */}
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 p-2 hover:bg-dark-800 rounded-lg transition"
          >
            <div className="w-8 h-8 bg-primary-800 rounded-full flex items-center justify-center text-dark-50 font-semibold text-sm border border-dark-700">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <FiChevronDown size={16} className="text-dark-400 hidden sm:block" />
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="md:hidden px-4 py-3 border-t border-dark-800">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" size={18} />
            <input
              type="text"
              placeholder="Search..."
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-base pl-10 w-full"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;