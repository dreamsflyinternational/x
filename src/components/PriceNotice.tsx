import React from 'react';
import { AlertCircle, PhoneCall } from 'lucide-react';

interface PriceNoticeProps {
  variant?: 'banner' | 'inline' | 'compact';
  className?: string;
}

export const PriceNotice: React.FC<PriceNoticeProps> = ({
  variant = 'banner',
  className = '',
}) => {
  if (variant === 'compact') {
    return (
      <div className={`mt-1.5 flex items-start space-x-1.5 text-[11px] text-amber-800 bg-amber-50/90 border border-amber-200/80 px-2.5 py-1.5 rounded-lg leading-snug ${className}`}>
        <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
        <span>
          <strong>বিশেষ দ্রষ্টব্য:</strong> ডলার রেট ও সরকারি চার্জ সাপেক্ষে প্রদর্শিত মূল্য পরিবর্তনশীল ও অস্থায়ী। সঠিক আপডেটেড মূল্য জানতে{' '}
          <a href="tel:+8801771304219" className="font-bold text-[#DC2626] underline hover:text-red-800">
            +৮৮০ ১৭৭১-৩০৪২১৯
          </a>{' '}
          এ কল করুন।
        </span>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <p className={`text-[11px] text-amber-900 bg-amber-50 border border-amber-200 p-2 rounded-lg font-medium leading-relaxed ${className}`}>
        <span className="font-bold text-amber-700">⚠️ মূল্য সংক্রান্ত বিশেষ নোটিশ:</span> এখানে প্রদর্শিত রেট পরিবর্তনশীল ও অস্থায়ী। বর্তমান সঠিক ও আপডেটেড প্যাকেজ মূল্যের জন্য সরাসরি আমাদের কনসালটেন্টের সাথে যোগাযোগ করুন: <a href="tel:+8801771304219" className="font-bold text-[#DC2626] underline">+৮৮০ ১৭৭১-৩০৪২১৯</a>।
      </p>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-300 rounded-xl p-3.5 sm:p-4 text-amber-950 shadow-sm ${className}`}>
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-amber-200/80 text-amber-900 rounded-lg flex-shrink-0 mt-0.5">
          <AlertCircle className="w-5 h-5 text-[#B71C1C]" />
        </div>
        <div className="flex-1 space-y-1">
          <h4 className="font-bold text-xs sm:text-sm text-amber-900 flex items-center space-x-1">
            <span>বিশেষ মূল্য বিজ্ঞপ্তি (Price Disclaimer Notice)</span>
          </h4>
          <p className="text-xs text-amber-800 leading-relaxed font-medium">
            ওয়েবসাইটে প্রদর্শিত সমস্ত প্যাকেজ, এয়ার টিকিট ও ভিসা প্রসেসিং ফি পরিবর্তনশীল ও অস্থায়ী। আন্তর্জাতিক ডলার রেট, এয়ারলাইন্স ট্যাক্স, এম্বাসি ফি এবং সরকারি চার্জের তারতম্যের কারণে মূল্যের পরিবর্তন হতে পারে। সাম্প্রতিক সঠিক ও আপডেট মূল্য জানতে আমাদের অফিসে বা কল সেন্টারে যোগাযোগের অনুরোধ করা হলো।
          </p>
          <div className="pt-1 flex items-center space-x-3 text-xs">
            <a
              href="tel:+8801771304219"
              className="inline-flex items-center space-x-1.5 font-bold text-[#DC2626] hover:text-red-800 hover:underline"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>হটলাইন: +৮৮০ ১৭৭১-৩০৪২১৯</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
