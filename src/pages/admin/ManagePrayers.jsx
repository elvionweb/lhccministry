import { useEffect, useState, useCallback } from "react";
import { fetchPrayers, deletePrayer } from "../../utils/api";
import DataTable from "../../components/admin/DataTable"; // Using your shared table component
import { toast } from "react-hot-toast";

const ManagePrayer = () => {
  const [prayers, setPrayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterType, setFilterType] = useState(""); // "" | "Prayer Request" | "Counseling"

  const loadPrayers = useCallback(async () => {
    setLoading(true);
    try {
      // Assuming backend supports /prayers?page=1&type=Counseling
      const res = await fetchPrayers(page, filterType); 
      const data = res?.data?.docs || res?.docs || [];
      const total = res?.data?.pages || res?.pages || 1;

      setPrayers(data);
      setTotalPages(total);
    } catch (err) {
      toast.error("Failed to fetch prayer records");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, filterType]);

  useEffect(() => {
    loadPrayers();
  }, [loadPrayers]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this request?")) return;
    try {
      await deletePrayer(id);
      toast.success("Record deleted");
      setPrayers(prayers.filter((p) => p._id !== id));
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const columns = [
    { key: "name", label: "Full Name" },
    { 
      key: "type", 
      label: "Category",
      render: (val) => (
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
          val === 'Counseling' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
        }`}>
          {val}
        </span>
      )
    },
    { key: "message", label: "Request Detail" },
    { 
      key: "preferredDate", 
      label: "Sch. Date",
      render: (val) => val ? new Date(val).toLocaleDateString() : "N/A"
    },
    {
      key: "_id",
      label: "Actions",
      render: (id) => (
        <button onClick={() => handleDelete(id)} className="text-red-500 hover:text-red-700 font-bold">
          Delete
        </button>
      )
    }
  ];

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-blue-700 tracking-tighter uppercase">Prayer & Counseling</h1>
          <p className="text-gray-500">Manage spiritual requests from the congregation.</p>
        </div>

         {/* All Request Filter Dropdown */}
        <select 
          className="bg-white w-32 md:w-40 sm:w-34 border-2 text-sm md:text-base border-gray-200 rounded-xl px-4 py-2 font-bold text-gray-700 outline-none focus:border-blue-600"
          value={filterType}
          onChange={(e) => { setFilterType(e.target.value); setPage(1); }}
        >
          <option value="">All Requests</option>
          <option value="Prayer Request">Prayer Only</option>
          <option value="Counseling">Counseling Only</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="h-64 flex items-center justify-center animate-pulse text-gray-400 font-bold italic">Syncing Heaven's Ledger...</div>
        ) : (
          <>
            <DataTable columns={columns} data={prayers} />
            
            {/* Pagination Controls */}
            <div className="p-4 bg-gray-50 border-t flex items-center justify-between">
              <span className="text-sm text-gray-500 font-medium font-mono">PAGE {page} OF {totalPages}</span>
              <div className="flex gap-2">
                <button 
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="px-4 py-2 bg-white border-2 border-gray-100 rounded-xl font-bold text-sm disabled:opacity-30"
                >
                  Prev
                </button>
                <button 
                  disabled={page === totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm disabled:opacity-30 shadow-lg"
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

export default ManagePrayer;
