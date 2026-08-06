import React, { useState } from 'react';
import { Layers, X } from 'lucide-react';
import { PriceNotice } from './PriceNotice';
import { COUNTRIES } from '../data/countries';

interface VisaComparisonModalProps {
  onClose: () => void;
  onOpenBookingModal: (serviceType?: string) => void;
}

export const VisaComparisonModal: React.FC<VisaComparisonModalProps> = ({
  onClose,
  onOpenBookingModal,
}) => {
  const [country1Id, setCountry1Id] = useState('canada');
  const [country2Id, setCountry2Id] = useState('australia');

  const c1 = COUNTRIES.find((c) => c.id === country1Id) || COUNTRIES[0];
  const c2 = COUNTRIES.find((c) => c.id === country2Id) || COUNTRIES[1];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white text-gray-900 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-red-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-[#DC2626] text-xs font-bold uppercase tracking-wider mb-1">
          <Layers className="w-4 h-4" />
          <span>ভিসা তুলনা ম্যাট্রিক্স</span>
        </div>

        <h3 className="text-xl font-bold font-sans text-gray-900 mb-6">
          দুই দেশের ভিসা সুযোগ-সুবিধা ও খরচের তুলনা
        </h3>

        {/* Selection Selectors */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-3 rounded-2xl border border-gray-200">
            <label className="block text-[10px] text-[#DC2626] uppercase font-bold mb-1">১ম দেশ নির্বাচন করুন</label>
            <select
              value={country1Id}
              onChange={(e) => setCountry1Id(e.target.value)}
              className="w-full bg-transparent font-bold text-sm text-gray-900 focus:outline-none cursor-pointer"
            >
              {COUNTRIES.map((c) => (
                <option key={c.id} value={c.id} className="bg-white text-gray-900">
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-gray-50 p-3 rounded-2xl border border-gray-200">
            <label className="block text-[10px] text-[#DC2626] uppercase font-bold mb-1">২য় দেশ নির্বাচন করুন</label>
            <select
              value={country2Id}
              onChange={(e) => setCountry2Id(e.target.value)}
              className="w-full bg-transparent font-bold text-sm text-gray-900 focus:outline-none cursor-pointer"
            >
              {COUNTRIES.map((c) => (
                <option key={c.id} value={c.id} className="bg-white text-gray-900">
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="p-3 font-bold text-gray-600">বিষয় / সার্ভিস</th>
                <th className="p-3 font-bold text-[#DC2626]">
                  {c1.flag} {c1.name}
                </th>
                <th className="p-3 font-bold text-[#DC2626]">
                  {c2.flag} {c2.name}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-800">
              <tr>
                <td className="p-3 font-semibold text-gray-600">অঞ্চল</td>
                <td className="p-3">{c1.region}</td>
                <td className="p-3">{c2.region}</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-gray-600">প্রসেসিং সময়</td>
                <td className="p-3 text-gray-900 font-bold">{c1.processingTime}</td>
                <td className="p-3 text-gray-900 font-bold">{c2.processingTime}</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-gray-600">সফলতার হার</td>
                <td className="p-3 text-emerald-700 font-bold">{c1.successRate}%</td>
                <td className="p-3 text-emerald-700 font-bold">{c2.successRate}%</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-gray-600">শুরু খরচ (টাকা)</td>
                <td className="p-3 font-mono font-bold text-[#DC2626]">৳{c1.startingCostBDT.toLocaleString()}</td>
                <td className="p-3 font-mono font-bold text-[#DC2626]">৳{c2.startingCostBDT.toLocaleString()}</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-gray-600">ভিসা মেয়াদ</td>
                <td className="p-3">{Object.values(c1.visaRequirements)[0]?.validity || '১০ বছর পর্যন্ত'}</td>
                <td className="p-3">{Object.values(c2.visaRequirements)[0]?.validity || '১০ বছর পর্যন্ত'}</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-gray-600">আর্থিক প্রমাণপত্র</td>
                <td className="p-3 text-gray-700">{Object.values(c1.visaRequirements)[0]?.financialProof || '৬ মাসের ব্যাংক স্টেটমেন্ট'}</td>
                <td className="p-3 text-gray-700">{Object.values(c2.visaRequirements)[0]?.financialProof || '৬ মাসের ব্যাংক স্টেটমেন্ট'}</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-gray-600">এম্বাসি অবস্থান</td>
                <td className="p-3">{c1.embassyInfo?.address || 'ঢাকা অফিস'}</td>
                <td className="p-3">{c2.embassyInfo?.address || 'ঢাকা অফিস'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <PriceNotice variant="compact" className="mt-4" />

        <div className="flex gap-4 mt-4">
          <button
            onClick={() => {
              onClose();
              onOpenBookingModal(`${c1.name} ভিসা সংক্রান্ত তথ্য`);
            }}
            className="flex-1 py-3 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-bold rounded-xl text-xs cursor-pointer text-center transition-colors"
          >
            {c1.name} ভিসায় আবেদন করুন →
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenBookingModal(`${c2.name} ভিসা সংক্রান্ত তথ্য`);
            }}
            className="flex-1 py-3 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-bold rounded-xl text-xs cursor-pointer text-center transition-colors"
          >
            {c2.name} ভিসায় আবেদন করুন →
          </button>
        </div>
      </div>
    </div>
  );
};
