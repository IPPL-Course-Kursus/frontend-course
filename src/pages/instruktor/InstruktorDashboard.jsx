import Sidebar from "../../components/Sidebar/SidebarInstruktur";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUsers, FaSearch, FaFilter } from "react-icons/fa";
import { fetchStats, fetchPayments, fetchuser } from "../../redux/actions/instrukturDashboardActions"; // Pastikan menggunakan action yang sama

const InstruktorDashboard = () => {
  const dispatch = useDispatch();

  // Periksa apakah instrukturDashboard ada di state dan beri default value
  const { stats = {}, paymentStatus = [], user = [], loading = false } = useSelector(
    (state) => state.instrukturDashboard || {}
  );

  console.log("Current state (instrukturDashboard):", { stats, paymentStatus, user, loading });

  // State untuk search input
  const [globalSearch, setGlobalSearch] = useState("");
  const [paymentSearch, setPaymentSearch] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const [filter, setFilter] = useState("");

  // Fetch stats, payment status, and user data
  useEffect(() => {
    dispatch(fetchStats());
    dispatch(fetchPayments());
    dispatch(fetchuser());
  }, [dispatch]);

  // Filter berdasarkan global search, search payment, dan filter status pembayaran
  const filteredPayments = paymentStatus.filter(
    (payment) =>
      (globalSearch === "" ||
        payment.id.toLowerCase().includes(globalSearch.toLowerCase()) ||
        payment.kategori.toLowerCase().includes(globalSearch.toLowerCase()) ||
        payment.kelasPremium.toLowerCase().includes(globalSearch.toLowerCase())) &&
      (paymentSearch === "" ||
        payment.id.toLowerCase().includes(paymentSearch.toLowerCase()) ||
        payment.kategori.toLowerCase().includes(paymentSearch.toLowerCase()) ||
        payment.kelasPremium.toLowerCase().includes(paymentSearch.toLowerCase()) ||
        payment.tanggalBayar.toLowerCase().includes(paymentSearch.toLowerCase())) &&
      (filter === "" || payment.status === filter)
  );

  const handleFilterChange = (e) => setFilter(e.target.value);
  const toggleSearch = () => setSearchVisible(!searchVisible);

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 bg-secondary min-h-screen w-screen font-poppins">
        {/* Header */}
        <div className="bg-[#F3F7FB] p-4 flex justify-between items-center mb-4 shadow-sm">
          <h1 className="text-2xl font-bold text-[#173D94]">Hi, Instruktor</h1>
          <div className="relative flex items-center bg-white rounded-full shadow-sm">
            <input
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Cari"
              className="p-2 pl-4 pr-10 text-sm text-gray-700 rounded-lg outline-none"
            />
            <button className="absolute right-1 bg-[#173D94] p-1.5 rounded-lg">
              <FaSearch className="text-white" />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-primary text-white font-semibold p-4 rounded-lg shadow-sm flex items-center justify-center">
            <div className="bg-white rounded-full p-2">
              <FaUsers className="text-2xl text-primary" />
            </div>
            <div className="ml-4">
              <div className="text-2xl">{stats.users || 0}</div>
              <div className="text-sm">Users</div>
            </div>
          </div>
          <div className="bg-success text-white font-semibold p-4 rounded-lg shadow-sm flex items-center justify-center">
            <div className="bg-white rounded-full p-2">
              <FaUsers className="text-2xl text-primary" />
            </div>
            <div className="ml-4">
              <div className="text-2xl">{stats.instruktur || 0}</div>
              <div className="text-sm">Instruktor</div>
            </div>
          </div>
          <div className="bg-[#173D94] text-white font-semibold p-4 rounded-lg shadow-sm flex items-center justify-center">
            <div className="bg-white rounded-full p-2">
              <FaUsers className="text-2xl text-primary" />
            </div>
            <div className="ml-4">
              <div className="text-2xl">{stats.freeClass || 0}</div>
              <div className="text-sm">Free Class</div>
            </div>
          </div>
          <div className="bg-[#173D94] text-white font-semibold p-4 rounded-lg shadow-sm flex items-center justify-center">
            <div className="bg-white rounded-full p-2">
              <FaUsers className="text-2xl text-primary" />
            </div>
            <div className="ml-4">
              <div className="text-2xl">{stats.premiumClass || 0}</div>
              <div className="text-sm">Premium Class</div>
            </div>
          </div>
        </div>

        {/* Payment Table */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Instruktor Active</h2>
          <div className="flex items-center">
            <div className="relative mr-2">
              <select
                value={filter}
                onChange={handleFilterChange}
                className="p-1 border border-[#173D94] rounded-full text-sm text-[#173D94]"
              >
                <option value="">Filter</option>
                <option value="SUDAH BAYAR">Sudah Bayar</option>
                <option value="BELUM BAYAR">Belum Bayar</option>
              </select>
              <FaFilter className="absolute right-4 top-2 text-[#173D94] text-sm" />
            </div>
            <div className="relative flex items-center">
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
              />
            </div>
          </div>
        </div>

        {/* Payment Status Table */}
        <div className="overflow-x-auto bg-white p-4">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Kategori</th>
                <th className="px-4 py-2">Kelas Premium</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Metode Pembayaran</th>
                <th className="px-4 py-2">Tanggal Bayar</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-2 text-center">
                    Tidak ada pembayaran yang ditemukan
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2 font-semibold">{payment.id}</td>
                    <td className="px-4 py-2 font-semibold">{payment.kategori}</td>
                    <td className="px-4 py-2 font-semibold">{payment.kelasPremium}</td>
                    <td
                      className={`px-4 py-2 font-semibold ${payment.status === "SUDAH BAYAR" ? "text-green-500" : "text-red-500"
                        }`}
                    >
                      {payment.status}
                    </td>
                    <td className="px-4 py-2 font-semibold">{payment.metodePembayaran}</td>
                    <td className="px-4 py-2 font-semibold">{payment.tanggalBayar}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InstruktorDashboard;
