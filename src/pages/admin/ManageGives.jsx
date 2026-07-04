import { useState, useEffect, useCallback, useMemo } from "react";
import DataTable from "../../components/admin/DataTable";
import { useAuthContext } from "../../context/AuthContext";
import api from "../../utils/api"; // Assuming you have a central axios instance
import { toast } from "react-hot-toast";

const ManageGives = () => {
  const { token } = useAuthContext();
  const [gives, setGives] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Pagination & Filter State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterType, setFilterType] = useState(""); // Tithe, Offering, etc.

  const fetchGives = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      // Production Grade: Server-side pagination and filtering
      const res = await api.get(`/gives?page=${page}&type=${filterType}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const { docs, pages } = res.data; // Assuming backend returns { docs: [], pages: 5 }
      setGives(docs || []);
      setTotalPages(pages || 1);
    } catch (err) {
      toast.error("Failed to sync ledger");
    } finally {
      setLoading(false);
    }
  }, [token, page, filterType]);

  useEffect(() => {
    fetchGives();
  }, [fetchGives]);

  // Senior Tip: Memoize stats to avoid heavy recalculations on every render
  const stats = useMemo(() => {
    const successful = gives.filter(g => g.status === 'success' || g.status === 'completed');
    
    const totalRevenue = successful.reduce((acc, curr) => acc + Number(curr.amount), 0);
    
    const today = new Date().toISOString().split('T')[0];
    const todaysGiving = successful
      .filter(g => new Date(g.createdAt).toISOString().split('T')[0] === today)
      .reduce((acc, curr) => acc + Number(curr.amount), 0);

    const successRate = gives.length > 0 
      ? Math.round((successful.length / gives.length) * 100) 
      : 0;

    return { totalRevenue, todaysGiving, successRate };
  }, [gives]);

  const columns = [
    { key: "donorName", label: "Donor" },
    { key: "type", label: "Category" },
    { 
      key: "amount", 
      label: "Amount", 
      render: (val) => `₦${Number(val).toLocaleString()}` 
    },
    { 
      key: "status", 
      label: "Status",
      render: (val) => (
        <span className={`px-2 py-1 rounded text-xs font-bold ${val === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {val.toUpperCase()}
        </span>
      )
    },
    { key: "reference", label: "Ref" },
  ];

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen space-y-8">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-blue-700 tracking-tighter">FINANCIAL LEDGER</h2>
          <p className="text-gray-600 font-medium">Real-time donation tracking and verification.</p>
        </div>
        
        <select 
          className="bg-white border-2 border-gray-200 w-38 text-sm md:text-base md:w-44 rounded-xl px-2 py-2 font-bold text-gray-700 outline-none focus:border-blue-500"
          value={filterType}
          onChange={(e) => { setFilterType(e.target.value); setPage(1); }}
        >
          <option value="">All Transactions</option>
          <option value="Tithe">Tithes Only</option>
          <option value="Offering">Offerings Only</option>
          <option value="Special giving">Special Giving Only</option>
        </select>
      </div>

      {/* 2. Stats Cards Row */}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-600">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Total Revenue (Page)</p>
          <h3 className="text-3xl font-black text-gray-900">₦{stats.totalRevenue.toLocaleString()}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-emerald-500">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Today's Giving</p>
          <h3 className="text-3xl font-black text-gray-900">₦{stats.todaysGiving.toLocaleString()}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-purple-500">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Success Rate</p>
          <h3 className="text-3xl font-black text-gray-900">{stats.successRate}%</h3>
        </div>
      </div>

      {/* 3. Data Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="h-64 flex items-center justify-center animate-pulse text-gray-400 font-bold">Synchronizing...</div>
        ) : (
          <>
            <DataTable columns={columns} data={gives} />
            
            {/* 4. Pagination Controls */}
            <div className="p-4 bg-gray-50 border-t flex items-center justify-between">
              <span className="text-sm text-gray-500 font-medium">Page {page} of {totalPages}</span>
              <div className="flex gap-2">
                <button 
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="px-4 py-2 bg-white border rounded-lg font-bold text-sm disabled:opacity-50"
                >
                  Previous
                </button>
                <button 
                  disabled={page === totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageGives;