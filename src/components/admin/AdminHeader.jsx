import { useAuthContext } from "../../context/AuthContext";

const AdminHeader = () => {
  const { logout } = useAuthContext();

  return (
    <header className="bg-blue-600 shadow px-6 py-4 flex justify-between items-center pl-14 md:pl-8 text-white">
      <h1 className="font-semibold text-lg"> LHCCM Admin Dashboard</h1>

      <button
        onClick={logout}
        className="text-cyan-300 hover:underline"
      >
        Logout
      </button>
    </header>
  );
};

export default AdminHeader;
