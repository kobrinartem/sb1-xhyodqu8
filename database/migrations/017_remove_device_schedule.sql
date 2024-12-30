-- First drop the dependent view
DROP VIEW IF EXISTS active_device_schedules;

-- Then drop constraints and indexes
ALTER TABLE devices DROP CONSTRAINT IF EXISTS valid_schedule_config;
ALTER TABLE devices DROP CONSTRAINT IF EXISTS valid_schedule_status;
DROP INDEX IF EXISTS idx_devices_active_schedules;

-- Finally drop the schedule columns
ALTER TABLE devices 
  DROP COLUMN IF EXISTS schedule_type,
  DROP COLUMN IF EXISTS schedule_report_type,
  DROP COLUMN IF EXISTS schedule_next_run,
  DROP COLUMN IF EXISTS schedule_is_active;