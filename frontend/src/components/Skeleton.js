import React from 'react';

const Skeleton = ({ width = 'w-full', height = 'h-4', className = '' }) => (
  <div className={`${width} ${height} bg-dark-200 dark:bg-dark-700 rounded animate-pulse ${className}`} />
);

export const SkeletonCard = () => (
  <div className="card p-6 space-y-4">
    <Skeleton height="h-6" width="w-2/3" />
    <Skeleton height="h-4" width="w-full" />
    <Skeleton height="h-4" width="w-5/6" />
    <div className="pt-4 space-y-2">
      <Skeleton height="h-3" width="w-full" />
      <Skeleton height="h-3" width="w-4/5" />
    </div>
  </div>
);

export default Skeleton;