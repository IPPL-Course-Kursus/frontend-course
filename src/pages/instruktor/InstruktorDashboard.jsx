import Sidebar from "../../components/Sidebar/SidebarInstruktur";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUsers, FaSearch, FaFilter } from "react-icons/fa";
import { instfetchPayments, instfetchkategori, instfetchuser } from "../../redux/actions/instrukturDashboardActions";

const InstruktorDashboard = () => {
  const dispatch = useDispatch();
  const { stats, paymentStatus, loading, user } = useSelector((state) => state.instrukturDashboard);

  // State for search input
  const [globalSearch, setGlobalSearch] = useState("");
  const [paymentSearch, setPaymentSearch] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const [filter, setFilter] = useState("");

  // Fetch stats, payment status, kategori status, and user data
  useEffect(() => {
    dispatch(instfetchPayments());
    dispatch(instfetchkategori());
    dispatch(instfetchuser());
  }, [dispatch]);

  const freeClassesCount = paymentStatus.filter(payment => payment.paymentMethod === "Free").length;
  const premiumClassesCount = paymentStatus.filter(payment => payment.paymentMethod !== "Free").length;

  // Create an array for card data
  const cardData = [
    { count: user?.userCount || 0, label: "Users", color: "bg-primary" },
    { count: user?.instrukturCount || 0, label: "Instruktor", color: "bg-success" },
    { count: freeClassesCount, label: "Free Class", color: "bg-[#173D94]" },
    { count: premiumClassesCount, label: "Premium Class", color: "bg-[#0a61aa]" }
  ];

  // Filter payments based on searches and filters
  const filteredPayments = paymentStatus.filter((payment) => {
    const isGlobalSearchMatch =
      globalSearch === "" ||
      payment.id.toString().includes(globalSearch.toLowerCase()) ||
      payment.kategori.toLowerCase().includes(globalSearch.toLowerCase()) ||
      payment.kelasPremium.toLowerCase().includes(globalSearch.toLowerCase());

    const isPaymentSearchMatch =
      paymentSearch === "" ||
      payment.id.toString().includes(paymentSearch.toLowerCase()) ||
      payment.kategori.toLowerCase().includes(paymentSearch.toLowerCase()) ||
      payment.kelasPremium.toLowerCase().includes(paymentSearch.toLowerCase()) ||
      payment.tanggalBayar.toLowerCase().includes(paymentSearch.toLowerCase());

    const isFilterMatch = filter === "" || payment.paymentStatus === filter;

    return isGlobalSearchMatch && isPaymentSearchMatch && isFilterMatch;
  });

  // Sort payments by ID in ascending order
  const sortedPayments = filteredPayments.sort((a, b) => a.id - b.id);
  
  const handleFilterChange = (e) => setFilter(e.target.value);
  const toggleSearch = () => setSearchVisible(!searchVisible);

  // Debugging output
  console.log("Stats:", stats);
  console.log("Payment Status:", paymentStatus);
  console.log("Loading:", loading);
  console.log("User:", user);

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
          {cardData.map((card, index) => (
            <div key={index} className={`${card.color} text-white font-semibold p-4 rounded-lg shadow-sm flex items-center justify-center`}>
              <div className="bg-white rounded-full p-2">
                <FaUsers className="text-2xl text-primary" />
              </div>
              <div className="ml-4">
                <div className="text-2xl">{card.count}</div>
                <div className="text-sm">{card.label}</div>
              </div>
            </div>
          ))}
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
                className={`transition-all duration-300 ease-in-out border border-[#173D94] rounded-full ml-2 p-1 ${searchVisible ? "w-40 opacity-100" : "w-0 opacity-0 pointer-events-none"}`}
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
                    <td className="px-2 md:px-4 py-2">{payment.tanggalBayar}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">No Data Available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InstruktorDashboard;
