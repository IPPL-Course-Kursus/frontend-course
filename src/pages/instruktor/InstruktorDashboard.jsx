import Sidebar from "../../components/Sidebar/SidebarInstruktur";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GrTransaction } from "react-icons/gr";
import { FaUsers, FaSearch, FaFilter } from "react-icons/fa";
import {
  IoArrowBackCircle,
  IoArrowForwardCircle,
  IoBookSharp,
} from "react-icons/io5";
import { instfetchPayments } from "../../redux/actions/instrukturDashboardActions";

const InstruktorDashboard = () => {
  const dispatch = useDispatch();
  const { stats, paymentStatus, loading, user } = useSelector(
    (state) => state.instrukturDashboard
  );

  // State for search input
  const [globalSearch, setGlobalSearch] = useState("");
  const [paymentSearch, setPaymentSearch] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const [filter, setFilter] = useState("");

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // You can change this value to adjust items per page

  // Fetch stats, payment status, kategori status, and user data
  useEffect(() => {
    dispatch(instfetchPayments());
    // dispatch(instfetchkategori());
    // dispatch(instfetchuser());
  }, [dispatch]);

  // Create an array for card data
  const cardData = [
    {
      count: paymentStatus?.transactionCountByType?.Free || 0,
      label: "Free Class",
      color: "bg-primary",
      icon: <IoBookSharp className="text-2xl text-primary" />,
    },
    {
      count: paymentStatus?.transactionCountByType?.Premium || 0,
      label: "Premium Class",
      color: "bg-[#FFD700]",
      icon: <IoBookSharp className="text-2xl text-[#FFD700]" />,
    },
    {
      count: paymentStatus?.totalTransactions || 0,
      label: "Total Transaction",
      color: "bg-[#173D94]",
      icon: <GrTransaction className="text-2xl text-[#173D94]" />,
    },
    // {
    //   count: premiumClassesCount,
    //   label: "Premium Class",
    //   color: "bg-[#0a61aa]",
    // },
  ];
  console.log("ini user", user);

  // Filter payments based on searches and filters
  const filteredPayments = Array.isArray(paymentStatus.transactions)
    ? paymentStatus.transactions.filter((payment) => {
        const isGlobalSearchMatch =
          globalSearch === "" ||
          payment.id.toString().includes(globalSearch.toLowerCase()) ||
          payment.kategori.toLowerCase().includes(globalSearch.toLowerCase()) ||
          payment.kelasPremium
            .toLowerCase()
            .includes(globalSearch.toLowerCase());

        const isPaymentSearchMatch =
          paymentSearch === "" ||
          payment.id.toString().includes(paymentSearch.toLowerCase()) ||
          payment.kategori
            .toLowerCase()
            .includes(paymentSearch.toLowerCase()) ||
          payment.kelasPremium
            .toLowerCase()
            .includes(paymentSearch.toLowerCase()) ||
          payment.tanggalBayar
            .toLowerCase()
            .includes(paymentSearch.toLowerCase());

        const isFilterMatch = filter === "" || payment.paymentStatus === filter;

        return isGlobalSearchMatch && isPaymentSearchMatch && isFilterMatch;
      })
    : [];

  const sortedPayments = filteredPayments.sort((a, b) => a.id - b.id);

  // Get current payments based on pagination
  const indexOfLastPayment = currentPage * itemsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - itemsPerPage;
  const currentPayments = sortedPayments.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );
  console.log("currentPayments", currentPayments);

  const handleFilterChange = (e) => setFilter(e.target.value);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        <div className="grid grid-cols-3 gap-6 mb-8">
          {cardData.map((card, index) => (
            <div
              key={index}
              className={`${card.color} text-white font-semibold p-4 rounded-lg shadow-sm flex items-center justify-center`}
            >
              <div className="bg-white rounded-full p-2">{card.icon}</div>
              <div className="ml-4">
                <div className="text-2xl">{card.count}</div>
                <div className="text-sm">{card.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Table */}
        <div className="flex justify-between items-center mb-4 p-4">
          <h2 className="text-xl font-bold">Transaksi Kursus Instruktur</h2>
          <div className="flex items-center">
            <div className="relative mr-2">
              <select
                value={filter}
                onChange={handleFilterChange}
                className="p-1 border border-[#173D94] rounded-full text-sm text-[#173D94]"
              >
                <option value="">Filter</option>
                <option value="settlement">Sudah Bayar</option>
                <option value="cancel">cancel</option>
              </select>
              <FaFilter className="absolute right-4 top-2 text-[#173D94] text-sm" />
            </div>
          </div>
        </div>

        {/* Payment Status Table */}
        <div className="overflow-x-auto bg-white p-4">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left text-xs md:text-sm font-semibold">
                <th className="px-2 md:px-4 py-2">ID</th>
                <th className="px-2 md:px-4 py-2">Order ID</th>
                <th className="px-2 md:px-4 py-2">Nama Kursus</th>
                <th className="px-2 md:px-4 py-2">Harga</th>
                <th className="px-2 md:px-4 py-2">Status</th>
                <th className="px-2 md:px-4 py-2">Metode Pembayaran</th>
                <th className="px-2 md:px-4 py-2">Tanggal Transaksi</th>
              </tr>
            </thead>
            <tbody>
              {!loading && currentPayments.length > 0 ? (
                currentPayments.map((payment) => (
                  <tr key={payment.id} className="border-b">
                    <td className="px-2 md:px-4 py-2">{payment.id}</td>
                    <td className="px-2 md:px-4 py-2">{payment.orderId}</td>
                    <td className="px-2 md:px-4 py-2">{payment.courseName}</td>
                    <td className="px-2 md:px-4 py-2">
                      Rp.{payment.totalPrice},00
                    </td>
                    <td className="px-2 md:px-4 py-2">
                      {payment.paymentStatus}
                    </td>
                    <td className="px-2 md:px-4 py-2">
                      {payment.paymentMethod}
                    </td>
                    <td className="px-2 md:px-4 py-2">
                      {new Date(payment.createdAt).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No Data Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              className={`flex items-center py-2 px-4 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#0a61aa] text-white"
              } transition-all duration-300 hover:scale-105`}
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <IoArrowBackCircle className="mr-2 text-xl" />
              Previous
            </button>

            <span className="text-lg font-semibold">
              Page {currentPage} of{" "}
              {Math.ceil(sortedPayments.length / itemsPerPage)}
            </span>

            <button
              className={`flex items-center py-2 px-4 rounded-lg ${
                currentPage === Math.ceil(sortedPayments.length / itemsPerPage)
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#0a61aa] text-white"
              } transition-all duration-300 hover:scale-105`}
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(sortedPayments.length / itemsPerPage)
              }
            >
              Next
              <IoArrowForwardCircle className="ml-2 text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstruktorDashboard;
