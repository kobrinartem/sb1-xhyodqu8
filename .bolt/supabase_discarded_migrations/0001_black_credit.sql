/*
  # Add query type to device queries

  1. Changes
    - Add query_type column for device queries
    - Set default values for existing queries
    - Add constraints and index for query type

  2. Security
    - Add check constraint to validate query types
*/

-- Add query type column if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'device_queries' 
    AND column_name = 'query_type'
  ) THEN
    ALTER TABLE device_queries
    ADD COLUMN query_type TEXT;
  END IF;
END $$;

-- Update any null query types to 'vigilance'
UPDATE device_queries
SET query_type = 'vigilance'
WHERE query_type IS NULL;

-- Add NOT NULL constraint
ALTER TABLE device_queries
ALTER COLUMN query_type SET NOT NULL;

-- Add check constraint
ALTER TABLE device_queries
ADD CONSTRAINT check_query_type CHECK (query_type IN ('vigilance', 'pmcf'));

-- Create index for query type
CREATE INDEX IF NOT EXISTS idx_device_queries_type ON device_queries(query_type);