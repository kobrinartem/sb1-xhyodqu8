import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCompanyDetail } from '../hooks/useCompanyDetail';
import { useCompany } from '../contexts/CompanyContext';
import { useCostSettings } from '../hooks/useCostSettings';
import { CompanyInfo } from '../components/company/CompanyInfo';
import { CompanyStats } from '../components/company/CompanyStats';
import { CompanyCostSection } from '../components/company/cost/CompanyCostSection';
import { CompanyBillingSection } from '../components/company/billing/CompanyBillingSection';
import { CostSettingsForm } from '../components/company/cost/CostSettingsForm';

export const CompanyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedCompany, setSelectedCompany } = useCompany();
  const { company, loading: companyLoading, error: companyError } = useCompanyDetail(id!);
  const { settings, loading: settingsLoading, error: settingsError, refreshSettings } = useCostSettings(id!);
  const [activeTab, setActiveTab] = React.useState<'overview' | 'billing' | 'settings'>('overview');

  // Sync company selection with URL
  useEffect(() => {
    if (company && (!selectedCompany || selectedCompany.id !== company.id)) {
      setSelectedCompany(company);
    }
  }, [company, selectedCompany, setSelectedCompany]);

  // Watch for company changes in selector
  useEffect(() => {
    if (selectedCompany && id !== selectedCompany.id) {
      navigate(`/companies/${selectedCompany.id}`);
    }
  }, [selectedCompany, id, navigate]);

  if (companyLoading || settingsLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-40 bg-gray-200 rounded-lg"></div>
        <div className="h-60 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  if (companyError || settingsError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {companyError || settingsError}
      </div>
    );
  }

  if (!company) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Company not found</h3>
        <button
          onClick={() => navigate('/companies')}
          className="mt-4 text-blue-600 hover:text-blue-700"
        >
          Back to Companies
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CompanyInfo company={company} />
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'billing'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Billing
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Cost Settings
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'overview' ? (
            <div className="space-y-6">
              <CompanyStats companyId={company.id} />
              <CompanyCostSection companyId={company.id} />
            </div>
          ) : activeTab === 'billing' ? (
            <CompanyBillingSection companyId={company.id} />
          ) : (
            <CostSettingsForm
              companyId={company.id}
              initialSettings={settings}
              onSettingsUpdated={refreshSettings}
            />
          )}
        </div>
      </div>
    </div>
  );
};