import React from 'react';
import { X } from 'lucide-react';
import { useClickOutside } from '../../../hooks/useClickOutside';

interface BaseModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const BaseModal: React.FC<BaseModalProps> = ({ title, onClose, children }) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div ref={modalRef} className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};