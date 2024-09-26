import { useState } from "react";
import Profile from "./Profile";
import UbahPassword from "./UbahPassword";
import RiwayatPembayaran from "./RiwayatPembayaran";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const MainProfile = () => {
  const [activeMenu, setActiveMenu] = useState("");

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "profile":
        return <Profile />;
      case "password":
        return <UbahPassword />;
      case "riwayat":
        return <RiwayatPembayaran />;
      case "keluar":
        return (
          <div>
            <h2>Anda telah keluar</h2>
          </div>
        );
      default:
        return <Profile />;
    }
  };

  return (
    <>
    <Navbar/>
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
