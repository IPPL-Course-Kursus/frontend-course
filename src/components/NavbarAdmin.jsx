import React from "react";
import { FaBars } from "react-icons/fa"; // Pastikan untuk mengimpor FaBars dari react-icons

const NavbarAdmin = ({ title = "Hi, Admin!", setSidebarOpen }) => {
  return (
    <div className="fixed top-0 right-0 w-full md:w-auto md:left-[255px] bg-[#F3F7FB] p-6 flex justify-between items-center shadow-sm z-30">
      <button
        className="text-[#0a61aa] md:hidden"
        onClick={() => setSidebarOpen((prev) => !prev)}
      >
        <FaBars className="text-2xl" />
      </button>
      <h1 className="text-2xl font-bold text-[#173D94] md:ml-4">{title}</h1>
    </div>
  );
};

export default NavbarAdmin;