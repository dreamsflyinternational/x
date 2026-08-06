import React, { useState, useEffect } from 'react';
import { BLOG_POSTS } from '../data/blogs';
import { BlogPostData } from '../types';
import { ChevronRight, Calendar, User, Tag, Share2, PhoneCall, MessageCircle, ArrowLeft, Search, CheckCircle2, ListTree, BookOpen } from 'lucide-react';
import { navigateToPath } from '../lib/router';
import { PriceNotice } from '../components/PriceNotice';
import { MarkdownContent } from '../components/MarkdownContent';

interface BlogViewProps {
  initialBlogSlug?: string;
  onOpenBookingModal?: (serviceType?: string) => void;
}

const CATEGORIES = [
  'সব গাইড',
  'SEO কর্নারস্টোন গাইড',
  'ইউরোপ ওয়ার্ক পারমিট',
  'মধ্যপ্রাচ্য ও এশিয়া',
  'চাকরি ও বেতন গাইড',
  'ভিসা ও ডকুমেন্টেশন',
  'কমন ভুল ও জালিয়াতি রোধ',
  'উমরাহ ও এয়ার টিকিট',
  'FAQ ও প্রশ্নোত্তর'
];

export const BlogView: React.FC<BlogViewProps> = ({
  initialBlogSlug,
  onOpenBookingModal
}) => {
  const [selectedPost, setSelectedPost] = useState<BlogPostData | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('সব গাইড');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  useEffect(() => {
    if (initialBlogSlug) {
      const found = BLOG_POSTS.find(
        (p) => p.slug === initialBlogSlug || p.id === initialBlogSlug
      );
      if (found) {
        setSelectedPost(found);
      }
    } else {
      setSelectedPost(null);
    }
  }, [initialBlogSlug]);

  const handleSelectPost = (post: BlogPostData) => {
    setSelectedPost(post);
    const slug = post.slug || post.id;
    navigateToPath(`/blog/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedPost(null);
    navigateToPath('/blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      activeCategory === 'সব গাইড' || post.category === activeCategory;
    const matchesQuery =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesQuery;
  });

  const relatedPosts = selectedPost
    ? BLOG_POSTS.filter((p) => p.id !== selectedPost.id && (p.category === selectedPost.category || p.tags.some(t => selectedPost.tags.includes(t)))).slice(0, 3)
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-gray-900 space-y-10 animate-in fade-in">
      {!selectedPost ? (
        <>
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
              অফিসিয়াল ভিসা, ওয়ার্ক পারমিট ও ইমিগ্রেশন গাইডলাইন
            </span>
            <h1 className="text-3xl sm:text-5xl font-black font-sans text-gray-900 tracking-tight">
              ব্লগ ও গাইডলাইন
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              ইউরোপ শেনজেন ওয়ার্ক পারমিট, মধ্যপ্রাচ্য ইমপ্লয়মেন্ট ভিসা, পাসপোর্ট ও ডকুমেন্টস তৈরি এবং লিগ্যাল ইমিগ্রেশনের নির্ভরযোগ্য দিকনির্দেশনা পড়ুন।
            </p>
          </div>

          {/* Search and Filters */}
          <div className="space-y-6 max-w-5xl mx-auto">
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="দেশ, কাজের নাম বা যেকোনো কীওয়ার্ড দিয়ে খুঁজুন..."
                className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl border border-gray-200 shadow-sm focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 text-xs sm:text-sm text-gray-900 outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-gray-600"
                >
                  ক্লিয়ার
                </button>
              )}
            </div>

            {/* Category Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#DC2626] text-white shadow-md scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Result Count */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-3 text-xs font-bold text-gray-500">
            <span>মোট বিষয়বস্তু: {filteredPosts.length} টি আর্টিকেলে পাওয়া গেছে</span>
            {activeCategory !== 'সব গাইড' && (
              <span className="text-[#DC2626]">ফিল্টার: {activeCategory}</span>
            )}
          </div>

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => handleSelectPost(post)}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#DC2626] transition-all cursor-pointer group shadow-md hover:shadow-2xl flex flex-col justify-between"
                >
                  <div>
                    <div className="h-52 overflow-hidden relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-[#DC2626] text-white font-bold text-[10px] px-3 py-1 rounded-full shadow">
                        {post.category}
                      </span>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center space-x-2 text-[10px] text-gray-500 font-medium">
                        <Calendar className="w-3 h-3 text-[#DC2626]" />
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h2 className="text-base sm:text-lg font-bold font-sans text-gray-900 group-hover:text-[#DC2626] transition-colors leading-snug">
                        {post.title}
                      </h2>

                      <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 flex items-center space-x-1.5 text-xs font-bold text-[#DC2626] group-hover:underline">
                    <span>সম্পূর্ণ আর্টিকেল পড়ুন</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-3 max-w-lg mx-auto">
              <p className="text-sm font-bold text-gray-800">কোনো আর্টিকেল পাওয়া যায়নি!</p>
              <p className="text-xs text-gray-500">আপনার সার্চ কীওয়ার্ড অথবা ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।</p>
              <button
                onClick={() => {
                  setActiveCategory('সব গাইড');
                  setSearchQuery('');
                }}
                className="mt-2 px-4 py-2 bg-[#DC2626] text-white text-xs font-bold rounded-xl"
              >
                সকল ব্লগ দেখুন
              </button>
            </div>
          )}
        </>
      ) : (
        /* Blog Detail View */
        <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-3xl border border-gray-200 space-y-8 relative shadow-xl">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToList}
              className="inline-flex items-center space-x-2 text-xs font-bold text-[#DC2626] bg-red-50 px-4 py-2 rounded-xl hover:bg-red-100 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>সকল গাইডে ফিরে যান</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center space-x-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">লিংক কপি হয়েছে!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-gray-600" />
                  <span>শেয়ার করুন</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-white bg-[#DC2626] px-3 py-1 rounded-full uppercase tracking-wider">
                {selectedPost.category}
              </span>
              <span className="text-xs text-gray-500">{selectedPost.readTime} পড়ার সময়</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black font-sans text-gray-900 leading-tight">
              {selectedPost.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-gray-600 border-y border-gray-100 py-3">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-[#DC2626]" />
                <span>লেখক: <strong className="text-gray-900">{selectedPost.author}</strong> ({selectedPost.authorRole})</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-[#DC2626]" />
                <span>প্রকাশের তারিখ: {selectedPost.date}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-80 sm:h-96 object-cover"
            />
          </div>

          {/* Excerpt Lead Box */}
          <div className="bg-amber-50/90 border-l-4 border-amber-500 p-4 sm:p-6 rounded-r-2xl text-xs sm:text-sm font-medium text-amber-950 leading-relaxed shadow-xs flex items-start space-x-3">
            <BookOpen className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-amber-900 font-bold mb-1">গাইড সারসংক্ষেপ:</strong>
              <span>{selectedPost.excerpt}</span>
            </div>
          </div>

          {/* Table of Contents / বিষয়সূচী Card */}
          {selectedPost.content.includes('###') && (
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs">
              <div className="flex items-center space-x-2 text-sm font-bold text-gray-900 border-b border-slate-200 pb-2">
                <ListTree className="w-4 h-4 text-[#DC2626]" />
                <span>বিষয়সূচী (Table of Contents)</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                {selectedPost.content
                  .split('\n')
                  .filter((line) => line.startsWith('###'))
                  .map((heading, idx) => (
                    <li key={idx} className="flex items-center space-x-2 hover:text-[#DC2626] transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] shrink-0" />
                      <span className="line-clamp-1 font-medium">
                        {heading.replace(/###\s*(📌\s*)?/, '').trim()}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {/* Rich Rendered Markdown Content */}
          <div className="py-2">
            <MarkdownContent content={selectedPost.content} />
          </div>

          {/* Tags */}
          {selectedPost.tags && selectedPost.tags.length > 0 && (
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-gray-700">
                <Tag className="w-4 h-4 text-[#DC2626]" />
                <span>ট্যাগসমূহ:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedPost.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-lg border border-gray-200 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <PriceNotice className="mt-6" />

          {/* CTA Box */}
          <div className="bg-gradient-to-r from-gray-900 via-slate-900 to-red-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg font-bold">ভিসা বা ওয়ার্ক পারমিট নিয়ে সরাসরি কথা বলতে চান?</h3>
              <p className="text-xs text-gray-300">আমাদের সিনিয়র ভিসা কনসালট্যান্টদের সাথে ফ্রিতে যোগাযোগ করুন</p>
            </div>
            <div className="flex items-center space-x-3">
              <a
                href="https://wa.me/8801973133230"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center space-x-2 transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>হোয়াটসঅ্যাপ মেসেজ</span>
              </a>
              {onOpenBookingModal && (
                <button
                  onClick={() => onOpenBookingModal(`ব্লগ থেকে ফ্রি কনসালটেশন: ${selectedPost.title}`)}
                  className="px-5 py-3 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-bold text-xs rounded-xl flex items-center space-x-2 transition-colors shadow-md cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>আবেদন শুরু করুন</span>
                </button>
              )}
            </div>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="pt-8 border-t border-gray-200 space-y-6">
              <h3 className="text-xl font-bold text-gray-900">সম্পর্কিত অন্যান্য গুরুত্বপূর্ণ গাইড</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedPosts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => handleSelectPost(rel)}
                    className="bg-gray-50 rounded-2xl p-4 border border-gray-200 hover:border-[#DC2626] cursor-pointer space-y-2 transition-all hover:bg-white hover:shadow-md"
                  >
                    <div className="h-32 rounded-xl overflow-hidden">
                      <img src={rel.image} alt={rel.title} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-bold text-[#DC2626] uppercase block">{rel.category}</span>
                    <h4 className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug">{rel.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
