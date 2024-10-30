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
  const { stats, paymentStatus, loading, user } = useSelector(
    (state) => state.adminDashboard
  );

  const [filter, setFilter] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchStats());
    dispatch(fetchPayments());
    dispatch(fetchuser());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredPayments = paymentStatus?.filter((payment) => {
    const isFilterMatch = filter === "" || payment.paymentStatus === filter;

    return isFilterMatch;
  });

  const sortedPayments = filteredPayments?.sort((a, b) => a.id - b.id);

  const totalPages = Math.ceil(sortedPayments.length / itemsPerPage);
  const currentItems = sortedPayments?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const freeClassesCount = paymentStatus.filter(
    (payment) => payment.paymentMethod === "Free"
  ).length;
  const premiumClassesCount = paymentStatus.filter(
    (payment) => payment.paymentMethod !== "Free"
  ).length;

  const handleFilterChange = (e) => setFilter(e.target.value);

  const formatCurrency = (value) => {
    return (
      "Rp " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ",00"
    );
  };

  return (
    <div className="flex">
      <div
        className={`fixed inset-0 z-50 transition-transform transform bg-white md:relative md:translate-x-0 md:bg-transparent ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SideBar />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 p-4 md:p-6 bg-secondary min-h-screen font-poppins">
        <div className="bg-[#F3F7FB] p-4 flex justify-between items-center mb-4 shadow-sm">
          <button
            className="text-[#0a61aa] md:hidden"
            onClick={() => setSidebarOpen((prev) => !prev)}
          >
            <FaBars className="text-2xl" />
          </button>

          <h1 className="text-2xl font-bold text-[#173D94]">Hi, Admin!</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              color: "bg-[#0a61aa]",
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
          <h2 className="text-lg md:text-xl font-bold text-[#0a61aa]">
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
                <option value="cancel">Cancel Bayar</option>
              </select>
              <FaFilter className="absolute right-4 top-2 text-[#173D94] text-sm" />
            </div>
          </div>
        </div>

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
              {!loading && currentItems && currentItems.length > 0 ? (
                currentItems.map((payment) => (
                  <tr key={payment.id} className="border-b">
                    <td className="px-2 md:px-4 py-2">{payment.id}</td>
                    <td className="px-2 md:px-4 py-2">{payment.courseName}</td>
                    <td className="px-2 md:px-4 py-2">
                      {formatCurrency(payment.totalPrice)}
                    </td>
                    <td className="px-2 md:px-4 py-2">
                      {payment.paymentStatus}
                    </td>
                    <td className="px-2 md:px-4 py-2">
                      {payment.paymentMethod}
                    </td>
                    <td className="px-2 md:px-4 py-2">{payment.createdAt}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            className={`flex items-center py-2 px-4 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#0a61aa] text-white"
            }`}
            onClick={() => setCurrentPage((prev) => prev - 1)}
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
            }`}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <IoArrowForwardCircle className="ml-2 text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
