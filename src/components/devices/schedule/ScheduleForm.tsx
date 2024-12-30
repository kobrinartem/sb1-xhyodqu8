import React from 'react';
import { DeviceSchedule } from '../../../types/device';
import { ScheduleTimeFrameSelect } from './ScheduleTimeFrameSelect';
import { ReportTypeSelect } from './ReportTypeSelect';
import { LiteratureSourcesSelect } from './LiteratureSourcesSelect';

interface ScheduleFormProps {
  schedule: DeviceSchedule;
  onScheduleChange: (schedule: DeviceSchedule) => void;
  isSubmitting: boolean;
  disabled?: boolean;
}

export const ScheduleForm: React.FC<ScheduleFormProps> = ({
  schedule,
  onScheduleChange,
  isSubmitting,
  disabled = false
}) => {
  const handleTimeFrameChange = (time_frame: ScheduleTimeFrame) => {
    onScheduleChange({
      ...schedule,
      time_frame
    });
  };

  const handleReportTypesChange = (report_types: string[]) => {
    onScheduleChange({
      ...schedule,
      report_types
    });
  };

  const handleLiteratureSourcesChange = (literature_sources: string[]) => {
    onScheduleChange({
      ...schedule,
      literature_sources
    });
  };

  return (
    <div className="space-y-6">
      <ScheduleTimeFrameSelect
        value={schedule.time_frame}
        onChange={handleTimeFrameChange}
        disabled={disabled || isSubmitting}
      />

      <ReportTypeSelect
        selectedTypes={schedule.report_types}
        onChange={handleReportTypesChange}
        disabled={disabled || isSubmitting}
      />

      <LiteratureSourcesSelect
        selectedSources={schedule.literature_sources || []}
        onChange={handleLiteratureSourcesChange}
        disabled={disabled || isSubmitting}
      />
    </div>
  );
}