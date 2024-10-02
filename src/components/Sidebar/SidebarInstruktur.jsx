// src/components/SidebarAdmin.jsx
import React, { useState } from 'react';

const SidebarInstruktur = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center justify-between bg-blue-900 text-white p-4">
        <span className="text-xl font-semibold">LOGO</span>
        <button id="mobile-menu-button" className="focus:outline-none" onClick={toggleMobileMenu}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div className={`${isSidebarOpen ? '' : 'hidden'} w-full md:w-64 h-screen bg-blue-900 text-white flex flex-col md:block`}>
        <div className="flex items-center justify-center h-16 border-b border-blue-800 mb-8">
          <span className="text-xl font-semibold">LOGO</span>
        </div>
        <div className="flex-grow">
          <ul className="space-y-0">
            <li className={`sidebar-item px-6 py-3 hover:bg-blue-800 cursor-pointer ${activeItem === 'Dashboard' ? 'bg-black' : ''}`} onClick={() => handleItemClick('Dashboard')}>
              <a href="#dashboard">Dashboard</a>
            </li>
            <li id="kelola-data" className={`sidebar-item px-6 py-3 hover:bg-blue-800 cursor-pointer ${activeItem === 'Kelola Data' ? 'bg-black' : ''}`} onClick={toggleDropdown}>
              <div className="flex items-center justify-between">
                <span>Kelola Data</span>
                <svg id="dropdown-icon" className={`w-4 h-4 transform transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </li>
            <ul id="dropdown-menu" className={`space-y-0 ${isDropdownOpen ? '' : 'hidden'}`}>
              <li className={`sidebar-item dropdown-item px-12 py-3 hover:bg-blue-800 cursor-pointer ${activeItem === 'Data Kelas' ? 'bg-black' : ''}`} onClick={() => handleItemClick('Data Kelas')}>
                <a href="#data-kelas">Data Kelas</a>
              </li>
              <li className={`sidebar-item dropdown-item px-12 py-3 hover:bg-blue-800 cursor-pointer ${activeItem === 'Data Kategori' ? 'bg-black' : ''}`} onClick={() => handleItemClick('Data Kategori')}>
                <a href="#data-kategori">Data Kategori</a>
              </li>
              <li className={`sidebar-item dropdown-item px-12 py-3 hover:bg-blue-800 cursor-pointer ${activeItem === 'Data Instruktur' ? 'bg-black' : ''}`} onClick={() => handleItemClick('Data Instruktur')}>
                <a href="#data-Instruktur">Data Instruktur</a>
              </li>
            </ul>
            <li className={`sidebar-item px-6 py-3 hover:bg-blue-800 cursor-pointer ${activeItem === 'Keluar' ? 'bg-black' : ''}`} onClick={() => handleItemClick('Keluar')}>
              <a href="#keluar">Keluar</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SidebarInstruktur;
