// src/components/SidebarAdmin.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const SidebarInstruktur = () => {
  const [isDataMenuOpen, setIsDataMenuOpen] = useState(false);

  const toggleDataMenu = () => {
    setIsDataMenuOpen(!isDataMenuOpen);
  };

  return (
    <div className="h-screen w-64 bg-blue-900 text-white flex flex-col">
      <div className="flex items-center justify-center h-20">
        <h1 className="text-2xl font-bold">LOGO</h1>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        <Link to="/inst/dashboard">
          <span
            // href="/inst/dashboard"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
          >
            Dashboard
          </span>
        </Link>
        <div className="relative">
          <button
            onClick={toggleDataMenu}
            className="w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 flex justify-between items-center"
          >
            Kelola Data
            <span>{isDataMenuOpen ? "▲" : "▼"}</span>
          </button>
          {isDataMenuOpen && (
            <div className="pl-4">
              <Link to="/inst/data-kelas">
                <span
                  // href="/inst/data-kelas"
                  className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
                >
                  Data Kelas
                </span>
              </Link>
              <Link to="">
                <span
                  // href="/admin/data-kategori"
                  className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
                >
                  Data Kategori
                </span>
              </Link>
            </div>
          )}
        </div>
        <div className="relative">
          <Link to="/inst/profile">
            <span className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700">
              Profile Instruktur
            </span>
          </Link>
        </div>
        <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700">
          Keluar
        </a>
      </nav>
    </div>
  );
};

export default SidebarInstruktur;
