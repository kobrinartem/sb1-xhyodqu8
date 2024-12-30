-- First drop all existing schedule-related constraints and columns
ALTER TABLE devices 
  DROP CONSTRAINT IF EXISTS check_schedule_frequency,
  DROP CONSTRAINT IF EXISTS check_report_types,
  DROP CONSTRAINT IF EXISTS valid_schedule_config;

DROP INDEX IF EXISTS idx_devices_active_schedules;

-- Drop existing schedule columns if they exist
ALTER TABLE devices 
  DROP COLUMN IF EXISTS schedule_frequency,
  DROP COLUMN IF EXISTS schedule_time_frame,
  DROP COLUMN IF EXISTS schedule_report_types,
  DROP COLUMN IF EXISTS schedule_is_active,
  DROP COLUMN IF EXISTS schedule_next_run;

-- Add new schedule columns with proper constraints
ALTER TABLE devices 
  ADD COLUMN schedule_frequency TEXT,
  ADD COLUMN schedule_report_types TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN schedule_is_active BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN schedule_next_run TIMESTAMP WITH TIME ZONE;

-- Add constraints
ALTER TABLE devices 
  ADD CONSTRAINT check_schedule_frequency 
  CHECK (schedule_frequency IN ('daily', 'weekly', 'monthly'));

ALTER TABLE devices 
  ADD CONSTRAINT check_report_types 
  CHECK (schedule_report_types <@ ARRAY['pmcf', 'vigilance']::text[]);

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