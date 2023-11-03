import React from 'react';

const EmptyState = () => {
  return (
    <div className='w-full h-full flex items-center justify-center text-lg space-x-2'>
      <h2>All tasks are finished!</h2>
      <span
        role='img'
        aria-label='sheep'>
        🎉🥳
      </span>
    </div>
  );
};

export default EmptyState;
