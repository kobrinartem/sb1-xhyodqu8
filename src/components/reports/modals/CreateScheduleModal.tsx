import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { createReportSchedule } from '../../../services/reportService';
import type { CreateScheduleData } from '../../../types/report';
import { DeviceSelect } from '../forms/DeviceSelect';
import { ReportTypeSelect } from '../forms/ReportTypeSelect';
import { FrequencySelect } from '../forms/FrequencySelect';

interface CreateScheduleModalProps {
  companyId: string;
  onClose: () => void;
  onScheduleCreated: () => void;
}

export const CreateScheduleModal: React.FC<CreateScheduleModalProps> = ({
  companyId,
  onClose,
  onScheduleCreated
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useClickOutside(modalRef, onClose);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      const scheduleData: CreateScheduleData = {
        device_id: formData.get('device_id') as string,
        report_type: formData.get('report_type') as any,
        frequency: formData.get('frequency') as any
      };

      await createReportSchedule(companyId, scheduleData);
      onScheduleCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create schedule');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div ref={modalRef} className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Create Report Schedule</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <DeviceSelect />
          <ReportTypeSelect />
          <FrequencySelect />

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
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : 'Create Schedule'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};