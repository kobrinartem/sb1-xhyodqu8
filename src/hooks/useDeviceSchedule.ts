import { useState, useCallback } from 'react';
import type { DeviceSchedule } from '../types/device';
import { updateDeviceSchedule } from '../services/database/schedule';

interface UseDeviceScheduleProps {
  initialSchedule?: DeviceSchedule;
  onScheduleUpdated: () => void;
}

export function useDeviceSchedule({ initialSchedule, onScheduleUpdated }: UseDeviceScheduleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [schedule, setSchedule] = useState<DeviceSchedule>(() => ({
    type: initialSchedule?.type || 'none',
    reportType: initialSchedule?.reportType || 'vigilance',
    nextRun: initialSchedule?.nextRun,
    isActive: initialSchedule?.isActive || false
  }));

  const handleSave = useCallback(async (deviceId: string) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await updateDeviceSchedule(deviceId, schedule);
      onScheduleUpdated();
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update schedule');
    } finally {
      setIsSubmitting(false);
    }
  }, [schedule, onScheduleUpdated]);

  const handleCancel = useCallback(() => {
    setSchedule({
      type: initialSchedule?.type || 'none',
      reportType: initialSchedule?.reportType || 'vigilance',
      nextRun: initialSchedule?.nextRun,
      isActive: initialSchedule?.isActive || false
    });
    setError(null);
    setIsEditing(false);
  }, [initialSchedule]);

  return {
    schedule,
    setSchedule,
    isEditing,
    setIsEditing,
    isSubmitting,
    error,
    handleSave,
    handleCancel
  };
}