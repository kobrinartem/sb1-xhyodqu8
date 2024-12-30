-- Add new columns to devices table
ALTER TABLE devices 
ADD COLUMN device_type TEXT,
ADD COLUMN device_category TEXT CHECK (device_category IN ('III', 'IIb', 'IIa', 'I', 'NotBod'));

-- Create index for device category
CREATE INDEX idx_devices_category ON devices(device_category);

-- Update existing records with default category
UPDATE devices SET device_category = 'NotBod' WHERE device_category IS NULL;

-- Make device_category NOT NULL after setting defaults
ALTER TABLE devices ALTER COLUMN device_category SET NOT NULL;