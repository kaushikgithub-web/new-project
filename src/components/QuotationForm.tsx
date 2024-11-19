import React, { useState } from 'react';
import { PlusCircle, MinusCircle, Save } from 'lucide-react';
import { Quotation, QuotationItem } from '../types/quotation';

interface Props {
  nextReference: string;
  onSubmit: (quotation: Quotation) => void;
}

export function QuotationForm({ nextReference, onSubmit }: Props) {
  const [items, setItems] = useState<QuotationItem[]>([{
    description: '',
    quantity: 1,
    unitPrice: 0,
    total: 0
  }]);
  
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [gstn, setGstn] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const addItem = () => {
    setItems([...items, {
      description: '',
      quantity: 1,
      unitPrice: 0,
      total: 0
    }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof QuotationItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
      total: field === 'quantity' || field === 'unitPrice' 
        ? Number(value) * (field === 'quantity' ? items[index].unitPrice : items[index].quantity)
        : items[index].total
    };
    setItems(newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = items.reduce((sum, item) => sum + item.total, 0);
    
    onSubmit({
      id: crypto.randomUUID(),
      referenceNumber: nextReference,
      customerName,
      email,
      gstn,
      address,
      date: new Date().toISOString(),
      items,
      total,
      status: 'pending',
      notes
    });

    // Reset form
    setItems([{ description: '', quantity: 1, unitPrice: 0, total: 0 }]);
    setCustomerName('');
    setEmail('');
    setGstn('');
    setAddress('');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">New Quotation</h2>
        <span className="text-sm text-gray-500">Reference: {nextReference}</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Customer Name</label>
          <input
            type="text"
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">GSTN Number</label>
          <input
            type="text"
            required
            value={gstn}
            onChange={(e) => setGstn(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Items</h3>
          <button
            type="button"
            onClick={addItem}
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <PlusCircle className="w-4 h-4 mr-1" /> Add Item
          </button>
        </div>

        {items.map((item, index) => (
          <div key={index} className="flex gap-4 items-start">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Description"
                required
                value={item.description}
                onChange={(e) => updateItem(index, 'description', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="w-24">
              <input
                type="number"
                min="1"
                required
                value={item.quantity}
                onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="w-32">
              <input
                type="number"
                min="0"
                step="0.01"
                required
                value={item.unitPrice}
                onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="w-32">
              <input
                type="number"
                readOnly
                value={item.total}
                className="w-full rounded-md bg-gray-50 border-gray-300"
              />
            </div>
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-red-600 hover:text-red-700"
              >
                <MinusCircle className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Save className="w-4 h-4 mr-2" /> Save Quotation
        </button>
      </div>
    </form>
  );
}