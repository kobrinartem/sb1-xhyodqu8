import React, { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Company } from '../types/company';

interface CompanyContextType {
  selectedCompany: Company | null;
  setSelectedCompany: (company: Company | null) => void;
  clearSelectedCompany: () => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCompany, setSelectedCompanyState] = useState<Company | null>(() => {
    const stored = localStorage.getItem('selectedCompany');
    return stored ? JSON.parse(stored) : null;
  });

  const handleSetSelectedCompany = useCallback((company: Company | null) => {
    setSelectedCompanyState(company);
    if (company) {
      localStorage.setItem('selectedCompany', JSON.stringify(company));
    } else {
      localStorage.removeItem('selectedCompany');
    }
  }, []);

  const clearSelectedCompany = useCallback(() => {
    handleSetSelectedCompany(null);
    // Only navigate to companies list if we're on a company-specific page
    if (location.pathname.startsWith('/companies/')) {
      navigate('/companies');
    }
  }, [navigate, handleSetSelectedCompany, location]);

  return (
    <CompanyContext.Provider value={{ 
      selectedCompany, 
      setSelectedCompany: handleSetSelectedCompany,
      clearSelectedCompany
    }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
}