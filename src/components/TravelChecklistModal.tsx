import React, { useState } from 'react';
import { CheckSquare, Printer, X } from 'lucide-react';

interface TravelChecklistModalProps {
  onClose: () => void;
}

export const TravelChecklistModal: React.FC<TravelChecklistModalProps> = ({ onClose }) => {
  const [checklist, setChecklist] = useState([
    { id: 1, title: 'বৈধ পাসপোর্ট (ভ্রমণের তারিখ থেকে অন্তত ৬ মাসের মেয়াদ থাকতে হবে)', done: true },
    { id: 2, title: 'এম্বাসি ভিসার স্ট্যাম্প / বৈধ ই-ভিসার প্রিন্ট কপি', done: true },
    { id: 3, title: 'রিটার্ন এয়ার টিকিটের কনফার্মড বুকিং', done: true },
    { id: 4, title: 'হোটেল ভাউচার বুকিং / ইনভিটেশন লেটার', done: false },
    { id: 5, title: 'শেনজেন / মেডিকেল ট্রাভেল ইন্স্যুরেন্স পলিসি (€৩০,০০০+ কভারেজ)', done: false },
    { id: 6, title: 'মূল ব্যাংক সলভেন্সি সার্টিফিকেট ও ক্রেডিট/ডেবিট কার্ড', done: false },
    { id: 7, title: 'বায়োমেট্রিক পাসপোর্ট সাইজ ছবি (৩৫x৪৫মিমি / সাদা ব্যাকগ্রাউন্ড)', done: false },
    { id: 8, title: 'চাকরির এনওসি (NOC) / স্টুডেন্ট আইডি / ট্রেড লাইসেন্স', done: false },
    { id: 9, title: 'কাস্টমস ক্যাশ ডিক্লারেশন ফর্ম (সর্বোচ্চ ১০,০০০ ডলার এনডোর্সমেন্ট)', done: false }
  ]);

  const toggleCheck = (id: number) => {
    setChecklist(
      checklist.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white text-gray-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-red-200 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-[#DC2626] text-xs font-bold uppercase tracking-wider mb-1">
          <CheckSquare className="w-4 h-4" />
          <span>ইন্টারেক্টিভ প্রস্তুতি চেকলিস্ট</span>
        </div>

        <h3 className="text-xl font-bold font-sans text-gray-900 mb-1">
          ভ্রমণ ও ভিসা ডকুমেন্টস চেকলিস্ট
        </h3>
        <p className="text-xs text-gray-600 mb-4">
          এম্বাসি বায়োমেট্রিক সেন্টার বা বিমানবন্দরে যাওয়ার আগে প্রয়োজনীয় ডকুমেন্টস টিক চিহ্নিত করুন।
        </p>

        <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-2 mb-6">
          {checklist.map((item) => (
            <label
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`flex items-start space-x-3 p-3 rounded-xl border transition-all cursor-pointer ${
                item.done
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-gray-50 border-gray-200 text-gray-800 hover:border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => {}}
                className="mt-0.5 w-4 h-4 text-[#DC2626] rounded"
              />
              <span className="text-xs font-medium leading-relaxed">{item.title}</span>
            </label>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl text-xs flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#DC2626]" />
            <span>প্রিন্ট চেকলিস্ট</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-extrabold rounded-xl text-xs flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>সম্পন্ন ও বন্ধ করুন</span>
          </button>
        </div>
      </div>
    </div>
  );
};
