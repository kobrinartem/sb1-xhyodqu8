import { Article } from '../types';

export const articles: Article[] = [
  {
    id: '1',
    source: 'Biomedical Reference Collection: Corporate Edition',
    publicationName: 'Pacing and Clinical Electrophysiology',
    title: 'Evaluation of cardiac implantable electronic device lead parameters before and after radiotherapy',
    type: 'FT',
    findings: 'No device malfunction or clinically relevant changes in lead parameters were identified in this study, suggesting that radiotherapy of pacemaker/implantable cardioverter defibrillator patients can be regarded as safe when following relevant safety precautions.',
    relevance: false
  },
  {
    id: '2',
    source: 'Medline Complete',
    publicationName: 'European Heart Journal - Case Reports',
    title: 'Device-device interference triggered by an abandoned pacemaker: a case report',
    type: 'FT',
    findings: 'Deactivated abandoned cardiac pacemaker, which self-activated after reaching end-of-life mode and triggered an interaction with active pacemaker.',
    relevance: true
  },
  {
    id: '3',
    source: 'PubMed',
    publicationName: 'The New England Journal of Medicine (NEJM)',
    title: 'Long-Term Outcomes of Resynchronization-Defibrillation for Heart Failure',
    type: 'FT',
    findings: 'Among patients with a reduced ejection fraction, a widened QRS complex, and NYHA class II or III heart failure, the survival benefit associated with receipt of a CRT-D as compared with ICD appeared to be sustained during a median of nearly 14 years of follow-up.',
    relevance: false
  },
  // Add more articles here...
];