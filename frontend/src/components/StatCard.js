import React from 'react';

const StatCard = ({ title, value, icon: Icon, change, trend = 'up' }) => {
  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-dark-600 dark:text-dark-400 mb-2">{title}</p>
          <p className="text-3xl font-bold text-dark-900 dark:text-dark-50">{value}</p>
        </div>
        {Icon && (
          <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
            <Icon size={24} className="text-primary-600 dark:text-primary-400" />
          </div>
        )}
      </div>
      {change && (
        <div className="flex items-center gap-1 text-sm">
          <span className={trend === 'up' ? 'text-accent-green' : 'text-accent-red'}>
            {trend === 'up' ? '↑' : '↓'} {change}%
          </span>
          <span className="text-dark-500 dark:text-dark-400">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;