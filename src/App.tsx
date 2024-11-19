import React, { useState } from 'react';
import { QuotationForm } from './components/QuotationForm';
import { QuotationList } from './components/QuotationList';
import { useQuotations } from './hooks/useQuotations';
import { ClipboardList } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'new' | 'list'>('new');
  const { quotations, addQuotation, getNextReferenceNumber, searchQuotations } = useQuotations();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ClipboardList className="w-8 h-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Quotation Manager</h1>
            </div>
            <nav className="flex space-x-4">
              <button
                onClick={() => setActiveTab('new')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'new'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                New Quotation
              </button>
              <button
                onClick={() => setActiveTab('list')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'list'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                View Quotations
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'new' ? (
          <QuotationForm
            nextReference={getNextReferenceNumber()}
            onSubmit={(quotation) => {
              addQuotation(quotation);
              setActiveTab('list');
            }}
          />
        ) : (
          <QuotationList
            quotations={quotations}
            onSearch={searchQuotations}
          />
        )}
      </main>
    </div>
  );
}

export default App;