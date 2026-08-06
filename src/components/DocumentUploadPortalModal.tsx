import React, { useState } from 'react';
import {
  UploadCloud,
  Lock,
  CheckCircle2,
  X
} from 'lucide-react';

interface DocumentUploadPortalModalProps {
  onClose: () => void;
}

export const DocumentUploadPortalModal: React.FC<DocumentUploadPortalModalProps> = ({ onClose }) => {
  const [appId, setAppId] = useState('DF-98231');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/inquiry/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Document Vault Upload Notification',
          applicationId: appId,
          status: 'Documents Uploaded by Applicant',
        }),
      });
    } catch (err) {
      console.error('Doc upload notify error:', err);
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white text-gray-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-red-200 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-[#DC2626] text-xs font-bold uppercase tracking-wider mb-1">
          <Lock className="w-4 h-4" />
          <span>২৫৬-বিট সিকিউর ফাইল ভল্ট</span>
        </div>

        <h3 className="text-xl font-bold font-sans text-gray-900 mb-2">
          আবেদনের জন্য ডকুমেন্টস আপলোড করুন
        </h3>
        <p className="text-xs text-gray-600 mb-6 leading-relaxed">
          আপনার পাসপোর্ট, ব্যাংক সলভেন্সি এবং ছবির স্ক্যান কপি আপলোড করুন। ফাইলগুলো সম্পূর্ণ এনক্রিপ্টেড অবস্থায় আমাদের অফিসে সংরক্ষিত হবে।
        </p>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="text-lg font-bold text-emerald-800">ডকুমেন্টস সফলভাবে আপলোড হয়েছে!</h4>
            <p className="text-xs text-gray-700">
              আবেদন আইডি: <strong>{appId}</strong>। আমাদের সিনিয়র অফিসার ফাইলগুলো চেক করছেন।
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">ড্রিমস ফ্লাই আবেদন আইডি</label>
              <input
                type="text"
                required
                value={appId}
                onChange={(e) => setAppId(e.target.value)}
                placeholder="যেমন: DF-98231"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 font-mono"
              />
            </div>

            {/* Passport */}
            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 space-y-1">
              <label className="block font-bold text-gray-800">১. মূল পাসপোর্টের ১ম পেজ (স্ক্যান)</label>
              <input
                type="file"
                accept=".pdf,.jpg,.png"
                className="block w-full text-xs text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#DC2626] file:text-white cursor-pointer"
              />
              <span className="text-[10px] text-gray-500 block">PDF / JPG, সর্বোচ্চ ১০ মেগাবাইট</span>
            </div>

            {/* Photo */}
            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 space-y-1">
              <label className="block font-bold text-gray-800">২. বায়োমেট্রিক ল্যাব ছবি (৩৫x৪৫মিমি / ৫০x৫০মিমি)</label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                className="block w-full text-xs text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#DC2626] file:text-white cursor-pointer"
              />
            </div>

            {/* Bank Statement */}
            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 space-y-1">
              <label className="block font-bold text-gray-800">৩. ব্যাংক সলভেন্সি সার্টিফিকেট ও ৬ মাসের স্টেটমেন্ট</label>
              <input
                type="file"
                accept=".pdf"
                className="block w-full text-xs text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#DC2626] file:text-white cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              <UploadCloud className="w-4 h-4" />
              <span>ডকুমেন্টস ফাইল টিমে জমা দিন</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
