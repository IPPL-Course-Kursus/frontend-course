import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUsers, FaSearch, FaFilter, FaBars } from "react-icons/fa";
import SideBar from "../../components/Sidebar/SidebarAdmin";
import { fetchStats, fetchPayments, fetchuser } from "../../redux/actions/adminDashboardActions";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const { stats, paymentStatus, loading, user } = useSelector((state) => state.adminDashboard);

  const [globalSearch, setGlobalSearch] = useState("");
  const [paymentSearch, setPaymentSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  // Fetch stats and payment data when the component mounts
  useEffect(() => {
    dispatch(fetchStats());
    dispatch(fetchPayments());
    dispatch(fetchuser());
  }, [dispatch]);

  // Calculate free and premium class counts
  const freeClassesCount = paymentStatus.filter(payment => payment.paymentMethod === "Free").length;
  const premiumClassesCount = paymentStatus.filter(payment => payment.paymentMethod !== "Free").length;

  // Filter payments based on search inputs and filter
  const filteredPayments = paymentStatus.filter((payment) => {
    const isGlobalSearchMatch =
      globalSearch === "" ||
      payment.id.toString().includes(globalSearch.toLowerCase()) ||  // Convert id to string
      payment.kategori.toLowerCase().includes(globalSearch.toLowerCase()) ||
      payment.kelasPremium.toLowerCase().includes(globalSearch.toLowerCase());

    const isPaymentSearchMatch =
      paymentSearch === "" ||
      payment.id.toString().includes(paymentSearch.toLowerCase()) ||  // Convert id to string
      payment.kategori.toLowerCase().includes(paymentSearch.toLowerCase()) ||
      payment.kelasPremium.toLowerCase().includes(paymentSearch.toLowerCase()) ||
      payment.tanggalBayar.toLowerCase().includes(paymentSearch.toLowerCase());

    const isFilterMatch = filter === "" || payment.paymentStatus === filter;

    return isGlobalSearchMatch && isPaymentSearchMatch && isFilterMatch;
  });

  // Sort payments by ID in ascending order (from 1 upwards)
  const sortedPayments = filteredPayments.sort((a, b) => a.id - b.id);

  const handleFilterChange = (e) => setFilter(e.target.value);

  const toggleSearch = () => setSearchVisible((prev) => !prev);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-50 transition-transform transform bg-white md:relative md:translate-x-0 md:bg-transparent ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <SideBar />
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 p-4 md:p-6 bg-secondary min-h-screen font-poppins">
        {/* Header */}
        <div className="bg-[#F3F7FB] p-4 flex justify-between items-center mb-4 shadow-sm">
          {/* Menu button - visible on mobile */}
          <button
            className="text-[#0a61aa] md:hidden"
            onClick={() => setSidebarOpen((prev) => !prev)}
          >
            <FaBars className="text-2xl" />
          </button>

          <h1 className="text-2xl font-bold text-[#173D94]">Hi, Admin!</h1>

          {/* Global Search Bar */}
          <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-md hidden md:block">
            <input
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Cari..."
              className="w-full p-2 pl-4 pr-10 text-sm text-gray-700 rounded-full shadow-sm outline-none"
            />
            <button className="absolute right-0 top-0 mt-1 mr-2">
              <FaSearch className="text-[#173D94]" />
            </button>
          </div>
        </div>

        {/* Cards Users */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[{ count: user.userCount, label: "Users", color: "bg-primary" },
          { count: user.instrukturCount, label: "Instruktor", color: "bg-success" },
          { count: freeClassesCount, label: "Free Class", color: "bg-[#173D94]" },
          { count: premiumClassesCount, label: "Premium Class", color: "bg-[#0a61aa]" }]
            .map(({ count, label, color }) => (
              <div key={label} className={`${color} text-white font-semibold p-4 rounded-lg shadow-sm flex items-center`}>
                <div className="bg-white rounded-full p-2">
                  <FaUsers className="text-2xl" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl">{count}</div>
                  <div className="text-sm">{label}</div>
                </div>
              </div>
            ))}
        </div>

        {/* Section for Payment Status */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
          {/* Title */}
          <h2 className="text-lg md:text-xl font-bold text-[#0a61aa]">Status Pembayaran</h2>

          {/* Filter and Search */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
            {/* Filter Dropdown */}
            <div className="relative">
              <select
                value={filter}
                onChange={handleFilterChange}
                className="p-1 border border-[#173D94] rounded-full text-sm text-[#173D94]"
              >
                <option value="">Filter</option>
                <option value="settlement">Sudah Bayar</option>
                <option value="pending">Belum Bayar</option>
              </select>
              <FaFilter className="absolute right-4 top-2 text-[#173D94] text-sm" />
            </div>

            {/* Search Icon */}
            <div className="relative w-full md:w-auto flex items-center">
              <FaSearch
                className="text-[#173D94] text-lg cursor-pointer"
                onClick={toggleSearch}
              />
              <input
                type="text"
                value={paymentSearch}
                onChange={(e) => setPaymentSearch(e.target.value)}
                className={`transition-all duration-300 ease-in-out border border-[#173D94] rounded-full ml-2 p-1 ${searchVisible ? "w-40 opacity-100" : "w-0 opacity-0 pointer-events-none"
                  }`}
                placeholder="Cari..."
              />
            </div>
          </div>
        </div>

        {/* Payment Status Table */}
        <div className="overflow-x-auto bg-white p-4">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left text-xs md:text-sm font-semibold">
                <th className="px-2 md:px-4 py-2">ID</th>
                <th className="px-2 md:px-4 py-2">Nama Kursus</th>
                <th className="px-2 md:px-4 py-2">Harga</th>
                <th className="px-2 md:px-4 py-2">Status</th>
                <th className="px-2 md:px-4 py-2">Metode Pembayaran</th>
                <th className="px-2 md:px-4 py-2">Tanggal Bayar</th>
              </tr>
            </thead>
            <tbody>
              {!loading && sortedPayments && sortedPayments.length > 0 ? (
                sortedPayments.map((payment) => (
                  <tr key={payment.id} className="border-b">
                    <td className="px-2 md:px-4 py-2">{payment.id}</td>
                    <td className="px-2 md:px-4 py-2">{payment.courseName}</td>
                    <td className="px-2 md:px-4 py-2">Rp.{payment.totalPrice}00,00</td>
                    <td className="px-2 md:px-4 py-2">{payment.paymentStatus}</td>
                    <td className="px-2 md:px-4 py-2">{payment.paymentMethod}</td>
                    <td className="px-2 md:px-4 py-2">{payment.createdAt}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
