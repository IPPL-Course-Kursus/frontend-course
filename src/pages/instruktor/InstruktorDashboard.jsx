import Sidebar from "../../components/Sidebar/SidebarInstruktur";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GrTransaction } from "react-icons/gr";
import { FaFilter } from "react-icons/fa";
import { IoArrowBackCircle, IoArrowForwardCircle, IoBookSharp } from "react-icons/io5";
import { instfetchPayments } from "../../redux/actions/instrukturDashboardActions";
import { IoIosInformationCircle } from "react-icons/io";

import HeadInstruktur from "../../components/InstrukturComponents/HeadInstruktur";

const InstruktorDashboard = () => {
  const dispatch = useDispatch();
  const { paymentStatus, loading } = useSelector((state) => state.instrukturDashboard);

  const [filter, setFilter] = useState("disable");
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // You can change this value to adjust items per page

  // Fetch stats, payment status, kategori status, and user data
  useEffect(() => {
    dispatch(instfetchPayments());
  }, [dispatch]);

  // Create an array for card data
  const cardData = [
    {
      count: paymentStatus?.transactionCountByType?.Free || 0,
      label: "Free Class",
      color: "bg-primary",
      info: <IoIosInformationCircle className="w-6 h-6" />,
      icon: <IoBookSharp className="text-2xl text-primary" />,
    },
    {
      count: paymentStatus?.transactionCountByType?.Premium || 0,
      label: "Premium Class",
      color: "bg-primary",
      info: <IoIosInformationCircle className="w-6 h-6" />,
      icon: <IoBookSharp className="text-2xl text-primary text-center items-center" />,
    },
    {
      count: paymentStatus?.totalTransactions || 0,
      label: "Total Transaction",
      color: "bg-primary",
      info: <IoIosInformationCircle className="w-6 h-6" />,
      icon: <GrTransaction className="text-2xl text-[#173D94]" />,
    },
  ];

  // Filter payments based on searches and filters
  const filteredPayments = Array.isArray(paymentStatus.transactions)
    ? paymentStatus.transactions.filter((payment) => {
        return filter === "disable" || filter === "" || payment.paymentStatus === filter;
      })
    : [];

  const sortedPayments = filteredPayments.sort((a, b) => a.id - b.id);

  // Get current payments based on pagination
  const indexOfLastPayment = currentPage * itemsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - itemsPerPage;
  const currentPayments = sortedPayments.slice(indexOfFirstPayment, indexOfLastPayment);
  console.log("currentPayments", currentPayments);

  const handleFilterChange = (e) => setFilter(e.target.value);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 bg-secondary min-h-screen w-screen font-poppins">
        {/* Header */}
        <div className="bg-[#F3F7FB] p-4 flex justify-between items-center mb-4 shadow-sm">
          <HeadInstruktur />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-10 mb-8">
          {cardData.map((card, index) => (
            <div
              key={index}
              className={`${card.color} text-white font-semibold p-4 rounded-lg shadow-sm flex items-center justify-start`}
            >
              {/* Icon info di sebelah kiri */}
              <div className="mr-10 -mt-10">{card.info}</div>

              {/* Icon utama */}
              <div className="bg-white rounded-full p-2 ml-10">{card.icon}</div>

              <div className="ml-4">
                <div className="flex items-center text-2xl">{card.count}</div>
                <div className="text-sm">{card.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Table */}
        <div className="flex justify-between items-center mb-4 p-4">
          <h2 className="text-xl font-bold">Transaksi Kursus Instruktur</h2>
          <div className="flex items-center">
            <div className="relative inline-block">
              <select
                value={filter}
                onChange={handleFilterChange}
                className="flex items-center py-2 pl-10 pr-4 bg-[#0a61aa] text-white font-semibold rounded-md text-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#0a61aa] focus:ring-opacity-50"
              >
                <option value="disable">Filter</option>
                <option value="settlement">Sudah Bayar</option>
                <option value="pending">Belum Bayar</option>
                <option value="cancel">cancel</option>
              </select>
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-sm" />
            </div>
          </div>
        </div>

        {/* Payment Status Table */}
        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left text-sm md:text-base font-semibold">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Kategori</th>
                <th className="px-4 py-3">Nama Kursus</th>
                <th className="px-4 py-3">Harga</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Metode Pembayaran</th>
                <th className="px-4 py-3">Tanggal Transaksi</th>
              </tr>
            </thead>
            <tbody>
              {!loading && currentPayments.length > 0 ? (
                currentPayments.map((payment, index) => {
                  const rowNumber = (currentPage - 1) * itemsPerPage + index + 1;

                  const statusClass =
                    payment.paymentStatus === "settlement"
                      ? "bg-green-100 text-green-700"
                      : payment.paymentStatus === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700";

                  return (
                    <tr
                      key={payment.id}
                      className="border-b hover:bg-gray-50 transition-colors text-sm md:text-base"
                    >
                      <td className="px-4 py-3">{rowNumber}</td>
                      <td className="px-4 py-3 font-medium text-gray-800">{payment.orderId}</td>
                      <td className="px-4 py-3">{payment.categoryName}</td>
                      <td className="px-4 py-3">{payment.courseName}</td>
                      <td className="px-4 py-3 text-gray-900 font-semibold">
                        Rp.{payment.totalPrice.toLocaleString("id-ID")},00
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-lg font-semibold text-sm ${statusClass}`}
                        >
                          {payment.paymentStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3">{payment.paymentMethod}</td>
                      <td className="px-4 py-3 text-gray-600">
                        {new Date(payment.createdAt).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    Tidak ada data yang tersedia
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Kontrol Pagination */}
          {sortedPayments.length > itemsPerPage && (
            <div className="flex flex-col md:flex-row justify-between items-center mt-6">
              <button
                className={`flex items-center py-2 px-5 rounded-md text-sm md:text-base font-semibold ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                } transition-all`}
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <IoArrowBackCircle className="mr-2 text-xl" />
                Pervious
              </button>

              <span className="text-sm md:text-lg font-semibold mt-4 md:mt-0">
                Halaman {currentPage} dari {Math.ceil(sortedPayments.length / itemsPerPage)}
              </span>

              <button
                className={`flex items-center py-2 px-5 rounded-md text-sm md:text-base font-semibold ${
                  currentPage === Math.ceil(sortedPayments.length / itemsPerPage)
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                } transition-all`}
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(sortedPayments.length / itemsPerPage)}
              >
                Next
                <IoArrowForwardCircle className="ml-2 text-xl" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstruktorDashboard;
