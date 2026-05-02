import React from 'react';
import { FiLoader } from 'react-icons/fi';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false,
  disabled = false,
  icon: Icon,
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary-900 text-dark-50 hover:bg-primary-800 border border-dark-700',
    secondary: 'bg-dark-800 text-dark-50 hover:bg-dark-700 border border-dark-700',
    ghost: 'text-dark-400 hover:bg-dark-800 hover:text-dark-50',
    danger: 'bg-accent-red text-dark-50 hover:bg-red-600 border border-red-600',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <FiLoader className="animate-spin" size={18} /> : Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

export default Button;