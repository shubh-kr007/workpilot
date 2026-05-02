import React from 'react';

const Badge = ({ children, variant = 'info', icon: Icon }) => {
  const variants = {
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
    info: 'badge-info',
    pending: 'status-pending',
    completed: 'status-completed',
    inprogress: 'status-inprogress',
    overdue: 'status-overdue',
  };

  return (
    <span className={`badge ${variants[variant]}`}>
      {Icon && <Icon size={14} className="mr-1" />}
      {children}
    </span>
  );
};

export default Badge;