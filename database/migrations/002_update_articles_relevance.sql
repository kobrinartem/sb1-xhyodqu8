-- Step 1: Create backup of existing data
CREATE TABLE articles_backup AS SELECT * FROM articles;

-- Step 2: Drop existing indexes
DROP INDEX IF EXISTS idx_articles_report_type;

-- Step 3: Add new columns
ALTER TABLE articles 
ADD COLUMN relevant_to_pmcf BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN relevant_to_vigilance BOOLEAN NOT NULL DEFAULT false;

-- Step 4: Migrate existing data
UPDATE articles 
SET 
  relevant_to_pmcf = CASE 
    WHEN report_type = 'pmcf' AND relevance = true THEN true
    ELSE false
  END,
  relevant_to_vigilance = CASE 
    WHEN report_type = 'vigilance' AND relevance = true THEN true
    ELSE false
  END;

-- Step 5: Drop old columns
ALTER TABLE articles 
DROP COLUMN report_type,
DROP COLUMN relevance;

-- Step 6: Create new indexes
CREATE INDEX idx_articles_pmcf_relevance ON articles(relevant_to_pmcf);
CREATE INDEX idx_articles_vigilance_relevance ON articles(relevant_to_vigilance);

-- Step 7: Update sample data
UPDATE articles SET
  relevant_to_pmcf = true,
  relevant_to_vigilance = false
WHERE title LIKE '%HeartMate 3%' AND findings LIKE '%mechanical pump complication%';

UPDATE articles SET
  relevant_to_pmcf = false,
  relevant_to_vigilance = true
WHERE title LIKE '%Driveline Infection%';

UPDATE articles SET
  relevant_to_pmcf = true,
  relevant_to_vigilance = true
WHERE title LIKE '%Platelet reactivity%' AND findings LIKE '%pump thrombosis%';