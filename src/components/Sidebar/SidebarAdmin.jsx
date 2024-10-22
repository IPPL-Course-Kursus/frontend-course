import { useState } from "react";
// import { AiOutlineLogout } from "react-icons/ai";

const Sidebar = () => {
  const [isDataMenuOpenKelas, setIsDataMenuOpenKelas] = useState(false);
  const [isDataMenuOpenInstruktur, setIsDataMenuOpenInstruktur] = useState(false);

  const toggleDataKelas = () => {
    setIsDataMenuOpenKelas(!isDataMenuOpenKelas);
  };

  const toggleDataInstruktur = () => {
    setIsDataMenuOpenInstruktur(!isDataMenuOpenInstruktur);
  };

  return (
    <div className="h-screen w-64 bg-blue-900 text-white flex flex-col">
      <div className="flex items-center justify-center h-20">
        <h1 className="text-2xl font-bold">LOGO</h1>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        <a
          href="/admin/dashboard"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
        >
          Dashboard
        </a>
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
                href="/admin/data-kategori"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
              >
                Data Kategori
              </a>
              {/* <a
                href="/admin/data-instruktur"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
              >
                Data Instruktur
              </a> */}
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
            </div>
          )}
        </div>
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
              <a
                href="/admin/regis-instruktur"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
              >
                Register Instruktur
              </a>
              <a
                href="/admin/data-instruktur"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
              >
                Data Level
              </a>
              <a
                href="/admin/data-instruktur"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
              >
                Data Type
              </a>
            </div>
          )}
        </div>
        {/* <div className="relative">
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
                href="/admin/data-kategori"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
              >
                Data Instruktur
              </a>
              <a
                href="/admin/data-instruktur"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
              >
                Register Instruktur
              </a>
              <a
                href="/admin/data-instruktur"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
              >
                Data Level
              </a>
              <a
                href="/admin/data-instruktur"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
              >
                Data Type
              </a>
            </div>
          )}
        </div> */}
        <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700">
          {/* <AiOutlineLogout className='w-20 h-20'/> */}
          keluar
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
