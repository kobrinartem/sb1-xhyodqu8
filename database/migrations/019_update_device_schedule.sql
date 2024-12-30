-- Drop old schedule columns
ALTER TABLE devices 
DROP COLUMN IF EXISTS schedule_type,
DROP COLUMN IF EXISTS schedule_report_type,
DROP COLUMN IF EXISTS schedule_next_run,
DROP COLUMN IF EXISTS schedule_is_active;

-- Add new schedule columns
ALTER TABLE devices
ADD COLUMN schedule_time_frame TEXT CHECK (schedule_time_frame IN ('daily', 'weekly', 'monthly')),
ADD COLUMN schedule_report_types TEXT[] NOT NULL DEFAULT '{}',
ADD COLUMN schedule_is_active BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN schedule_next_run TIMESTAMP WITH TIME ZONE;

-- Add constraint to ensure valid schedule configuration
ALTER TABLE devices ADD CONSTRAINT valid_schedule_config
  CHECK (
    (schedule_time_frame IS NULL AND schedule_report_types = '{}' AND schedule_next_run IS NULL AND NOT schedule_is_active) OR
    (schedule_time_frame IS NOT NULL AND array_length(schedule_report_types, 1) > 0)
  );

-- Create index for active schedules
CREATE INDEX idx_devices_schedule ON devices (
  schedule_time_frame,
  schedule_next_run,
  schedule_is_active
) WHERE schedule_is_active = true;