// import { useState, useEffect } from "react";
// import { FaBars } from "react-icons/fa";
// import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAdminCategories } from "../../../redux/actions/adminDataKategoriActions";
// import SidebarInstruktur from "../../../components/Sidebar/SidebarInstruktur";
// import HeadInstruktur from "../../../components/InstrukturComponents/HeadInstruktur";

// const InstrukturDataKategori = () => {
//   const dispatch = useDispatch();

//   // Fetch categories from Redux store
//   const { categories } = useSelector((state) => state.adminDataKategori);

//   useEffect(() => {
//     dispatch(fetchAdminCategories());
//   }, [dispatch]);

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 7;

//   // Sidebar state for mobile
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // Pagination logic: slicing categories for the current page
//   const totalPages = Math.ceil(categories?.length / itemsPerPage);
//   const currentItems = categories?.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <>
//       <div className="flex">
//         {/* Sidebar */}
//         <div
//           className={`fixed inset-0 z-50 transition-transform transform bg-white md:relative md:translate-x-0 md:bg-transparent ${
//             sidebarOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//         >
//           <SidebarInstruktur />
//         </div>

//         {/* Overlay */}
//         {sidebarOpen && (
//           <div
//             className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
//             onClick={() => setSidebarOpen(false)}
//           ></div>
//         )}

//         <div className="flex-1 p-4 md:p-6 bg-secondary min-h-screen font-poppins">
//           {/* header */}
//           <div className="bg-[#F3F7FB] p-4 flex justify-between items-center mb-4 shadow-sm">
//             {/* menu button on mobile */}
//             <button
//               className="text-[#0a61aa] md:hidden"
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//             >
//               <FaBars className="text-2xl" />
//             </button>
//             <HeadInstruktur />
//           </div>

//           {/* Section Data Kategori */}
//           <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
//             <h2 className="flex items-center py-2 px-4 bg-gradient-to-r from-[#FF5722] to-[#FF9800] text-white font-semibold rounded-md text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4">
//               Data Kategori Kelas
//             </h2>
//           </div>

//           {/* Tabel Data Kategori */}
//           <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
//             <table className="min-w-full table-auto">
//               <thead>
//                 <tr className="bg-gray-200 text-left text-xs md:text-sm font-semibold">
//                   <th className="px-2 md:px-4 py-2">ID</th>
//                   {/* <th className="px-2 md:px-4 py-2">Kode Kategori</th> */}
//                   <th className="px-2 md:px-4 py-2">Nama Kategori</th>
//                   <th className="px-2 md:px-4 py-2">Foto</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentItems?.map((category, index) => {
//                   const rowNumber =
//                     (currentPage - 1) * itemsPerPage + index + 1;
//                   return (
//                     <tr key={index} className="border-t text-xs md:text-sm">
//                       <td className="px-2 md:px-4 py-2">{rowNumber}</td>
//                       {/* <td className="px-2 md:px-4 py-2">
//                         {category.categoryCode}
//                       </td> */}
//                       <td className="px-2 md:px-4 py-2">
//                         {category.categoryName}
//                       </td>
//                       <td className="px-2 md:px-4 py-2">
//                         <img
//                           src={category.image}
//                           alt={category.categoryName}
//                           className="w-16 h-16 object-cover rounded-md"
//                         />
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination Controls */}
//           <div className="flex justify-between items-center mt-4">
//             <button
//               className={`flex items-center py-2 px-4 rounded-lg ${
//                 currentPage === 1
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-[#0a61aa] text-white"
//               } transition-all duration-300 hover:scale-105`}
//               onClick={() => setCurrentPage(currentPage - 1)}
//               disabled={currentPage === 1}
//             >
//               <IoArrowBackCircle className="mr-2 text-xl" />
//               Previous
//             </button>

//             <span className="text-lg font-semibold">
//               Page {currentPage} of {totalPages}
//             </span>

//             <button
//               className={`flex items-center py-2 px-4 rounded-lg ${
//                 currentPage === totalPages
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-[#0a61aa] text-white"
//               } transition-all duration-300 hover:scale-105`}
//               onClick={() => setCurrentPage(currentPage + 1)}
//               disabled={currentPage === totalPages}
//             >
//               Next
//               <IoArrowForwardCircle className="ml-2 text-xl" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default InstrukturDataKategori;

import { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminCategories } from "../../../redux/actions/adminDataKategoriActions";
import SidebarInstruktur from "../../../components/Sidebar/SidebarInstruktur";
import HeadInstruktur from "../../../components/InstrukturComponents/HeadInstruktur";
import PropTypes from "prop-types";

const InstrukturDataKategori = () => {
  const dispatch = useDispatch();

  // Fetch categories from Redux store
  const { categories } = useSelector((state) => state.adminDataKategori);

  useEffect(() => {
    dispatch(fetchAdminCategories());
  }, [dispatch]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Sidebar state for mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  // Pagination logic: slicing categories for the current page
  const totalPages = Math.ceil(categories?.length / itemsPerPage) || 1;
  const currentItems = categories?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div
        ref={sidebarRef} // Using useRef here
        className={`fixed inset-y-0 z-50 w-64 min-h-screen transform bg-white transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <SidebarInstruktur />
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className="flex-1 p-4 md:p-6 bg-secondary min-h-screen font-poppins">
        {/* HeadInstruktur with setSidebarOpen prop */}
        <HeadInstruktur setSidebarOpen={setSidebarOpen} />

        {/* Section Data Kategori */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
          <h2 className="flex items-center py-2 px-4 mt-4 bg-gradient-to-r from-[#FF5722] to-[#FF9800] text-white font-semibold rounded-md text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4">
            Data Kategori
          </h2>
        </div>

        {/* Tabel Data Kategori */}
        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-left text-xs md:text-sm font-semibold">
                  <th className="px-2 md:px-4 py-2">No</th>
                  {/* <th className="px-2 md:px-4 py-2">Kode Kategori</th> */}
                  <th className="px-2 md:px-4 py-2">Nama Kategori</th>
                  <th className="px-2 md:px-4 py-2">Foto</th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map((category, index) => {
                  const rowNumber = (currentPage - 1) * itemsPerPage + index + 1;
                  return (
                    <tr
                      key={category.id} // Use unique identifier for key
                      className="border-t text-xs md:text-sm hover:bg-gray-50 transition-all duration-300"
                    >
                      <td className="px-2 md:px-4 py-2 text-left">{rowNumber}</td>
                      {/* <td className="px-2 md:px-4 py-2">{category.categoryCode}</td> */}
                      <td className="px-2 md:px-4 py-2">{category.categoryName}</td>
                      <td className="px-2 md:px-4 py-2">
                        <img
                          src={category.image}
                          alt={category.categoryName}
                          className="w-16 h-16 object-cover rounded-md transition-transform duration-300 transform hover:scale-105"
                        />
                      </td>
                    </tr>
                  );
                })}
                {currentItems && currentItems.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-500">
                      Tidak ada kategori yang ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="block md:hidden space-y-6">
            {currentItems?.length > 0 ? (
              currentItems.map((category, index) => (
                <div
                  key={category.id}
                  className="border rounded-lg p-5 shadow-lg bg-gradient-to-r from-white to-gray-100"
                >
                  {/* Header: Nomor urutan dan nama kategori */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-lg font-bold text-gray-700">
                      {(currentPage - 1) * itemsPerPage + index + 1}. {category.categoryName}
                    </div>
                    <img
                      src={category.image}
                      alt={category.categoryName}
                      className="w-20 h-20 object-cover rounded-md shadow-md transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Tidak ada kategori yang ditemukan.</p>
            )}
          </div>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="grid grid-cols-3 items-center mt-4">
            {/* Previous Button */}
            <div className="flex justify-start">
              {currentPage > 1 && (
                <button
                  className={`flex items-center py-2 px-4 rounded-lg bg-[#0a61aa] text-white transition-all duration-300 hover:scale-105`}
                  onClick={handlePreviousPage}
                >
                  <IoArrowBackCircle className="mr-2 text-xl" />
                  Previous
                </button>
              )}
            </div>

            {/* Page Indicator */}
            <div className="flex justify-center">
              <span className="text-lg font-semibold">
                Page {currentPage} of {totalPages}
              </span>
            </div>

            {/* Next Button */}
            <div className="flex justify-end">
              {currentPage < totalPages && (
                <button
                  className={`flex items-center py-2 px-4 rounded-lg bg-[#0a61aa] text-white transition-all duration-300 hover:scale-105`}
                  onClick={handleNextPage}
                >
                  Next
                  <IoArrowForwardCircle className="ml-2 text-xl" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Define PropTypes for InstrukturDataKategori if needed
InstrukturDataKategori.propTypes = {
  // Add prop types if there are any props being passed
};

export default InstrukturDataKategori;
