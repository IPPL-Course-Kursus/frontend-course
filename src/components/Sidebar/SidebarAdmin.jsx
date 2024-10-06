import { useState } from 'react';

const Sidebar = () => {
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
        <a href="/admin/dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700">
          Dashboard
        </a>
        <div className="relative">
          <button
            onClick={toggleDataMenu}
            className="w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 flex justify-between items-center"
          >
            Kelola Data
            <span>{isDataMenuOpen ? '▲' : '▼'}</span>
          </button>
          {isDataMenuOpen && (
            <div className="pl-4">
              <a href="/admin/data-kelas" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700">
                Data Kelas
              </a>
              <a href="/admin/data-kategori" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700">
                Data Kategori
              </a>
              <a href="/admin/data-instruktur" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700">
                Data Instruktur
              </a>
            </div>
          )}
        </div>
        <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700">
          Keluar
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
