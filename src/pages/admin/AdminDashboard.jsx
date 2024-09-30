import { useState } from "react";
import { FaUsers, FaSearch, FaFilter } from "react-icons/fa";

const AdminDashboard = () => {
  const [stats] = useState({
    users: 450,
    instruktor: 25,
    freeClass: 20,
    premiumClass: 20,
  });

  // State untuk search input 
  const [globalSearch, setGlobalSearch] = useState("");
  const [paymentSearch, setPaymentSearch] = useState("");

  // State untuk filter status pembayaran
  const [filter, setFilter] = useState("");

  // State untuk status pembayaran
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

  // Filter berdasarkan search input dan filter status pembayaran
  const filteredPayments = paymentStatus.filter(
    (payment) =>
      payment.id.toLowerCase().includes(paymentSearch.toLowerCase()) &&
      (filter === "" || payment.status === filter)
  );

  // Fungsi untuk menangani perubahan filter status pembayaran
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="p-6 bg-secondary min-h-screen font-poppins">
      {/* Header - Hi Admin */}
      <div className="bg-[#F3F7FB] p-4 flex justify-between items-center mb-4 shadow-sm">
        <h1 className="text-2xl font-bold text-[#173D94]">Hi, Admin!</h1>

        {/* Search Bar Global */}
        <div className="relative flex items-center bg-white rounded-full shadow-md">
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

      {/* Cards Users */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-primary text-white p-4 rounded-lg shadow-sm flex items-center justify-center">
          <div className="bg-white rounded-full p-2">
            <FaUsers className="text-2xl text-primary" />
          </div>
          <div className="ml-4">
            <div className="text-2xl">{stats.users}</div>
            <div className="text-sm">Users</div>
          </div>
        </div>

        {/* Cards Instruktor */}
        <div className="bg-success text-white p-4 rounded-lg shadow-sm flex items-center justify-center">
          <div className="bg-white rounded-full p-2">
            <FaUsers className="text-2xl text-primary" />
          </div>
          <div className="ml-4">
            <div className="text-2xl">{stats.instruktor}</div>
            <div className="text-sm">Instruktor</div>
          </div>
        </div>

        {/* Cards Free Class */}
        <div className="bg-[#173D94] text-white p-4 rounded-lg shadow-sm flex items-center justify-center">
          <div className="bg-white rounded-full p-2">
            <FaUsers className="text-2xl text-primary" />
          </div>
          <div className="ml-4">
            <div className="text-2xl">{stats.freeClass}</div>
            <div className="text-sm">Free Class</div>
          </div>
        </div>

        {/* Cards Premium Class */}
        <div className="bg-[#173D94] text-white p-4 rounded-lg shadow-sm flex items-center justify-center">
          <div className="bg-white rounded-full p-2">
            <FaUsers className="text-2xl text-primary" />
          </div>
          <div className="ml-4">
            <div className="text-2xl">{stats.premiumClass}</div>
            <div className="text-sm">Premium Class</div>
          </div>
        </div>
      </div>

      {/* Section untuk Status Pembayaran */}
      <div className="flex justify-between items-center mb-4">
        {/* Judul Status Pembayaran */}
        <h2 className="text-xl font-bold">Status Pembayaran</h2>

        {/* Filter Dropdown dan Search Icon */}
        <div className="flex items-center">
          {/* Filter Dropdown */}
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
            <FaFilter className="absolute right-4 top3-2 text-[#173D94] text-sm" />
          </div>

          {/* Search Icon untuk Status Pembayaran */}
          <div className="flex items-center">
            <FaSearch className="text-[#173D94] text-lg cursor-pointer" />
            <input
              type="text"
              value={paymentSearch}
              onChange={(e) => setPaymentSearch(e.target.value)}
              className="p-1 border border-[#173D94] rounded-full w-10"
            />
          </div>
        </div>
      </div>

      {/* Tabel Status Pembayaran */}
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
            {filteredPayments.map((payment, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{payment.id}</td>
                <td className="px-4 py-2">{payment.kategori}</td>
                <td className="px-4 py-2">{payment.kelasPremium}</td>
                <td
                  className={`px-4 py-2 font-bold ${
                    payment.status === "SUDAH BAYAR" ? "text-success" : "text-failed"
                  }`}
                >
                  {payment.status}
                </td>
                <td className="px-4 py-2">{payment.metodePembayaran}</td>
                <td className="px-4 py-2">{payment.tanggalBayar}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
