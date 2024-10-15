import { useState } from "react";
import { FaUsers, FaSearch, FaFilter, FaBars } from "react-icons/fa";
import SideBar from "../../components/Sidebar/SidebarAdmin";

const AdminDashboard = () => {
  const [stats] = useState({
    users: 450,
    instruktor: 25,
    freeClass: 20,
    premiumClass: 20,
  });

  // State for sidebar visibility
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // State for global search input
  const [globalSearch, setGlobalSearch] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);

  // State for payment search input
  const [paymentSearch, setPaymentSearch] = useState("");

  // State for payment status filter
  const [filter, setFilter] = useState("");

  // Payment status data
  const [paymentStatus] = useState([
    {
      id: "johndoe123",
      kategori: "UI/UX Design",
      kelasPremium: "Belajar Web Designer dengan Figma",
      status: "SUDAH BAYAR",
      metodePembayaran: "Credit Card",
      tanggalBayar: "21 Sep, 2023 at 2:00 AM",
    },
    {
      id: "supermanxx",
      kategori: "UI/UX Design",
      kelasPremium: "Belajar Web Designer dengan Figma",
      status: "BELUM BAYAR",
      metodePembayaran: "-",
      tanggalBayar: "-",
    },
    {
      id: "ironman99",
      kategori: "Web Development",
      kelasPremium: "CSS dan HTML dalam seminggu",
      status: "SUDAH BAYAR",
      metodePembayaran: "Credit Card",
      tanggalBayar: "20 Sep, 2023 at 2:00 AM",
    },
    {
      id: "lokiMaster",
      kategori: "Data Science",
      kelasPremium: "Data Cleaning untuk pemula",
      status: "SUDAH BAYAR",
      metodePembayaran: "Credit Card",
      tanggalBayar: "19 Sep, 2023 at 2:00 AM",
    },
    {
      id: "siapaAjaani",
      kategori: "Data Science",
      kelasPremium: "Data Cleaning untuk pemula",
      status: "BELUM BAYAR",
      metodePembayaran: "-",
      tanggalBayar: "-",
    },
    {
      id: "visionOKE",
      kategori: "Data Science",
      kelasPremium: "Data Cleaning untuk pemula",
      status: "SUDAH BAYAR",
      metodePembayaran: "Credit Card",
      tanggalBayar: "10 Sep, 2023 at 2:00 AM",
    },
  ]);

  // Filter payments based on search inputs and filter
  const filteredPayments = paymentStatus.filter(
    (payment) =>
      (globalSearch === "" ||
        payment.id.toLowerCase().includes(globalSearch.toLowerCase()) ||
        payment.kategori.toLowerCase().includes(globalSearch.toLowerCase()) ||
        payment.kelasPremium
          .toLowerCase()
          .includes(globalSearch.toLowerCase())) &&
      (paymentSearch === "" ||
        payment.id.toLowerCase().includes(paymentSearch.toLowerCase()) ||
        payment.kategori.toLowerCase().includes(paymentSearch.toLowerCase()) ||
        payment.kelasPremium
          .toLowerCase()
          .includes(paymentSearch.toLowerCase()) ||
        payment.tanggalBayar
          .toLowerCase()
          .includes(paymentSearch.toLowerCase())) &&
      (filter === "" || payment.status === filter)
  );

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Toggle search visibility
  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`fixed inset-0 z-50 transition-transform transform bg-white md:relative md:translate-x-0 md:bg-transparent ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SideBar />
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main content */}
        <div className="flex-1 p-4 md:p-6 bg-secondary min-h-screen font-poppins">
          {/* Header */}
          <div className="bg-[#F3F7FB] p-4 flex justify-between items-center mb-4 shadow-sm">
            {/* Menu button - visible on mobile */}
            <button
              className="text-[#0a61aa] md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
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
            {/* Users Card */}
            <div className="bg-primary text-white font-semibold p-4 rounded-lg shadow-sm flex items-center">
              <div className="bg-white rounded-full p-2">
                <FaUsers className="text-2xl text-primary" />
              </div>
              <div className="ml-4">
                <div className="text-2xl">{stats.users}</div>
                <div className="text-sm">Users</div>
              </div>
            </div>

            {/* Instructors Card */}
            <div className="bg-success text-white font-semibold p-4 rounded-lg shadow-sm flex items-center">
              <div className="bg-white rounded-full p-2">
                <FaUsers className="text-2xl text-success" />
              </div>
              <div className="ml-4">
                <div className="text-2xl">{stats.instruktor}</div>
                <div className="text-sm">Instruktor</div>
              </div>
            </div>

            {/* Free Class Card */}
            <div className="bg-[#173D94] text-white font-semibold p-4 rounded-lg shadow-sm flex items-center">
              <div className="bg-white rounded-full p-2">
                <FaUsers className="text-2xl text-[#173D94]" />
              </div>
              <div className="ml-4">
                <div className="text-2xl">{stats.freeClass}</div>
                <div className="text-sm">Free Class</div>
              </div>
            </div>

            {/* Premium Class Card */}
            <div className="bg-[#0a61aa] text-white font-semibold p-4 rounded-lg shadow-sm flex items-center">
              <div className="bg-white rounded-full p-2">
                <FaUsers className="text-2xl text-[#0a61aa]" />
              </div>
              <div className="ml-4">
                <div className="text-2xl">{stats.premiumClass}</div>
                <div className="text-sm">Premium Class</div>
              </div>
            </div>
          </div>

          {/* Section for Payment Status */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
            {/* Title */}
            <h2 className="text-lg md:text-xl font-bold text-[#0a61aa]">
              Status Pembayaran
            </h2>

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
                  <option value="SUDAH BAYAR">Sudah Bayar</option>
                  <option value="BELUM BAYAR">Belum Bayar</option>
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
                  className={`transition-all duration-300 ease-in-out border border-[#173D94] rounded-full ml-2 p-1 ${
                    searchVisible
                      ? "w-40 opacity-100"
                      : "w-0 opacity-0 pointer-events-none"
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
                  <th className="px-2 md:px-4 py-2">Kategori</th>
                  <th className="px-2 md:px-4 py-2">Kelas Premium</th>
                  <th className="px-2 md:px-4 py-2">Status</th>
                  <th className="px-2 md:px-4 py-2">Metode Pembayaran</th>
                  <th className="px-2 md:px-4 py-2">Tanggal Bayar</th>
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
                    <tr key={index} className="border-t text-xs md:text-sm">
                      <td className="px-2 md:px-4 py-2 font-semibold">
                        {payment.id}
                      </td>
                      <td className="px-2 md:px-4 py-2 font-semibold">
                        {payment.kategori}
                      </td>
                      <td className="px-2 md:px-4 py-2 font-semibold">
                        {payment.kelasPremium}
                      </td>
                      <td
                        className={`px-2 md:px-4 py-2 font-semibold ${
                          payment.status === "SUDAH BAYAR"
                            ? "text-success"
                            : "text-failed"
                        }`}
                      >
                        {payment.status}
                      </td>
                      <td className="px-2 md:px-4 py-2 font-semibold">
                        {payment.metodePembayaran}
                      </td>
                      <td className="px-2 md:px-4 py-2 font-semibold">
                        {payment.tanggalBayar}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
