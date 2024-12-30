import React from 'react';
import { Calendar, Clock, Tag, BookOpen } from 'lucide-react';
import { DeviceSchedule } from '../../../types/device';
import { getScheduleDescription } from '../../../utils/schedule';

interface ScheduleStatusProps {
  schedule: DeviceSchedule;
}

export const ScheduleStatus: React.FC<ScheduleStatusProps> = ({ schedule }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className={`w-2 h-2 rounded-full ${schedule.is_active ? 'bg-green-500' : 'bg-gray-400'}`} />
        <span className="text-sm font-medium text-gray-700">
          Schedule is {schedule.is_active ? 'active' : 'inactive'}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{getScheduleDescription(schedule.time_frame)}</span>
        </div>

        {schedule.next_run && schedule.is_active && (
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Next run: {new Date(schedule.next_run).toLocaleString()}</span>
          </div>
        )}

        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Report Types:</h4>
          <div className="flex flex-wrap gap-2">
            {schedule.report_types.map((type) => (
              <span
                key={type}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {type === 'pmcf' ? 'PMCF' : 'Vigilance'}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Literature Sources:</h4>
          <div className="flex flex-wrap gap-2">
            {schedule.literature_sources?.map((source) => (
              <span
                key={source}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
              >
                <BookOpen className="w-3 h-3" />
                {source === 'pubmed' ? 'PubMed' : 'Google Scholar'}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};