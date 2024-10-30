import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUsers, FaSearch, FaFilter, FaBars } from "react-icons/fa";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import SideBar from "../../components/Sidebar/SidebarAdmin";
import {
  fetchStats,
  fetchPayments,
  fetchuser,
} from "../../redux/actions/adminDashboardActions";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { paymentStatus,  user } = useSelector(
    (state) => state.adminDashboard
  );

  const [paymentSearch, setPaymentSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchStats());
    dispatch(fetchPayments());
    dispatch(fetchuser());
  }, [dispatch]);

  const freeClassesCount = paymentStatus.filter(
    (payment) => payment.paymentMethod === "Free"
  ).length;
  const premiumClassesCount = paymentStatus.filter(
    (payment) => payment.paymentMethod !== "Free"
  ).length;

  const filteredPayments = paymentStatus.filter((payment) => {
    const isPaymentSearchMatch =
      paymentSearch === "" ||
      (payment.id &&
        payment.id.toString().includes(paymentSearch.toLowerCase())) ||
      (payment.courseName &&
        payment.courseName
          .toLowerCase()
          .includes(paymentSearch.toLowerCase())) ||
      (payment.paymentMethod &&
        payment.paymentMethod
          .toLowerCase()
          .includes(paymentSearch.toLowerCase()));

    const isFilterMatch = filter === "" || payment.paymentStatus === filter;

    return isPaymentSearchMatch && isFilterMatch;
  });

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
  const toggleSearch = () => setSearchVisible((prev) => !prev);

  return (
    <div className="flex min-h-screen">
      <div
        className={`fixed inset-0 z-50 transition-transform transform bg-white md:relative md:translate-x-0 md:bg-transparent h-screen flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SideBar />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col p-4 md:p-6 bg-secondary min-h-screen">
        <div className="fixed top-0 right-0 w-full md:w-auto md:left-[255px] bg-[#F3F7FB] p-6 flex justify-between items-center shadow-sm z-30">
          <button
            className="text-[#0a61aa] md:hidden"
            onClick={() => setSidebarOpen((prev) => !prev)}
          >
            <FaBars className="text-2xl" />
          </button>

          <h1 className="text-2xl font-bold text-[#173D94]">Hi, Admin!</h1>
        </div>

        <div className="mt-[80px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { count: user.userCount, label: "Users", color: "bg-primary" },
            {
              count: user.instrukturCount,
              label: "Instruktor",
              color: "bg-success",
            },
            {
              count: freeClassesCount,
              label: "Free Class",
              color: "bg-[#173D94]",
            },
            {
              count: premiumClassesCount,
              label: "Premium Class",
              color: "bg-[#173D94]",
            },
          ].map(({ count, label, color }) => (
            <div
              key={label}
              className={`${color} text-white font-semibold p-4 rounded-lg shadow-sm flex items-center`}
            >
              <div className="bg-white rounded-full p-2">
                <FaUsers className="text-2xl text-primary" />
              </div>
              <div className="ml-4">
                <div className="text-2xl">{count}</div>
                <div className="text-sm">{label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
          <h2 className="mt-4 text-lg md:text-xl font-bold text-neutral05">
            Status Pembayaran
          </h2>

          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
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
                placeholder="Cari"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto bg-white p-4 mt-2">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left text-xs md:text-sm font-semibold">
                <th className="px-2 md:px-4 py-2">ID</th>
                <th className="px-2 md:px-4 py-2">Nama Kursus</th>
                <th className="px-2 md:px-4 py-2">Harga</th>
                <th className="px-2 md:px-4 py-2">Status</th>
                <th className="px-2 md:px-4 py-2">Metode Pembayaran</th>
                <th className="px-2 md:px-4 py-2">Waktu Transaksi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPayments.map((payment) => (
                <tr key={payment.id} className="border-b">
                  <td className="px-2 md:px-4 py-2">{payment.id}</td>
                  <td className="px-2 md:px-4 py-2">{payment.courseName}</td>
                  <td className="px-2 md:px-4 py-2">
                    Rp. {payment.totalPrice}
                  </td>
                  <td className="px-2 md:px-4 py-2">{payment.paymentStatus}</td>
                  <td className="px-2 md:px-4 py-2">{payment.paymentMethod}</td>
                  <td className="px-2 md:px-4 py-2">{payment.updatedAt}</td>
                </tr>
              ))}
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
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              <IoArrowBackCircle className="mr-2 text-xl" />
              Previous
            </button>

            <span className="text-lg font-semibold">
              Page {currentPage} of {totalPages}
            </span>

            <button
              className={`flex items-center py-2 px-4 rounded-lg ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#0a61aa] text-white"
              } transition-all duration-300 hover:scale-105`}
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
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

export default AdminDashboard;