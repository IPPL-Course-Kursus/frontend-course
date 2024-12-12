import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions/authActions";

const Sidebar = () => {
  const [isDataMenuOpenKelas, setIsDataMenuOpenKelas] = useState(false);
  const [isDataMenuOpenInstruktur, setIsDataMenuOpenInstruktur] =
    useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleDataKelas = () => {
    setIsDataMenuOpenKelas(!isDataMenuOpenKelas);
  };

  const toggleDataInstruktur = () => {
    setIsDataMenuOpenInstruktur(!isDataMenuOpenInstruktur);
  };
  const handleLogout = () => {
    dispatch(logout()); // Dispatch action logout
    navigate("/login"); // Arahkan pengguna ke halaman login
  };

  return (
    <div className="h-full min-h-screen w-64 bg-blue-900 text-white flex flex-col">
      <div className="flex items-center justify-center h-20">
        <h1 className="text-2xl font-bold">Etam Course</h1>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        <a
          href="/admin/dashboard"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
        >
          Dashboard
        </a>

        {/* Kelola Data Section */}
        <div className="relative">
          <button
            onClick={toggleDataKelas}
            className="w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 flex justify-between items-center"
          >
            Kelola Data
            <span>{isDataMenuOpenKelas ? "▲" : "▼"}</span>
          </button>
          {isDataMenuOpenKelas && (
            <div className="pl-4">
              <a
                href="/admin/data-kelas"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
              >
                Data Kelas
              </a>
              <a
                href="/admin/data-kategori"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
              >
                Data Kategori
              </a>
              <a
                href="/admin/data-level"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
              >
                Data Level
              </a>
              <a
                href="/admin/data-type"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
              >
                Data Type
              </a>
              <a
                href="/admin/data-interpreter"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
              >
                Data Bahasa Interpreter
              </a>
            </div>
          )}
        </div>

        {/* Kelola Instruktur Section */}
        <div className="relative">
          <button
            onClick={toggleDataInstruktur}
            className="w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 flex justify-between items-center"
          >
            Kelola Instruktur
            <span>{isDataMenuOpenInstruktur ? "▲" : "▼"}</span>
          </button>
          {isDataMenuOpenInstruktur && (
            <div className="pl-4">
              <a
                href="/admin/data-instruktur"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
              >
                Data Instruktur
              </a>
              {/* <a
                href="/admin/regis-instruktur"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
              >
                Register Instruktur
              </a> */}
            </div>
          )}
        </div>

        {/* Logout Section */}

        <button
          onClick={handleLogout}
          className="w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 flex justify-between items-center"
        >
          {/* Uncomment if using icon */}
          {/* <AiOutlineLogout className='w-20 h-20' /> */}
          Keluar
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
