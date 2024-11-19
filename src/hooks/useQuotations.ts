import { useState, useEffect } from 'react';
import { Quotation } from '../types/quotation';

export function useQuotations() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('quotations');
    if (stored) {
      setQuotations(JSON.parse(stored));
    }
  }, []);

  const addQuotation = (quotation: Quotation) => {
    const newQuotations = [...quotations, quotation];
    setQuotations(newQuotations);
    localStorage.setItem('quotations', JSON.stringify(newQuotations));
  };

  const getNextReferenceNumber = () => {
    if (quotations.length === 0) return 'QT-0001';
    
    const lastQuotation = [...quotations].sort((a, b) => 
      b.referenceNumber.localeCompare(a.referenceNumber)
    )[0];
    
    const currentNumber = parseInt(lastQuotation.referenceNumber.split('-')[1]);
    return `QT-${String(currentNumber + 1).padStart(4, '0')}`;
  };

  const searchQuotations = (query: string) => {
    return quotations.filter(q => 
      q.referenceNumber.toLowerCase().includes(query.toLowerCase()) ||
      q.customerName.toLowerCase().includes(query.toLowerCase()) ||
      q.email.toLowerCase().includes(query.toLowerCase())
    );
  };

  return {
    quotations,
    addQuotation,
    getNextReferenceNumber,
    searchQuotations
  };
}