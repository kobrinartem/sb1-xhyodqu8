import React from 'react';
import { FileText, FileSearch } from 'lucide-react';

interface AnalysisExampleProps {
  type: 'FT' | 'A&I';
}

export const AnalysisExample: React.FC<AnalysisExampleProps> = ({ type }) => {
  const examples = {
    FT: {
      title: "Full Text Analysis Example",
      icon: FileText,
      color: "blue",
      description: "Analysis based on complete article content, including methodology, results, and discussion sections.",
      example: {
        methodology: "Comprehensive review of study design, patient selection, and statistical analysis",
        results: "Detailed examination of primary and secondary outcomes",
        discussion: "In-depth analysis of implications and limitations"
      }
    },
    'A&I': {
      title: "Abstract Analysis Example",
      icon: FileSearch,
      color: "purple",
      description: "Analysis based on article abstract, focusing on key findings and conclusions.",
      example: {
        methodology: "Brief overview of study design",
        results: "Key findings and statistics",
        discussion: "Main conclusions"
      }
    }
  };

  const { title, icon: Icon, color, description, example } = examples[type];

  return (
    <div className={`bg-${color}-50 rounded-lg p-6 border border-${color}-100`}>
      <div className="flex items-center gap-3 mb-4">
        <Icon className={`w-6 h-6 text-${color}-500`} />
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="space-y-3">
        <div>
          <h4 className="font-medium text-gray-700">Methodology</h4>
          <p className="text-gray-600">{example.methodology}</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-700">Results</h4>
          <p className="text-gray-600">{example.results}</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-700">Discussion</h4>
          <p className="text-gray-600">{example.discussion}</p>
        </div>
      </div>
    </div>
  );
};