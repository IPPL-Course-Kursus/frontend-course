import SidebarInstruktur from "../../components/Sidebar/SidebarInstruktur";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GrTransaction } from "react-icons/gr";
import { FaFilter } from "react-icons/fa";
import {
  IoArrowBackCircle,
  IoArrowForwardCircle,
  IoBookSharp,
} from "react-icons/io5";
import { instfetchPayments } from "../../redux/actions/instrukturDashboardActions";
import { IoIosInformationCircle } from "react-icons/io";
import HeadInstruktur from "../../components/InstrukturComponents/HeadInstruktur";
import { FaMoneyBillWave, FaWallet, FaCreditCard } from "react-icons/fa";
import toast from "react-hot-toast";

const InstruktorDashboard = () => {
  const dispatch = useDispatch();
  const { paymentStatus, loading } = useSelector(
    (state) => state.instrukturDashboard
  );

  const [filter, setFilter] = useState("disable");
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [itemsPerPage] = useState(10);
  const sidebarRef = useRef(null);
  
   // Close sidebar when clicking outside
   useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };
  
    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  useEffect(() => {
    const fetchPaymentsData = async () => {
      try {
        await dispatch(instfetchPayments());
      } catch (error) {
        toast.error("Gagal memuat data pembayaran");
      }
    };
    fetchPaymentsData();
  }, [dispatch]);

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
      color: "bg-primary",
      icon: <IoBookSharp className="text-2xl text-primary text-center items-center" />,
    },
    {
      count: paymentStatus?.totalTransactions || 0,
      label: "Total Transaction",
      color: "bg-primary",
      icon: <GrTransaction className="text-2xl text-[#173D94]" />,
    },
  ];

  const filteredPayments = Array.isArray(paymentStatus.transactions)
    ? paymentStatus.transactions.filter((payment) => {
        return (
          filter === "disable" ||
          filter === "" ||
          payment.paymentStatus === filter
        );
      })
    : [];

  const sortedPayments = filteredPayments.sort((a, b) => a.id - b.id);

  const totalPages = Math.ceil(sortedPayments.length / itemsPerPage);
  const indexOfLastPayment = currentPage * itemsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - itemsPerPage;
  const currentPayments = sortedPayments.slice(indexOfFirstPayment, indexOfLastPayment);

  const totalIncome = paymentStatus.transactions
    ? paymentStatus.transactions
        .filter(payment => payment.paymentStatus === "settlement")
        .reduce((total, payment) => total + payment.totalPrice, 0)
    : 0;

  const totalQRIS = paymentStatus.transactions
    ? paymentStatus.transactions
        .filter(payment => payment.paymentMethod === "qris" && payment.paymentStatus === "settlement")
        .reduce((total, payment) => total + payment.totalPrice, 0)
    : 0;

  const totalBankTransfer = paymentStatus.transactions
    ? paymentStatus.transactions
        .filter(payment => payment.paymentMethod === "bank_transfer" && payment.paymentStatus === "settlement")
        .reduce((total, payment) => total + payment.totalPrice, 0)
    : 0;

  const additionalCardData = [
    {
      count: totalQRIS,
      label: "QRIS",
      color: "bg-[#173D94]",
      icon: <FaWallet className="text-2xl text-primary" />
    },
    {
      count: totalBankTransfer,
      label: "Bank Transfer",
      color: "bg-[#173D94]",
      icon: <FaCreditCard className="text-2xl text-primary" />
    },
    {
      count: totalIncome,
      label: "Total Uang Masuk",
      color: "bg-success",
      icon: <FaMoneyBillWave className="text-2xl text-primary" />
    }
  ];

  const allCardData = [...cardData, ...additionalCardData];

  const handleFilterChange = (e) => setFilter(e.target.value);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatTransactionTime = (time) => {
    const date = new Date(time);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div
        ref={sidebarRef} // Menggunakan useRef di sini
        className={`fixed inset-y-0 z-50 w-64 min-h-screen transform bg-white transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <SidebarInstruktur />
      </div>


      <div className="flex-1 p-4 md:p-6 bg-secondary min-h-screen">
        <HeadInstruktur setSidebarOpen={setSidebarOpen} />


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 pt-20 mb-8">
          {allCardData.map((card, index) => (
            <div
              key={index}
              className={`${card.color} text-white font-semibold p-4 rounded-lg shadow-sm flex items-center`}
            >
              <div className="mr-4 bg-white rounded-full p-2 ml-2">{card.icon}</div>
              <div>
                <div className="text-lg sm:text-md">
                  {card.label === "Total Uang Masuk" ||
                  card.label === "QRIS" ||
                  card.label === "Bank Transfer"
                    ? `Rp ${card.count.toLocaleString("id-ID")}`
                    : card.count}
                </div>
                <div className="text-md">{card.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Dropdown */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
          <h2 className="mt-4 text-lg md:text-xl font-bold text-neutral05">Transaksi Kursus Instruktur</h2>
        
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
            <div className="relative">
              <select
                value={filter}
                onChange={handleFilterChange} // Filter untuk elemen lain yang terpengaruh status
                className="flex items-center py-2 pl-10 pr-4 bg-[#0a61aa] text-white font-semibold rounded-md text-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#0a61aa] focus:ring-opacity-50"
              >
                <option value="">Filter</option>
                <option value="settlement">Settlement</option>
                <option value="pending">Pending</option>
              </select>
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-sm" />
            </div>
          </div>
        </div>

        {/* Payment Table */}
        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-lg">
          {/* Mobile Cards */}
          <div className="block md:hidden space-y-4">
            {currentPayments.map((payment, index) => {
              const rowNumber = (currentPage - 1) * itemsPerPage + index + 1;

              return (
                <div
                  key={payment.id}
                  className="border rounded-md p-4 shadow-sm bg-white w-full"
                >
                  <div className="mb-2 font-semibold text-lg">
                    {rowNumber}. {payment.courseName}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Harga:</span> Rp{" "}
                    {payment.totalPrice.toLocaleString("id-ID")},00
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Status:</span>{" "}
                    <span
                      className={`px-2 py-1 rounded-lg font-semibold text-sm ${
                        payment.paymentStatus === "settlement"
                          ? "bg-green-100 text-green-700"
                          : payment.paymentStatus === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {payment.paymentStatus}
                    </span>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Metode Pembayaran:</span>{" "}
                    {payment.paymentMethod}
                  </div>
                  <div>
                    <span className="font-semibold">Waktu Transaksi:</span>{" "}
                    {formatTransactionTime(payment.updatedAt)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Table */}
          <table className="w-full table-auto md:w-full md:h-full hidden md:table">
            <thead>
              <tr className="bg-gray-200 text-left text-sm md:text-base font-semibold">
                <th className="px-2 md:px-4 py-2">#</th>
                <th className="px-2 md:px-4 py-2">Order ID</th>
                <th className="px-2 md:px-4 py-2">Kategori</th>
                <th className="px-2 md:px-4 py-2">Nama Kursus</th>
                <th className="px-2 md:px-4 py-2">Harga</th>
                <th className="px-2 md:px-4 py-2">Status</th>
                <th className="px-2 md:px-4 py-2">Metode Pembayaran</th>
                <th className="px-2 md:px-4 py-2">Tanggal Transaksi</th>
              </tr>
            </thead>
            <tbody>
              {!loading && currentPayments.length > 0 ? (
                currentPayments.map((payment, index) => {
                  const rowNumber =
                    (currentPage - 1) * itemsPerPage + index + 1;
                  return (
                    <tr key={payment.id} className="border-t">
                      <td className="px-2 py-2 text-sm md:text-base">
                        {rowNumber}
                      </td>
                      <td className="px-2 py-2">{payment.orderId}</td>
                      <td className="px-2 py-2">{payment.categoryName}</td>
                      <td className="px-2 py-2">{payment.courseName}</td>
                      <td className="px-2 py-2 font-bold">
                        Rp{" "}
                        {payment.totalPrice.toLocaleString("id-ID")},00
                      </td>
                      <td className="px-2 py-2">
                        <span
                          className={`px-2 py-1 rounded-lg font-semibold text-sm ${
                            payment.paymentStatus === "settlement"
                              ? "bg-green-100 text-green-700"
                              : payment.paymentStatus === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {payment.paymentStatus}
                        </span>
                      </td>
                      <td className="px-2 py-2">{payment.paymentMethod}</td>
                      <td className="px-2 py-2">
                        {formatTransactionTime(payment.updatedAt)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    Tidak ada transaksi yang ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
            {currentPage > 1 && (
              <button
                className="flex items-center py-2 px-4 rounded-lg bg-[#0a61aa] text-white transition-all duration-300 hover:scale-105"
                onClick={() => paginate(currentPage - 1)}
              >
                <IoArrowBackCircle className="mr-2 text-lg" />
                Previous
              </button>
            )}

            <span className="text-lg font-semibold mx-auto">
              Page {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages && (
              <button
                className="flex items-center py-2 px-4 rounded-lg bg-[#0a61aa] text-white transition-all duration-300 hover:scale-105"
                onClick={() => paginate(currentPage + 1)}
              >
                Next
                <IoArrowForwardCircle className="ml-2 text-lg" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InstruktorDashboard;
