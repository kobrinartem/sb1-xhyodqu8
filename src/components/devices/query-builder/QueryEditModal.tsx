import React from 'react';
import { X } from 'lucide-react';
import { DeviceQuery } from '../../../types/device';
import { updateDeviceQuery } from '../../../services/deviceService';
import { useClickOutside } from '../../../hooks/useClickOutside';

interface QueryEditModalProps {
  query: DeviceQuery;
  onClose: () => void;
  onQueryUpdated: () => void;
}

export const QueryEditModal: React.FC<QueryEditModalProps> = ({ query, onClose, onQueryUpdated }) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  useClickOutside(modalRef, onClose);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      await updateDeviceQuery(query.id, formData.get('query_text') as string);
      onQueryUpdated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update query');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div ref={modalRef} className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Edit Query</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="query_text" className="block text-sm font-medium text-gray-700">
              Query Text
            </label>
            <textarea
              id="query_text"
              name="query_text"
              defaultValue={query.query_text}
              rows={3}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {error && (
            <div className="text-sm text-red-600">
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
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};