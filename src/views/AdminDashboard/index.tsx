import React, { useEffect, useState } from 'react';
import { BarChart3, Users, MousePointerClick, Activity, ChevronRight, Eye } from 'lucide-react';
import { analyticsService } from '../../services/analyticsService';
import type { WishData } from '../../templates/types';
import { Link } from 'react-router-dom';

interface DashboardStats {
  totalWishes: number;
  totalViews: number;
  activeWishes: number;
}

interface WishDetails extends WishData {
  id: string;
  views: number;
  lastViewedAt: string;
}

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({ totalWishes: 0, totalViews: 0, activeWishes: 0 });
  const [wishesList, setWishesList] = useState<WishDetails[]>([]);

  useEffect(() => {
    // Gather analytics and local wishes
    const analytics = analyticsService.getAnalytics();
    let localWishes: Record<string, WishData> = {};
    try {
      const raw = localStorage.getItem('wisher_wishes');
      localWishes = raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.error('Failed to parse local wishes', e);
    }

    const wishEntries = Object.entries(localWishes);
    let totalViews = 0;
    let activeWishes = 0;

    const list: WishDetails[] = wishEntries.map(([id, data]) => {
      const a = analytics[id] || { views: 0, lastViewedAt: 'N/A' };
      totalViews += a.views;
      if (a.views > 0) activeWishes++;

      return {
        ...data,
        id,
        views: a.views,
        lastViewedAt: a.lastViewedAt,
      };
    });

    // Sort by most viewed
    list.sort((a, b) => b.views - a.views);

    setStats({
      totalWishes: wishEntries.length,
      totalViews,
      activeWishes,
    });
    setWishesList(list);
  }, []);

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#111111] font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-black tracking-tight flex items-center gap-2">
              <BarChart3 className="text-[#d30f0f]" />
              Admin Dashboard
            </h1>
            <p className="text-[#5e5a52] text-sm mt-1">Overview of your Wisher platform performance</p>
          </div>
          <Link 
            to="/" 
            className="px-4 py-2 bg-white border border-[#e5dfd3] rounded-xl text-sm font-bold shadow-sm hover:bg-[#f3f1ec] transition-colors"
          >
            Back to App
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            icon={<Users className="w-5 h-5 text-blue-600" />} 
            title="Total Wishes Created" 
            value={stats.totalWishes} 
          />
          <StatCard 
            icon={<MousePointerClick className="w-5 h-5 text-[#d30f0f]" />} 
            title="Total Clicks / Views" 
            value={stats.totalViews} 
          />
          <StatCard 
            icon={<Activity className="w-5 h-5 text-green-600" />} 
            title="Active Wishes" 
            value={stats.activeWishes} 
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border border-[#e5dfd3] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#e5dfd3] bg-[#fdfaf5]">
            <h2 className="font-display text-lg font-extrabold tracking-tight">Recent Wishes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#fcfaf7] border-b border-[#e5dfd3] text-xs uppercase tracking-wider text-[#5e5a52] font-bold">
                  <th className="px-6 py-4">Wish ID</th>
                  <th className="px-6 py-4">Target Name</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Template</th>
                  <th className="px-6 py-4">Views</th>
                  <th className="px-6 py-4">Last Viewed</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5dfd3]">
                {wishesList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-sm text-[#5e5a52]">
                      No wishes found. Create one to see analytics here.
                    </td>
                  </tr>
                ) : (
                  wishesList.map(wish => (
                    <tr key={wish.id} className="hover:bg-[#fdfaf5] transition-colors group">
                      <td className="px-6 py-4 font-mono text-sm text-[#d30f0f] font-semibold">{wish.id}</td>
                      <td className="px-6 py-4 font-semibold text-[#111111]">{wish.targetName}</td>
                      <td className="px-6 py-4 text-[#5e5a52] text-sm">{wish.title || 'N/A'}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-[#e5dfd3]/50 rounded-full text-xs font-bold text-[#5e5a52]">
                          {wish.templateType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 font-bold">
                          <Eye className="w-4 h-4 text-[#5e5a52]" />
                          {wish.views}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#5e5a52]">
                        {wish.lastViewedAt !== 'N/A' ? new Date(wish.lastViewedAt).toLocaleString() : 'Never'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          to={`/wish/${wish.id}`}
                          target="_blank"
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#f3f1ec] text-[#111111] group-hover:bg-[#d30f0f] group-hover:text-white transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }: { icon: React.ReactNode, title: string, value: number }) => (
  <div className="bg-white p-6 rounded-3xl border border-[#e5dfd3] shadow-sm flex items-center gap-4">
    <div className="w-14 h-14 rounded-2xl bg-[#fdfaf5] border border-[#e5dfd3] flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-xs font-bold text-[#5e5a52] uppercase tracking-wider mb-1">{title}</p>
      <p className="font-display text-3xl font-black text-[#111111]">{value}</p>
    </div>
  </div>
);

export default AdminDashboard;
