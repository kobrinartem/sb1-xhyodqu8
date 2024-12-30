import React from 'react';
import { NavLink } from 'react-router-dom';
import { FileText, Cpu, Building2, FileBarChart } from 'lucide-react';
import { CompanySelector } from '../company/CompanySelector';

export const Navigation: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4">
          <div className="flex items-center mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-gray-900">
              Medical Literature Analysis
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <CompanySelector />
            
            <nav className="flex space-x-4">
              <NavLink
                to="/articles"
                className={({ isActive }) => `
                  flex items-center gap-2 px-4 py-2 rounded-lg
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                <FileText className="w-5 h-5" />
                Articles
              </NavLink>
              
              <NavLink
                to="/devices"
                className={({ isActive }) => `
                  flex items-center gap-2 px-4 py-2 rounded-lg
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                <Cpu className="w-5 h-5" />
                Devices
              </NavLink>

              <NavLink
                to="/reports"
                className={({ isActive }) => `
                  flex items-center gap-2 px-4 py-2 rounded-lg
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                <FileBarChart className="w-5 h-5" />
                Reports
              </NavLink>

              <NavLink
                to="/companies"
                className={({ isActive }) => `
                  flex items-center gap-2 px-4 py-2 rounded-lg
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                <Building2 className="w-5 h-5" />
                Companies
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};