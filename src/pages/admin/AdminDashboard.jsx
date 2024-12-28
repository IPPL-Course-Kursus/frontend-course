import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUsers, FaFilter, FaMoneyBillWave, FaWallet, FaCreditCard } from "react-icons/fa";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import SideBar from "../../components/Sidebar/SidebarAdmin";
import NavbarAdmin from "../../components/NavbarAdmin";
import { fetchStats, fetchPayments, fetchuser } from "../../redux/actions/adminDashboardActions";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { stats, paymentStatus = [], loading, user } = useSelector((state) => state.adminDashboard);

  const [filter, setFilter] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchStats());
    dispatch(fetchPayments());
    dispatch(fetchuser());
  }, [dispatch]);

  useEffect(() => {
    console.log("paymentStatus:", paymentStatus);
    console.log("User Data:", user);
  }, [paymentStatus, user]);
  
  // Melakukan operasi filter berdasarkan paymentMethod
  const freeClassesCount = paymentStatus.filter((payment) => payment.price === 0).length;
  const premiumClassesCount = paymentStatus.filter((payment) => payment.price >0).length;
  
  // Melakukan filter berdasarkan paymentStatus
  const filteredPayments = paymentStatus.filter((payment) => {
    return filter === "" || payment.paymentStatus === filter;
  });

  console.log("paymentStatus:", paymentStatus);
  console.log(paymentStatus); // Cek keseluruhan objek paymentStatus
  console.log(paymentStatus.data); // Cek objek data yang berisi informasi

  const sortedPayments = filteredPayments.sort((a, b) => a.id - b.id);

  const totalPages = Math.ceil(sortedPayments.length / itemsPerPage);
  const paginatedPayments = sortedPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFilterChange = (e) => setFilter(e.target.value);

  const formatTransactionTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("id-ID", { 
      day: "numeric", 
      month: "short", 
      year: "numeric", 
      hour: "2-digit", 
      minute: "2-digit"
    });
  };

  // Sidebar 
  return (
    <div className="flex">
      <div
        className={`fixed inset-y-0 z-50 w-64 min-h-screen transform bg-white transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md: relative md: translate-x-0`}
      >
        <SideBar />
      </div>

      {/* {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )} */}
      
      <div className="flex-1 flex flex-col p-4 md:p-6 bg-secondary min-h-screen">
        <NavbarAdmin setSidebarOpen={setSidebarOpen} />


      {/* Kolom atas */}
      <div className="mt-[80px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[{ count: user.userCount, label: "Users", color: "bg-[#173D94]" },
        { count: user.instrukturCount, label: "Instruktor", color: "bg-primary" },
        { count: freeClassesCount, label: "Free Class", color: "bg-[#173D94]" },
        { count: premiumClassesCount, label: "Premium Class", color: "bg-primary" }]
        .map(({ count, label, color }) => (
          <div key={label} className={`${color} text-white font-semibold p-4 rounded-lg shadow-sm flex items-center`}>
            <div className="bg-white rounded-full p-2">
              <FaUsers className="text-2xl text-primary" />
            </div>
            <div className="ml-4">
              <div className="text-2xl">
                {label === "Total Transaksi" 
                  ? `Rp. ${count.toLocaleString("id-ID")},00` 
                  : count}
              </div>
              <div className="text-sm">{label}</div>
            </div>
          </div>
        ))}
        </div>
      
      {/* Kolom bawah */}
      <div className="mt-[5px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {[{ 
          count: sortedPayments
          .filter(payment => payment.paymentStatus === "settlement")
          .reduce((total, payment) => total + payment.totalPrice, 0), 
          label: "Total Transaksi", 
          color: "bg-success",
          icon: <FaMoneyBillWave className="text-2xl text-primary" />
        },
        { 
          count: sortedPayments
          .filter(payment => payment.paymentMethod === "qris" && payment.paymentStatus === "settlement")
          .reduce((total, payment) => total + payment.totalPrice, 0),
          label: "QRIS", 
          color: "bg-success",
          icon: <FaWallet className="text-2xl text-primary" />
        },
        { 
          count: sortedPayments
          .filter(payment => payment.paymentMethod === "bank_transfer" && payment.paymentStatus === "settlement")
          .reduce((total, payment) => total + payment.totalPrice, 0),
          label: "Bank Transfer", 
          color: "bg-success",
          icon: <FaCreditCard className="text-2xl text-primary" />
        }]
        .map(({ count, label, color, icon }) => (
          <div key={label} className={`${color} text-white font-semibold p-4 rounded-lg shadow-sm flex items-center justify-items-center lg:col-span-1 col-span-2`}>
             <div className="bg-white rounded-full p-2 ">
                {icon}
              </div>
            <div className="ml-4">
              <div className="text-1xl">
              {label === "Total Transaksi" || label === "QRIS" || label === "Bank Transfer" 
            ? `Rp. ${count.toLocaleString("id-ID")}` 
            : count}
              </div>
              <div className="text-sm">{label}</div>
            </div>
          </div>
        ))}
        </div>
    
        {/* Payment Table */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
          <h2 className="mt-4 text-lg md:text-xl font-bold text-neutral05">Status Pembayaran</h2>

          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
            <div className="relative">
              <select
                value={filter}
                onChange={handleFilterChange}
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
        
       {/* Payment Status Table */}
        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left text-sm md:text-base font-semibold">
                <th className="px-2 md:px-4 py-2">No</th>
                <th className="px-2 md:px-4 py-2">Nama Kursus</th>
                <th className="px-2 md:px-4 py-2">Harga</th>
                <th className="px-2 md:px-4 py-2">Status</th>
                <th className="px-2 md:px-4 py-2">Metode Pembayaran</th>
                <th className="px-2 md:px-4 py-2">Waktu Transaksi</th>
              </tr>
            </thead>
            <tbody>
            {!loading && paginatedPayments.length > 0 ? (
              paginatedPayments.map((payment, index) => {
                const rowNumber = (currentPage - 1) * itemsPerPage + index + 1;

                  const statusClass =
                    payment.paymentStatus === "settlement"
                      ? "bg-green-100 text-green-700"
                      : payment.paymentStatus === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700";

                  return (
                    <tr key={payment.id} className="border-b hover:bg-gray-50 transition-colors text-sm md:text-base">
                      <td className="px-2 md:px-4 py-2">{rowNumber}</td>
                      <td className="px-2 md:px-4 py-2">{payment.courseName}</td>
                      <td className="px-2 md:px-4 py-2 text-gray-900 font-semibold">Rp. {payment.totalPrice.toLocaleString("id-ID")},00</td>
                      <td className="px-2 md:px-4 py-2">
                        <span
                          className={`px-3 py-1 rounded-lg font-semibold text-sm ${statusClass}`}
                        >
                          {payment.paymentStatus}
                        </span>
                      </td>
                      <td className="px-2 md:px-4 py-2">{payment.paymentMethod}</td>
                      <td className="px-2 md:px-4 py-2 text-gray-600">
                        {formatTransactionTime(payment.updatedAt)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  Tidak ada data yang tersedia
                </td>
              </tr>
              )}
            </tbody>
          </table>
        </div>
          
          {/* Pagination Controls */}
          {totalPages > 1 && ( 
            <div className="flex justify-between items-center mt-4">
              <button
                className={`flex items-center py-2 px-4 rounded-lg ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-[#0a61aa] text-white"} transition-all duration-300 hover:scale-105`}
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                <IoArrowBackCircle className="mr-2 text-lg" />
                Previous
              </button>

              {/* Keterangan Page of, dengan auto margin agar tetap di tengah */}
              <span className="text-lg font-semibold mx-auto">
                Page {currentPage} of {totalPages}
              </span>

              {/* Hanya tampilkan tombol Next jika tidak di halaman terakhir */}
              {currentPage < totalPages && (
                <button
                  className="flex items-center py-2 px-4 rounded-lg bg-[#0a61aa] text-white transition-all duration-300 hover:scale-105"
                  onClick={goToNextPage}
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

export default AdminDashboard;