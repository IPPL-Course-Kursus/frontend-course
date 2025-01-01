import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions/authActions";
import { IoClose } from "react-icons/io5"; // Import the close icon
import Swal from "sweetalert2";

const SidebarAdmin = ({ sidebarOpen, setSidebarOpen }) => {
  const [isDataMenuOpenKelas, setIsDataMenuOpenKelas] = useState(false);
  const [isDataMenuOpenInstruktur, setIsDataMenuOpenInstruktur] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDataKelas = () => {
    setIsDataMenuOpenKelas(!isDataMenuOpenKelas);
  };

  const toggleDataInstruktur = () => {
    setIsDataMenuOpenInstruktur(!isDataMenuOpenInstruktur);
  };

  const handleLogout = () => {
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
        dispatch(logout());
        navigate("/login");
      }
    });
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out bg-blue-900 text-white w-64 z-50 md:static md:translate-x-0`}
      >
        

        {/* Sidebar Content */}
        <div className="flex flex-col h-full">
          {/* Logo or Branding */}
          <div className="flex items-center justify-center h-20">
            <h1 className="text-2xl font-bold">Etam Course</h1>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-2 py-4 space-y-2">
            <Link
              to="/admin/dashboard"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
              onClick={() => setSidebarOpen(false)} // Close sidebar on link click (mobile)
            >
              Dashboard
            </Link>

            {/* Kelola Data Section */}
            <div className="relative">
              <button
                onClick={toggleDataKelas}
                className="w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 flex justify-between items-center focus:outline-none"
              >
                Kelola Data
                <span>{isDataMenuOpenKelas ? "▲" : "▼"}</span>
              </button>
              {isDataMenuOpenKelas && (
                <div className="pl-4">
                  <Link
                    to="/admin/data-kelas"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
                    onClick={() => setSidebarOpen(false)}
                  >
                    Data Kelas
                  </Link>
                  <Link
                    to="/admin/data-kategori"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
                    onClick={() => setSidebarOpen(false)}
                  >
                    Data Kategori
                  </Link>
                  <Link
                    to="/admin/data-level"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
                    onClick={() => setSidebarOpen(false)}
                  >
                    Data Level
                  </Link>
                  <Link
                    to="/admin/data-type"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
                    onClick={() => setSidebarOpen(false)}
                  >
                    Data Type
                  </Link>
                  <Link
                    to="/admin/data-interpreter"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
                    onClick={() => setSidebarOpen(false)}
                  >
                    Data Bahasa Interpreter
                  </Link>
                </div>
              )}
            </div>

            {/* Kelola Instruktur Section */}
            <div className="relative">
              <button
                onClick={toggleDataInstruktur}
                className="w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 flex justify-between items-center focus:outline-none"
              >
                Kelola Instruktur
                <span>{isDataMenuOpenInstruktur ? "▲" : "▼"}</span>
              </button>
              {isDataMenuOpenInstruktur && (
                <div className="pl-4">
                  <Link
                    to="/admin/data-instruktur"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
                    onClick={() => setSidebarOpen(false)}
                  >
                    Data Instruktur
                  </Link>
                </div>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 flex justify-between items-center focus:outline-none"
            >
              Keluar
            </button>
          </nav>
        </div>
      </div>
    </>
    );
    };

    SidebarAdmin.propTypes = {
      sidebarOpen: PropTypes.bool.isRequired,
      setSidebarOpen: PropTypes.func.isRequired,
    };

    export default SidebarAdmin;
