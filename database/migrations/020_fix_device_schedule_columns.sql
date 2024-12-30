-- First drop the old constraint and index
ALTER TABLE devices DROP CONSTRAINT IF EXISTS valid_schedule_config;
DROP INDEX IF EXISTS idx_devices_schedule;

-- Rename columns to be more consistent
ALTER TABLE devices
  RENAME COLUMN schedule_time_frame TO schedule_frequency;

-- Add check constraint for schedule frequency
ALTER TABLE devices 
  ADD CONSTRAINT check_schedule_frequency 
  CHECK (schedule_frequency IN ('daily', 'weekly', 'monthly'));

-- Add check constraint for report types array
ALTER TABLE devices 
  ADD CONSTRAINT check_report_types 
  CHECK (schedule_report_types <@ ARRAY['pmcf', 'vigilance']::text[]);

-- Add constraint to ensure valid schedule configuration
ALTER TABLE devices 
  ADD CONSTRAINT valid_schedule_config
  CHECK (
    (schedule_frequency IS NULL AND schedule_report_types = '{}' AND schedule_next_run IS NULL AND NOT schedule_is_active) OR
    (schedule_frequency IS NOT NULL AND array_length(schedule_report_types, 1) > 0)
  );

-- Create index for active schedules
CREATE INDEX idx_devices_active_schedules ON devices (
  schedule_frequency,
  schedule_next_run
) WHERE schedule_is_active = true;