import { HiLogout } from "react-icons/hi";
import { useAuthContext } from "../../context/AuthContext";

const AdminHeader = () => {
  const { logout } = useAuthContext();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-3 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 px-4 py-3 pl-16 text-white shadow-md sm:px-6 sm:py-4 md:pl-8">
      <div className="min-w-0">
        <h1 className="truncate text-base font-semibold sm:text-lg"> LHCCM Admin Dashboard</h1>
        <p className="hidden text-xs text-blue-100 sm:block">
          Manage your church website content
        </p>
      </div>

      <button
        onClick={logout}
        className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3.5 py-2 text-sm font-semibold text-cyan-200 backdrop-blur transition-all hover:bg-white/20 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95 sm:px-4"
      >
        <HiLogout className="h-5 w-5" />
        <span className="hidden min-[400px]:inline">Logout</span>
      </button>
    </header>
  );
};

export default AdminHeader;
