import StatsCard from "../../components/admin/StatsCard";
import { useEffect, useState } from "react";
import { fetchDashboardStats } from "../../utils/api";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const [stats, setStats] = useState({
    sermons: 0,
    events: 0,
    prayers: 0,
    giving: 0,
    givingCount: 0,
    gallery: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const loadStats = async () => {
      try {
        const res = await fetchDashboardStats(controller.signal);
        setStats(res?.stats || res?.data?.stats || stats);
      } catch (err) {
        if (err.name !== 'CanceledError') {
          toast.error("Failed to load dashboard stats");
        }
      } finally {
        setLoading(false);
      }
    };
    loadStats();
    return () => controller.abort();
  }, []);

  if (loading) return <div className="p-8 font-bold text-gray-400">Loading metrics...</div>;

  return (
    <div>
      <h2 className="text-2xl text-blue-700 font-bold mb-6">Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard title="Total Giving Amount" value={`₦${stats.giving.toLocaleString()}`} />
        <StatsCard title="Total Givings" value={stats.givingCount} />
        <StatsCard title="Sermons" value={stats.sermons} />
        <StatsCard title="Events" value={stats.events} />
        <StatsCard title="Prayer Requests" value={stats.prayers} />
        <StatsCard title="Gallery Photos" value={stats.gallery} />
      </div>
    </div>
  );
};

export default Dashboard;
