import React from 'react';

const Card = ({ children, hoverable = false, className = '' }) => {
  return (
    <div className={`card ${hoverable ? 'card-hover' : ''} ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-b border-dark-200 dark:border-dark-700 ${className}`}>
    {children}
  </div>
);

export const CardBody = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-t border-dark-200 dark:border-dark-700 ${className}`}>
    {children}
  </div>
);

export default Card;