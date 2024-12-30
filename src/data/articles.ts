import { Article } from '../types/article';

export const articles: Article[] = [
  {
    id: '1',
    source: 'PubMed Central',
    publicationName: 'Journal of Cardiovascular Development and Disease',
    title: 'Safety of Magnetic Resonance Imaging in Patients with Cardiac Implantable Electronic Devices',
    analysisPart: 'FT',
    findings: 'Based on the analysis of 1010 MRIs undergone by patients with CIEDs, MRI can be performed safely and without adverse events or changes in device function.',
    relevance: false,
    reportType: 'vigilance',
    receivedDate: '2024-03-15'
  },
  {
    id: '2',
    source: 'Medline Complete',
    publicationName: 'Journal of Thrombosis and Thrombolysis',
    title: 'Mechanical pump complication after HeartMate 3 implantation',
    analysisPart: 'FT',
    findings: 'HeartMate 3 – the mechanical pump complication rate of 7.8% may be related to duration of follow up, as the median time to mechanical complication was 828 days.',
    relevance: true,
    reportType: 'pmcf',
    receivedDate: '2024-03-18'
  },
  {
    id: '3',
    source: 'Medline Complete',
    publicationName: 'Canadian Journal of Cardiology',
    title: 'First Evidence of a HeartMate 3 Driveline Infection by Rhizopus Arrhizus: A Case Report',
    analysisPart: 'A&I',
    findings: 'Infection by Rhizopus Arrhizus',
    relevance: true,
    reportType: 'vigilance',
    receivedDate: '2024-03-19'
  }
  // Add more articles here...
];