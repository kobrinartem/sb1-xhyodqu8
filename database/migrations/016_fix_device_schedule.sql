-- Drop existing constraints and triggers
ALTER TABLE devices DROP CONSTRAINT IF EXISTS valid_schedule_config;
ALTER TABLE devices DROP CONSTRAINT IF EXISTS valid_active_schedule;
DROP TRIGGER IF EXISTS update_schedule_next_run_trigger ON devices;
DROP FUNCTION IF EXISTS update_schedule_next_run();

-- Add NOT NULL constraints where appropriate
ALTER TABLE devices 
  ALTER COLUMN schedule_is_active SET DEFAULT false,
  ALTER COLUMN schedule_is_active SET NOT NULL;

-- Add check constraints
ALTER TABLE devices ADD CONSTRAINT valid_schedule_config
  CHECK (
    (schedule_type IS NULL AND schedule_report_type IS NULL AND schedule_next_run IS NULL) OR
    (schedule_type IS NOT NULL AND schedule_report_type IS NOT NULL)
  );

ALTER TABLE devices ADD CONSTRAINT valid_schedule_status
  CHECK (
    NOT schedule_is_active OR 
    (schedule_type IS NOT NULL AND schedule_report_type IS NOT NULL)
  );

-- Create index for active schedules
DROP INDEX IF EXISTS idx_devices_active_schedules;
CREATE INDEX idx_devices_active_schedules ON devices (
  company_id,
  schedule_type,
  schedule_next_run
) WHERE schedule_is_active = true;

-- Update existing records to ensure consistency
UPDATE devices SET
  schedule_type = NULL,
  schedule_report_type = NULL,
  schedule_next_run = NULL,
  schedule_is_active = false
WHERE schedule_type IS NULL OR schedule_type = 'none';