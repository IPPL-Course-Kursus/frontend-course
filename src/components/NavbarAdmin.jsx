import React from "react";

const NavbarAdmin = ({ title = "Hi, Admin!" }) => {
  return (
    <div className="fixed top-0 right-0 w-full md:w-auto md:left-[255px] bg-[#F3F7FB] p-6 flex justify-between items-center shadow-sm z-30">
      <h1 className="text-2xl font-bold text-[#173D94]">{title}</h1>
    </div>
  );
};

export default NavbarAdmin;