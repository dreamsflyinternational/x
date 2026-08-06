import React, { useState } from 'react';
import {
  UploadCloud,
  Download,
  Lock,
  LogOut,
  Plus
} from 'lucide-react';
import { ApplicationStatusData } from '../types';

interface CustomerDashboardProps {
  onOpenUploadPortal: () => void;
  onOpenBookingModal: (serviceType?: string) => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  onOpenUploadPortal,
  onOpenBookingModal,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeTab, setActiveTab] = useState<'applications' | 'documents' | 'profile' | 'rewards'>('applications');

  const [userProfile] = useState({
    name: 'তানভীর আহমেদ',
    phone: '+৮৮০ ১৭৭১-৩০৪২১৯',
    email: 'tanvir.ahmed@example.com',
    passportNumber: 'A08923412',
    passportExpiry: '২০৩১-১০-১৫',
    loyaltyPoints: 1250,
    referralCode: 'DF-TANVIR2026',
  });

  const myApplications: ApplicationStatusData[] = [
    {
      id: 'DF-98231',
      applicantName: 'তানভীর আহমেদ',
      country: 'কানাডা',
      visaType: 'মাল্টিপল এন্ট্রি ট্যুরিস্ট ভিসা (V-1)',
      submissionDate: '২০২৬-০৭-১০',
      status: 'এম্বাসি প্রসেসিং চলছে',
      progressPercent: 75,
      estimatedCompletion: '২০২৬-০৮-০৫',
      assignedConsultant: 'জনাব জাহাঙ্গীর আলম (সিনিয়র ভিসা অফিসার)',
      passportNumber: 'A08923412',
      embassyReference: 'CAN-DHK-88129',
      timeline: []
    },
    {
      id: 'DF-10492',
      applicantName: 'তানভীর আহমেদ',
      country: 'সৌদি আরব',
      visaType: '৫-স্টার ভিআইপি ওমরাহ ভিসা',
      submissionDate: '২০২৬-০৫-১২',
      status: 'অনুমোদিত ও পাসপোর্ট ইস্যু সম্পন্ন',
      progressPercent: 100,
      estimatedCompletion: '২০২৬-০৫-১৫',
      assignedConsultant: 'হাজী ড. গোলাম কিবরিয়া',
      passportNumber: 'A08923412',
      embassyReference: 'KSA-UMR-00214',
      timeline: []
    }
  ];

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-3xl border border-gray-200 text-gray-900 shadow-xl">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-red-50 text-[#DC2626] border border-red-200 flex items-center justify-center mx-auto mb-2">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold font-sans">গ্রাহক পোর্টাল লগইন</h2>
          <p className="text-xs text-gray-600 mt-1">আপনার ভিসা ফাইল, ইনভয়েস ও ডকুমেন্টস এক্সেস করুন</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold mb-1 text-gray-700">মোবাইল / ইমেইল</label>
            <input
              type="text"
              defaultValue="+8801771304219"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 font-mono"
            />
          </div>
          <div>
            <label className="block font-bold mb-1 text-gray-700">পাসওয়ার্ড / OTP</label>
            <input
              type="password"
              defaultValue="123456"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-black rounded-xl text-xs uppercase"
          >
            ড্যাশবোর্ডে প্রবেশ করুন
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-900 space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-md">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-[#DC2626] p-0.5 shadow">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center font-black text-xl text-[#DC2626]">
              TA
            </div>
          </div>
          <div>
            <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider">
              ভিআইপি মেম্বার ড্যাশবোর্ড
            </span>
            <h2 className="text-2xl font-black font-sans text-gray-900">{userProfile.name}</h2>
            <p className="text-xs text-gray-600">
              পাসপোর্ট: <span className="font-mono text-gray-900 font-bold">{userProfile.passportNumber}</span> | মোবাইল: {userProfile.phone}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-red-50 border border-red-200 px-4 py-2 rounded-2xl text-right">
            <span className="block text-[10px] text-[#DC2626] font-bold uppercase">ড্রিমস ফ্লাই রিওয়ার্ডস</span>
            <span className="text-lg font-black text-[#DC2626]">{userProfile.loyaltyPoints} পয়েন্ট</span>
          </div>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            title="লগআউট"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3">
        <button
          onClick={() => setActiveTab('applications')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'applications'
              ? 'bg-[#DC2626] text-white shadow'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          আমার ভিসা ফাইলসমূহ ({myApplications.length})
        </button>
        <button
          onClick={() => setActiveTab('documents')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'documents'
              ? 'bg-[#DC2626] text-white shadow'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          আপলোডকৃত ডকুমেন্ট ভল্ট
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-[#DC2626] text-white shadow'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          প্রোফাইল সেটিংস
        </button>
        <button
          onClick={() => setActiveTab('rewards')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'rewards'
              ? 'bg-[#DC2626] text-white shadow'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          রেফারেল ও ক্যাশব্যাক প্রোগ্রাম
        </button>
      </div>

      {/* Applications View */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold font-sans text-gray-900">চলতি ও পূর্বের আবেদনসমূহ</h3>
            <button
              onClick={() => onOpenBookingModal()}
              className="px-4 py-2 bg-[#DC2626] text-white font-extrabold rounded-xl text-xs flex items-center space-x-1.5 cursor-pointer shadow hover:bg-[#B71C1C]"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন ভিসায় আবেদন করুন</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {myApplications.map((app) => (
              <div
                key={app.id}
                className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4 hover:border-[#DC2626] transition-all shadow-sm"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-gray-100 pb-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#DC2626]">
                      আইডি: {app.id} | রেফারেন্স: {app.embassyReference}
                    </span>
                    <h4 className="text-xl font-bold text-gray-900">
                      {app.country} - {app.visaType}
                    </h4>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      app.progressPercent === 100
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-red-50 text-[#DC2626] border-red-200'
                    }`}
                  >
                    {app.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-gray-700">
                  <div>
                    <span className="block text-gray-500">জমার তারিখ</span>
                    <span className="block font-bold text-gray-900">{app.submissionDate}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500">আনুমানিক সম্পন্ন</span>
                    <span className="block font-bold text-gray-900">{app.estimatedCompletion}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500">দায়িত্বপ্রাপ্ত কর্মকর্তা</span>
                    <span className="block font-bold text-[#DC2626] truncate">{app.assignedConsultant}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500">পাসপোর্ট নম্বর</span>
                    <span className="block font-mono font-bold text-gray-900">{app.passportNumber}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100">
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-gray-500">ইনভয়েস স্ট্যাটাস:</span>
                    <span className="font-mono text-emerald-700 font-bold">পরিশোধিত (৳২৮,০০০)</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={onOpenUploadPortal}
                      className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-bold flex items-center space-x-1 cursor-pointer"
                    >
                      <UploadCloud className="w-3.5 h-3.5 text-[#DC2626]" />
                      <span>ডকুমেন্টস জমা দিন</span>
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-3.5 py-1.5 bg-[#DC2626] text-white rounded-lg text-xs font-bold flex items-center space-x-1 cursor-pointer hover:bg-[#B71C1C]"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>ইনভয়েস পিডিএফ ডাউনলোড</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Documents Vault Tab */}
      {activeTab === 'documents' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold font-sans text-gray-900">আপনার নিরাপদ ডকুমেন্ট ভল্ট</h3>
              <p className="text-xs text-gray-600">ভিসা প্রক্রিয়াকরণের জন্য সংরক্ষিত ফাইলসমূহ</p>
            </div>
            <button
              onClick={onOpenUploadPortal}
              className="px-4 py-2 bg-[#DC2626] text-white font-bold rounded-xl text-xs flex items-center space-x-1 cursor-pointer hover:bg-[#B71C1C]"
            >
              <UploadCloud className="w-4 h-4" />
              <span>নতুন ডকুমেন্ট আপলোড</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 text-[#DC2626] flex items-center justify-center font-black">PDF</div>
                <div>
                  <span className="block font-bold text-gray-900">Passport_Scan_Tanvir.pdf</span>
                  <span className="block text-[10px] text-gray-500">আপলোড: ২০২৬-০৭-১০ • যাচাইকৃত ✓</span>
                </div>
              </div>
              <span className="text-xs text-emerald-700 font-bold">সুরক্ষিত</span>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 text-[#DC2626] flex items-center justify-center font-black">PDF</div>
                <div>
                  <span className="block font-bold text-gray-900">Bank_Solvency_Certificate.pdf</span>
                  <span className="block text-[10px] text-gray-500">আপলোড: ২০২৬-০৭-১২ • যাচাইকৃত ✓</span>
                </div>
              </div>
              <span className="text-xs text-emerald-700 font-bold">সুরক্ষিত</span>
            </div>
          </div>
        </div>
      )}

      {/* Profile Settings Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4 max-w-2xl shadow-sm">
          <h3 className="text-lg font-bold font-sans text-gray-900">ব্যক্তিগত তথ্য</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-gray-700 mb-1 font-semibold">পূর্ণ নাম (পাসপোর্ট অনুযায়ী)</label>
              <input type="text" defaultValue={userProfile.name} className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900" />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-semibold">মোবাইল নম্বর</label>
              <input type="text" defaultValue={userProfile.phone} className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900" />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-semibold">পাসপোর্ট নম্বর</label>
              <input type="text" defaultValue={userProfile.passportNumber} className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 font-mono" />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-semibold">পাসপোর্ট মেয়াদের তারিখ</label>
              <input type="text" defaultValue={userProfile.passportExpiry} className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900" />
            </div>
          </div>
          <button className="px-6 py-2.5 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-extrabold rounded-xl text-xs">
            তথ্য সংরক্ষণ করুন
          </button>
        </div>
      )}

      {/* Rewards Tab */}
      {activeTab === 'rewards' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4 shadow-sm">
          <div className="bg-red-50 border border-red-200 p-6 rounded-2xl space-y-2">
            <span className="text-xs font-bold uppercase text-[#DC2626] tracking-wider">ফ্লাইট ডিসকাউন্ট জিতুন</span>
            <h3 className="text-2xl font-bold font-sans text-gray-900">বন্ধুদের রেফার করুন এবং প্রতি ভিসায় ১,০০০ টাকা ছাড় পান</h3>
            <p className="text-xs text-gray-600">
              আপনার ব্যক্তিগত রেফারেল লিংক বন্ধুদের সাথে শেয়ার করুন। তারা কানাডা, যুক্তরাজ্য বা শেনজেন ভিসার ফাইল জমা দিলে আপনারা দুজনেই ৫০০ পয়েন্ট বোনাস পাবেন!
            </p>
            <div className="pt-2 flex items-center space-x-2">
              <input
                type="text"
                readOnly
                value={`https://dreamsfly.net/ref/${userProfile.referralCode}`}
                className="px-3.5 py-2 bg-white border border-gray-300 rounded-xl text-xs font-mono text-[#DC2626] flex-1 max-w-md"
              />
              <button
                onClick={() => alert('রেফারেল লিংক কপি করা হয়েছে!')}
                className="px-4 py-2 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-bold rounded-xl text-xs cursor-pointer"
              >
                লিংক কপি করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
