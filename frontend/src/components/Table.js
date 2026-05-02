import React from 'react';

export const Table = ({ children, className = '' }) => (
  <div className="card overflow-hidden">
    <table className={`w-full ${className}`}>
      {children}
    </table>
  </div>
);

export const TableHead = ({ children }) => (
  <thead className="bg-dark-50 dark:bg-dark-900 border-b border-dark-200 dark:border-dark-700">
    {children}
  </thead>
);

export const TableBody = ({ children }) => (
  <tbody className="divide-y divide-dark-200 dark:divide-dark-700">
    {children}
  </tbody>
);

export const TableRow = ({ children, hoverable = true }) => (
  <tr className={hoverable ? 'hover:bg-dark-50 dark:hover:bg-dark-800/50 transition' : ''}>
    {children}
  </tr>
);

export const TableCell = ({ children, header = false }) => {
  const baseClass = header ? 'table-header' : 'table-cell';
  return <td className={baseClass}>{children}</td>;
};

export const TableHeader = ({ children }) => (
  <th className="table-header text-left">{children}</th>
);

