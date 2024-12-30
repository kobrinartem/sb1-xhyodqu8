import React from 'react';
import { Plus } from 'lucide-react';

interface DeviceCreateButtonProps {
  onClick: () => void;
}

export const DeviceCreateButton: React.FC<DeviceCreateButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      <Plus className="w-4 h-4" />
      Add Device
    </button>
  );
};