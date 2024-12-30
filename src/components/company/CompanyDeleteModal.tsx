import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { Company } from '../../types/company';
import { supabase } from '../../lib/supabase';
import { useClickOutside } from '../../hooks/useClickOutside';

interface CompanyDeleteModalProps {
  company: Company;
  onClose: () => void;
  onCompanyDeleted: () => void;
}

export const CompanyDeleteModal: React.FC<CompanyDeleteModalProps> = ({ 
  company, 
  onClose, 
  onCompanyDeleted 
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useClickOutside(modalRef, onClose);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError(null);
      
      const { error: deleteError } = await supabase
        .from('companies')
        .delete()
        .eq('id', company.id);

      if (deleteError) throw deleteError;
      onCompanyDeleted();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete company');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div ref={modalRef} className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Delete Company</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex items-start gap-3 p-3 bg-amber-50 text-amber-700 rounded-lg">
            <AlertTriangle className="w-5 h-5 mt-0.5" />
            <div>
              <p className="font-medium">Are you sure you want to delete this company?</p>
              <p className="mt-1 text-sm">This action cannot be undone. All associated devices and articles will be deleted.</p>
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              {isDeleting ? 'Deleting...' : 'Delete Company'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};