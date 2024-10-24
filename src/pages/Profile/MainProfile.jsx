import { useState } from "react";
import Profile from "./Profile";
import UbahPassword from "./UbahPassword";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import RiwayatPembayaran from "./RiwayatPembayaran";
import { useDispatch } from "react-redux"; // Import useDispatch dari Redux
import { logout } from "../../redux/actions/authActions"; // Import aksi logout
import { useNavigate } from "react-router-dom"; // Import useNavigate untuk navigasi

const MainProfile = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const dispatch = useDispatch(); // Inisialisasi dispatch
  const navigate = useNavigate(); // Inisialisasi navigate

  const handleMenuClick = (menu) => {
    if (menu === "keluar") {
      // Jika user memilih keluar, lakukan dispatch logout dan navigasi
      dispatch(logout()); // Panggil aksi logout dari Redux
      navigate("/login"); // Arahkan pengguna ke halaman login
    } else {
      setActiveMenu(menu); // Set menu aktif sesuai pilihan
    }
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
        {/* Sidebar */}
        <div className="flex bg-gray-100 shadow-md text-black rounded-3xl h-full w-full p-8">
          <div className="px-4">
            <h1
              className={`text-md cursor-pointer border-b-2 py-2 px ${
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

          <div className="bg-white shadow-lg p-8 rounded-3xl w-full">{renderContent()}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainProfile;
