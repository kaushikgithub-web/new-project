export interface Quotation {
  id: string;
  referenceNumber: string;
  customerName: string;
  email: string;
  gstn: string;
  address: string;
  date: string;
  items: QuotationItem[];
  total: number;
  status: 'pending' | 'accepted' | 'rejected';
  notes?: string;
}

export interface QuotationItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}