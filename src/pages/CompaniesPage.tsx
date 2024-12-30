import React, { useState } from 'react';
import { Building2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCompanies } from '../hooks/useCompanies';
import { useCompany } from '../contexts/CompanyContext';
import { CompanyCreateModal } from '../components/company/CompanyCreateModal';

export const CompaniesPage: React.FC = () => {
  const navigate = useNavigate();
  const { companies, loading, error, refreshCompanies } = useCompanies();
  const { setSelectedCompany } = useCompany();
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const handleCompanyClick = (companyId: string) => {
    const company = companies.find(c => c.id === companyId);
    if (company) {
      setSelectedCompany(company);
      navigate(`/companies/${companyId}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Companies</h2>
          <p className="mt-1 text-sm text-gray-600">
            Manage companies and their devices
          </p>
        </div>
        <button
          onClick={() => setCreateModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Company
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div
            key={company.id}
            onClick={() => handleCompanyClick(company.id)}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
            </div>
            <p className="text-sm text-gray-500">
              Created on {new Date(company.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {isCreateModalOpen && (
        <CompanyCreateModal
          onClose={() => setCreateModalOpen(false)}
          onCompanyCreated={() => {
            setCreateModalOpen(false);
            refreshCompanies();
          }}
        />
      )}
    </div>
  );
};