-- Drop existing constraints and indexes
ALTER TABLE devices DROP CONSTRAINT IF EXISTS check_schedule_frequency;
ALTER TABLE devices DROP CONSTRAINT IF EXISTS check_report_types;
ALTER TABLE devices DROP CONSTRAINT IF EXISTS valid_schedule_config;
DROP INDEX IF EXISTS idx_devices_active_schedules;

-- Rename and fix columns
ALTER TABLE devices 
  DROP COLUMN IF EXISTS schedule_time_frame,
  ADD COLUMN schedule_frequency TEXT CHECK (schedule_frequency IN ('daily', 'weekly', 'monthly')),
  ADD COLUMN schedule_report_types TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN schedule_is_active BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN schedule_next_run TIMESTAMP WITH TIME ZONE;

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