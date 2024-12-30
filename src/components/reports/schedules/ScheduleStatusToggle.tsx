import React from 'react';

interface ScheduleStatusToggleProps {
  isActive: boolean;
  onChange: (isActive: boolean) => void;
}

export const ScheduleStatusToggle: React.FC<ScheduleStatusToggleProps> = ({
  isActive,
  onChange
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isActive}
      onClick={() => onChange(!isActive)}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full 
        transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${isActive ? 'bg-blue-600' : 'bg-gray-200'}
      `}
    >
      <span className="sr-only">Enable schedule</span>
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white transition-transform
          ${isActive ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  );
};