import { useState } from "react";
import Profile from "./Profile";
import UbahPassword from "./UbahPassword";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import RiwayatPembayaran from "./RiwayatPembayaran";
import { useDispatch } from "react-redux"; // Import useDispatch dari Redux
import { logout } from "../../redux/actions/authActions"; // Import aksi logout
import { useNavigate } from "react-router-dom"; // Import useNavigate untuk navigasi
import { FaBars } from "react-icons/fa"; // Import icon untuk hamburger menu
import Swal from "sweetalert2";

const MainProfile = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State untuk toggle sidebar pada mobile
  const dispatch = useDispatch(); // Inisialisasi dispatch
  const navigate = useNavigate(); // Inisialisasi navigate

  const handleMenuClick = (menu) => {
    if (menu === "keluar") {
      // Menampilkan konfirmasi logout menggunakan SweetAlert2
      Swal.fire({
        title: "Konfirmasi Logout",
        text: "Apakah Anda yakin ingin keluar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Logout",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(logout()); // Panggil aksi logout dari Redux
          navigate("/login"); // Arahkan pengguna ke halaman login
        }
      });
    } else {
      setActiveMenu(menu); // Set menu aktif sesuai pilihan
    }
    setIsSidebarOpen(false); // Tutup sidebar setelah memilih menu
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "profile":
        return <Profile />;
      case "password":
        return <UbahPassword />;
      case "riwayat":
        return <RiwayatPembayaran />;
      default:
        return <Profile />;
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        {/* Hamburger Button for mobile */}
        <button
          className="sm:hidden text-gray-600 mb-4 focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars size={24} />
        </button>

        <div className="flex flex-col sm:flex-row bg-gray-100 shadow-md text-black rounded-3xl h-full w-full">
          {/* Sidebar */}
          <div
            className={`px-4 py-4 sm:py-8 sm:w-1/6 ${isSidebarOpen ? "block" : "hidden"} sm:block`}
          >
            <h1
              className={`text-md cursor-pointer border-b-2 py-2 ${
                activeMenu === "profile" ? "text-blue-600 font-bold" : ""
              }`}
              onClick={() => handleMenuClick("profile")}
            >
              Profile Saya
            </h1>
            <h1
              className={`text-md cursor-pointer border-b-2 py-2 ${
                activeMenu === "password" ? "text-blue-600 font-bold" : ""
              }`}
              onClick={() => handleMenuClick("password")}
            >
              Ubah Password
            </h1>
            <h1
              className={`text-md cursor-pointer border-b-2 py-2 ${
                activeMenu === "riwayat" ? "text-blue-600 font-bold" : ""
              }`}
              onClick={() => handleMenuClick("riwayat")}
            >
              Riwayat Pembayaran
            </h1>
            <h1
              className={`text-md cursor-pointer border-b-2 py-2 ${
                activeMenu === "keluar" ? "text-blue-600 font-bold" : ""
              }`}
              onClick={() => handleMenuClick("keluar")}
            >
              Keluar
            </h1>
          </div>

          {/* Main content */}
          <div className="bg-white shadow-lg p-8 rounded-3xl w-full sm:w-3/4 lg:w-full lg:items-center">
            {renderContent()}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainProfile;
