-- Step 1: Create backup of existing data
CREATE TABLE articles_backup AS SELECT * FROM articles;

-- Step 2: Drop existing indexes
DROP INDEX IF EXISTS idx_articles_pmcf_relevance;
DROP INDEX IF EXISTS idx_articles_vigilance_relevance;

-- Step 3: Add new relevance column with enum type
DO $$ BEGIN
    CREATE TYPE article_relevance AS ENUM ('vigilance', 'pmcf', 'not_relevant');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

ALTER TABLE articles 
ADD COLUMN relevant_to article_relevance NOT NULL DEFAULT 'not_relevant'::article_relevance;

-- Step 4: Migrate existing data
UPDATE articles 
SET relevant_to = (
  CASE 
    WHEN relevant_to_pmcf = true AND relevant_to_vigilance = true THEN 'pmcf'::article_relevance
    WHEN relevant_to_pmcf = true THEN 'pmcf'::article_relevance
    WHEN relevant_to_vigilance = true THEN 'vigilance'::article_relevance
    ELSE 'not_relevant'::article_relevance
  END
);

-- Step 5: Drop old columns
ALTER TABLE articles 
DROP COLUMN relevant_to_pmcf,
DROP COLUMN relevant_to_vigilance;

-- Step 6: Create new index
CREATE INDEX idx_articles_relevance ON articles(relevant_to);

-- Step 7: Update sample data
UPDATE articles SET
  relevant_to = 'pmcf'::article_relevance
WHERE title LIKE '%HeartMate 3%' AND findings LIKE '%mechanical pump complication%';

UPDATE articles SET
  relevant_to = 'vigilance'::article_relevance
WHERE title LIKE '%Driveline Infection%';

UPDATE articles SET
  relevant_to = 'pmcf'::article_relevance
WHERE title LIKE '%Platelet reactivity%' AND findings LIKE '%pump thrombosis%';