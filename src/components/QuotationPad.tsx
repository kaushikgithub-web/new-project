import React from 'react';
import { Printer } from 'lucide-react';
import { format } from 'date-fns';
import { Quotation } from '../types/quotation';

interface Props {
  quotation: Quotation;
}

export function QuotationPad({ quotation }: Props) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Print Controls - Hidden when printing */}
      <div className="print:hidden mb-4 flex justify-end space-x-4">
        <button
          onClick={handlePrint}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Printer className="w-4 h-4 mr-2" /> Print Quotation
        </button>
      </div>

      {/* First Page */}
      <div className="bg-white p-8 rounded-lg shadow-md print:shadow-none print:p-4 max-w-4xl mx-auto">
        {/* Header */}
        <div className="border-b-2 border-gray-200 pb-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">QUOTATION</h1>
              <p className="text-gray-600 mt-1">Reference: {quotation.referenceNumber}</p>
              <p className="text-gray-600">Date: {format(new Date(quotation.date), 'MMMM d, yyyy')}</p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-semibold text-blue-600">OLUMPUS GLASSES LTD</h2>
              <p className="text-gray-600">9/41 Suryodaya Colony, 9 Rana Pratap Marg,</p>
              <p className="text-gray-600">Lucknow-226001</p>
              <p className="text-gray-600">Phone: +91 8933933333</p>
              <p className="text-gray-600">Email: olumpusglasses@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Company Logo */}
        <div className="flex justify-center items-center mb-8">
          <img 
            src="https://i.ibb.co/VqWkHmL/company-logos.png" 
            alt="Company Logos"
            className="h-16 object-contain"
          />
        </div>

        {/* Client Information */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-800 mb-2">To:</h3>
          <p className="text-gray-800 font-medium">{quotation.customerName}</p>
          <p className="text-gray-600">{quotation.email}</p>
          <p className="text-gray-600">GSTN: {quotation.gstn}</p>
          <p className="text-gray-600 whitespace-pre-line">{quotation.address}</p>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {quotation.items.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 text-gray-800">{item.description}</td>
                  <td className="px-4 py-3 text-right text-gray-800">{item.quantity}</td>
                  <td className="px-4 py-3 text-right text-gray-800">${item.unitPrice.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right text-gray-800">${item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-300">
                <td colSpan={3} className="px-4 py-3 text-right font-semibold">Total Amount:</td>
                <td className="px-4 py-3 text-right font-semibold">${quotation.total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Notes */}
        {quotation.notes && (
          <div className="mb-8">
            <h3 className="font-semibold text-gray-800 mb-2">Notes:</h3>
            <p className="text-gray-600 whitespace-pre-line">{quotation.notes}</p>
          </div>
        )}
      </div>

      {/* Second Page - Terms and Conditions */}
      <div className="bg-white p-8 rounded-lg shadow-md print:shadow-none print:p-4 max-w-4xl mx-auto mt-8 print:break-before-page">
        {/* Company Info */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-blue-600">OLUMPUS GLASSES LTD</h2>
          <p className="text-gray-600">9/41 Suryodaya Colony, 9 Rana Pratap Marg, Lucknow-226001</p>
          <p className="text-gray-600">Phone: +91 8933933333 | Email: olumpusglasses@gmail.com</p>
        </div>

        {/* Company Logo */}
        <div className="flex justify-center items-center mb-8">
          <img 
            src="https://i.ibb.co/VqWkHmL/company-logos.png" 
            alt="Company Logos"
            className="h-16 object-contain"
          />
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">General Terms & Conditions</h2>
          
          <div className="space-y-4 text-gray-700">
            <p>All the Invoice Until paid in full, the goods shall remain as our property.</p>
            
            <p>Customer shall inspect the glasses prior to dispatch, any complaints from the template-based orders shall not be entertained after the goods have left our factory.</p>
            
            <p>Goods in transit when insured by us but in case of any loss during transportation immediately hold unloading and inform to us for arrange the survey. If you do not inform to us immediately then no Claim are entertained by us.</p>
            
            <p>Delayed payments Interest @ 5% per month, will be charged. If payment not made within said due date, then interest will be compounded on monthly basis.</p>
            
            <p>All complaints to be given in writing within 48 hrs. of material received or else the complaints will not be entertained.</p>
            
            <p>In case of quality complaints, liability of Olumpus will be only be limited to the glass product supplied as per BIS standards IS2553 PART 1:2018. For more details / clarification please visit www.bis.gov.in</p>
            
            <p>Spontaneous breakage due to Nickle Sulphide will not be on our responsibility. Storage & handling Glasses must be handled carefully to avoid scratches & weathering effects, and it must be stored in a dry covered & Safe place.</p>
            
            <p>Any dispute shall be settled through mutual negotiations or It shall be subjected to Lucknow (U.P) Jurisdiction.</p>
          </div>

          <div className="mt-8">
            <h3 className="font-bold text-gray-900 mb-3">Storage requirements at site:</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Glass needs to be stored in a dry, ventilated enclosed place</li>
              <li>Glass should not be kept in open</li>
              <li>All the glass panels need to be stored with proper interleaving</li>
              <li>Cushion needs to be provided at the back and the bottom of the racks</li>
              <li>Alkaline products may be emitted from concrete, plaster, mortar etc., such materials, or materials containing fluorine and acids will lead to staining or matting of the surface. To prevent such occurrence, all such substances must be removed from the glass immediately.</li>
              <li>Grease, oil and materials used for facilitating the installation must be removed.</li>
              <li>Washing tools used for cleaning the glass must be free of abrasive particles.</li>
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="font-bold text-gray-900 mb-3">DO AND DON'TS WITH CLEANING AND HANDLING OF ARCHITECTURE GLASS</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">TO DO List:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>DO clean glass when dirt and residue appear</li>
                  <li>DO determine if coated glass surfaces are exposed</li>
                  <li>DO exercise special care when cleaning coated glass surfaces</li>
                  <li>DO avoid cleaning tinted and coated glass surfaces in direct sunlight</li>
                  <li>DO start cleaning at the top of the building and continue to lower levels</li>
                  <li>DO soak the glass surface with a clean water and soap solution to loosen dirt and debris</li>
                  <li>DO use a mild, non-abrasive commercial window cleaning solution</li>
                  <li>DO use a squeegee to remove all of the cleaning solution</li>
                  <li>DO dry all cleaning solution from window gaskets, sealants and frames</li>
                  <li>DO clean one small window and check to see if procedures have caused any damage</li>
                  <li>DO be aware of and follow the glass supplier's specific cleaning recommendations</li>
                  <li>DO caution other trades against allowing other materials to contact the glass</li>
                  <li>DO watch for and prevent conditions that can damage the glass</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">NOT TO DO List:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>DO NOT start cleaning without reading the entire AIS instruction on glass cleaning</li>
                  <li>DO NOT use scrapers of any size or type for cleaning glass</li>
                  <li>DO NOT allow dirt and residue to remain on glass for an extended period of time</li>
                  <li>DO NOT begin cleaning glass without knowing if a coated surface is exposed</li>
                  <li>DO NOT clean tinted or coated glass in direct sunlight</li>
                  <li>DO NOT allow water or cleaning residue to remain on the glass or adjacent materials</li>
                  <li>DO NOT begin cleaning without rinsing excessive dirt and debris</li>
                  <li>DO NOT use abrasive cleaning solutions or materials</li>
                  <li>DO NOT allow metal parts of cleaning equipment to contact the glass</li>
                  <li>DO NOT trap abrasive particles between the cleaning materials and the glass surface</li>
                  <li>DO NOT allow other trades to lean tools or materials against the glass surface</li>
                  <li>DO NOT allow splashed materials directly on the Glass surface</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            margin: 1cm;
            size: A4;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .print\\:break-before-page {
            page-break-before: always;
          }
        }
      `}</style>
    </>
  );
}