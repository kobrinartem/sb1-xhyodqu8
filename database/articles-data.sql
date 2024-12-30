-- Reset tables
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS queries CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source TEXT NOT NULL,
  publication_name TEXT NOT NULL,
  title TEXT NOT NULL,
  analysis_part TEXT NOT NULL CHECK (analysis_part IN ('FT', 'A&I')),
  findings TEXT NOT NULL,
  relevant_to_pmcf BOOLEAN NOT NULL DEFAULT false,
  relevant_to_vigilance BOOLEAN NOT NULL DEFAULT false,
  received_date TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  issn TEXT,
  e_issn TEXT,
  pmid TEXT,
  pmcid TEXT,
  doi TEXT,
  authors TEXT[] NOT NULL DEFAULT '{}',
  abstract TEXT,
  equipment_type TEXT
);

CREATE TABLE queries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  query_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_run TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  result_count INTEGER NOT NULL DEFAULT 0
);

-- Create indexes
CREATE INDEX idx_articles_title_findings ON articles USING gin(to_tsvector('english', title || ' ' || findings));
CREATE INDEX idx_articles_received_date ON articles(received_date);
CREATE INDEX idx_articles_pmcf_relevance ON articles(relevant_to_pmcf);
CREATE INDEX idx_articles_vigilance_relevance ON articles(relevant_to_vigilance);

-- Insert sample articles with new relevance fields
INSERT INTO articles (
  source, publication_name, title, analysis_part, findings,
  relevant_to_pmcf, relevant_to_vigilance, received_date, 
  authors, doi, pmid, pmcid, issn, e_issn
) VALUES
(
  'PubMed Central',
  'Journal of Cardiovascular Development and Disease',
  'Safety of Magnetic Resonance Imaging in Patients with Cardiac Implantable Electronic Devices',
  'FT',
  'Based on the analysis of 1010 MRIs undergone by patients with CIEDs, MRI can be performed safely and without adverse events or changes in device function.',
  false,
  true,
  '2024-03-15T00:00:00Z',
  ARRAY['Hugo Lanz', 'Katharina Strauß', 'Julia Höpler'],
  '10.3390',
  '39452284',
  'PMC11509009',
  '2308-3425',
  NULL
),
(
  'Medline Complete',
  'Journal of Thrombosis and Thrombolysis',
  'Mechanical pump complication after HeartMate 3 implantation',
  'FT',
  'HeartMate 3 – the mechanical pump complication rate of 7.8% may be related to duration of follow up, as the median time to mechanical complication was 828 days.',
  true,
  false,
  '2024-03-18T00:00:00Z',
  ARRAY['Aurelie Merlo', 'Panagiotis Tasoudis', 'Guilherme C de Oliveira'],
  '10.1007',
  '37794306',
  NULL,
  '0929-5305',
  '1573-742X'
),
(
  'Medline Complete',
  'Canadian Journal of Cardiology',
  'First Evidence of a HeartMate 3 Driveline Infection by Rhizopus Arrhizus: A Case Report',
  'A&I',
  'Infection by Rhizopus Arrhizus',
  false,
  true,
  '2024-03-19T00:00:00Z',
  ARRAY['Joaquín Vila-García', 'Irene Marco Clement'],
  '10.1016',
  '39427841',
  NULL,
  NULL,
  '1916-7075'
),
(
  'PubMed Central',
  'Research and practice in thrombosis and haemostasis',
  'Platelet reactivity is associated with pump thrombosis in patients with left ventricular assist devices',
  'FT',
  'Three patients (4.8%) had pump thrombosis and 10 patients (16.1%) suffered a bleeding complication.',
  true,
  true,
  '2024-03-20T00:00:00Z',
  ARRAY['David Mutschlechner', 'Maximilian Tscharre', 'Franziska Wittmann'],
  '10.1016',
  '39391561',
  'PMC11466564',
  NULL,
  '2475-0379'
);