import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  FileText,
  DollarSign,
  CheckCircle2,
  Clock,
  Plus,
  Send,
  Sparkles,
  TrendingUp,
  Search,
  Key
} from 'lucide-react';

interface AdminPanelProps {
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'leads' | 'blog' | 'settings'>('leads');

  const [inquiries, setInquiries] = useState([
    { id: 'DF-98231', name: 'Tanvir Ahmed', phone: '+880 1771-304219', service: 'Canada Tourist Visa', country: 'Canada', status: 'In Review', date: '2026-07-28' },
    { id: 'DF-10492', name: 'Nusrat Jahan', phone: '+880 1819-204123', service: 'UK Student Visa', country: 'United Kingdom', status: 'Approved', date: '2026-07-27' },
    { id: 'DF-55102', name: 'Mahmudul Hasan', phone: '+880 1912-881293', service: 'Schengen Work Permit', country: 'Romania', status: 'Pending', date: '2026-07-26' },
    { id: 'DF-40912', name: 'Haji Dr. Golam Kibria', phone: '+880 1711-002194', service: '5-Star VIP Umrah', country: 'Saudi Arabia', status: 'Completed', date: '2026-07-25' },
  ]);

  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogCategory, setNewBlogCategory] = useState('Visa Guide');
  const [newBlogContent, setNewBlogContent] = useState('');
  const [blogPublished, setBlogPublished] = useState(false);

  const toggleStatus = (id: string) => {
    setInquiries(
      inquiries.map((inq) => {
        if (inq.id === id) {
          const nextStatus = inq.status === 'Pending' ? 'In Review' : inq.status === 'In Review' ? 'Approved' : 'Completed';
          return { ...inq, status: nextStatus };
        }
        return inq;
      })
    );
  };

  const handlePublishBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBlogTitle && newBlogContent) {
      setBlogPublished(true);
      setTimeout(() => {
        setBlogPublished(false);
        setNewBlogTitle('');
        setNewBlogContent('');
      }, 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="bg-[#072B45] p-6 rounded-3xl border border-white/20 flex justify-between items-center shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-[#F9A826] flex items-center justify-center font-bold">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Dreams Fly Management Console
            </span>
            <h2 className="text-2xl font-black font-serif text-white">Agency Admin Panel</h2>
          </div>
        </div>

        <button
          onClick={onClose}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-gray-300 rounded-xl text-xs font-bold"
        >
          Exit Admin Mode
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#072B45] p-5 rounded-2xl border border-white/15">
          <span className="block text-[10px] text-gray-400 font-bold uppercase">Total Files Processed</span>
          <span className="text-2xl font-black text-white">1,842</span>
          <span className="block text-[10px] text-emerald-400 font-bold mt-1">↑ 14% vs last month</span>
        </div>

        <div className="bg-[#072B45] p-5 rounded-2xl border border-white/15">
          <span className="block text-[10px] text-gray-400 font-bold uppercase">Monthly Revenue (BDT)</span>
          <span className="text-2xl font-black text-[#F9A826]">৳ 4.8M</span>
          <span className="block text-[10px] text-emerald-400 font-bold mt-1">✓ Verified Accounts</span>
        </div>

        <div className="bg-[#072B45] p-5 rounded-2xl border border-white/15">
          <span className="block text-[10px] text-gray-400 font-bold uppercase">Approval Rate</span>
          <span className="text-2xl font-black text-emerald-400">98.4%</span>
          <span className="block text-[10px] text-gray-400 mt-1">Canada & Schengen lead</span>
        </div>

        <div className="bg-[#072B45] p-5 rounded-2xl border border-white/15">
          <span className="block text-[10px] text-gray-400 font-bold uppercase">Gemini AI Status</span>
          <span className="text-2xl font-black text-sky-400">ACTIVE</span>
          <span className="block text-[10px] text-emerald-400 font-bold mt-1">Server Proxy Live</span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex space-x-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveAdminTab('leads')}
          className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
            activeAdminTab === 'leads' ? 'bg-[#00A8FF] text-slate-950' : 'bg-white/5 text-gray-300'
          }`}
        >
          Inquiries & Leads Queue ({inquiries.length})
        </button>
        <button
          onClick={() => setActiveAdminTab('blog')}
          className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
            activeAdminTab === 'blog' ? 'bg-[#00A8FF] text-slate-950' : 'bg-white/5 text-gray-300'
          }`}
        >
          Publish Blog / News Article
        </button>
      </div>

      {/* Leads Table */}
      {activeAdminTab === 'leads' && (
        <div className="bg-[#072B45] p-6 rounded-3xl border border-white/15 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 font-bold">
                <th className="p-3">App ID</th>
                <th className="p-3">Applicant Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Service</th>
                <th className="p-3">Country</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {inquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-slate-900/50">
                  <td className="p-3 font-mono font-bold text-amber-300">{inq.id}</td>
                  <td className="p-3 font-bold text-white">{inq.name}</td>
                  <td className="p-3 text-gray-300">{inq.phone}</td>
                  <td className="p-3">{inq.service}</td>
                  <td className="p-3 text-sky-300 font-semibold">{inq.country}</td>
                  <td className="p-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        inq.status === 'Completed' || inq.status === 'Approved'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {inq.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleStatus(inq.id)}
                      className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-[10px] font-bold cursor-pointer"
                    >
                      Advance Status →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Blog Publisher */}
      {activeAdminTab === 'blog' && (
        <div className="bg-[#072B45] p-6 rounded-3xl border border-white/15 max-w-2xl space-y-4">
          <h3 className="text-lg font-bold font-serif text-white">Publish New Travel & Visa Guide</h3>

          {blogPublished ? (
            <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-center text-emerald-300 text-xs">
              ✓ Article published successfully to dreamsfly.net blog!
            </div>
          ) : (
            <form onSubmit={handlePublishBlog} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  value={newBlogTitle}
                  onChange={(e) => setNewBlogTitle(e.target.value)}
                  placeholder="e.g., 2026 Canada Tourist Visa Bank Rules for Bangladeshi Applicants"
                  className="w-full p-2.5 bg-slate-900 border border-white/20 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Category</label>
                <select
                  value={newBlogCategory}
                  onChange={(e) => setNewBlogCategory(e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-white/20 rounded-xl text-white"
                >
                  <option value="Visa Guide">Visa Guide</option>
                  <option value="Work Permits">Work Permits</option>
                  <option value="Air Ticket Deals">Air Ticket Deals</option>
                  <option value="Umrah News">Umrah News</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1">Article Content (Markdown supported)</label>
                <textarea
                  rows={5}
                  required
                  value={newBlogContent}
                  onChange={(e) => setNewBlogContent(e.target.value)}
                  placeholder="Write the guide content..."
                  className="w-full p-2.5 bg-slate-900 border border-white/20 rounded-xl text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#F9A826] text-slate-950 font-extrabold rounded-xl text-xs uppercase"
              >
                Publish Article Now
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
