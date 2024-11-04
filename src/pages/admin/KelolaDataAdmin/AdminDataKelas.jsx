// // File: AdminDataKelas.jsx

// import { useState, useEffect } from "react";
// import { FaSearch, FaBars } from "react-icons/fa";
// import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
// import { useDispatch, useSelector } from "react-redux";

// import { getAllCourse } from "../../../redux/actions/courseActions";

// import SideBar from "../../../components/Sidebar/SidebarAdmin";

// const AdminDataKelas = () => {
//   const [searchValue, setSearchValue] = useState("");
//   const [searchVisible, setSearchVisible] = useState(false);

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 7;

//   // Sidebar state for mobile
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSearch = () => {
//     setSearchVisible(!searchVisible);
//   };

//   const dispatch = useDispatch();

//   // Fetch courses from Redux store
//   const { courses, loading, error } = useSelector((state) => state.course);

//   useEffect(() => {
//     dispatch(getAllCourse());
//   }, [dispatch]);

//   // Pagination logic: slicing courses for the current page
//   const totalPages = Math.ceil(courses?.length / itemsPerPage);
//   const currentItems = courses?.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const filteredCourses = currentItems?.filter((course) =>
//     course.courseName.toLowerCase().includes(searchValue.toLowerCase())
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
//           <SideBar />
//         </div>

//         {/* Overlay */}
//         {sidebarOpen && (
//           <div
//             className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
//             onClick={() => setSidebarOpen(false)}
//           ></div>
//         )}

//         <div className="flex-1 p-4 md:p-6 bg-secondary min-h-screen font-poppins">
//           {/* Header */}
//           <div className="bg-[#F3F7FB] p-4 flex justify-between items-center mb-4 shadow-sm">
//             {/* Menu button on mobile */}
//             <button
//               className="text-[#0a61aa] md:hidden"
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//             >
//               <FaBars className="text-2xl" />
//             </button>

//             <h1 className="text-2xl font-bold text-[#0a61aa]">Hi, Admin!</h1>
//           </div>

//           {/* Section Data Kelas */}
//           <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
//             <h2 className="text-lg md:text-xl font-bold text-[#0a61aa]">
//               Data Kelas
//             </h2>

//             <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
//               {/* Search Input */}
//               <div className="relative w-full md:w-auto flex items-center">
//                 <FaSearch
//                   className="text-[#173D94] text-lg cursor-pointer"
//                   onClick={toggleSearch}
//                 />
//                 <input
//                   type="text"
//                   value={searchValue}
//                   onChange={(e) => setSearchValue(e.target.value)}
//                   className={`transition-all duration-300 ease-in-out border border-[#173D94] rounded-full ml-2 p-1 ${
//                     searchVisible
//                       ? "w-40 opacity-100"
//                       : "w-0 opacity-0 pointer-events-none"
//                   }`}
//                   placeholder="Cari Nama..."
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Table Data Kelas */}
//           <div className="overflow-x-auto bg-white p-4">
//             {loading ? (
//               <p>Loading...</p>
//             ) : error ? (
//               <p>Error: {error}</p>
//             ) : (
//               <table className="min-w-full table-auto">
//                 <thead>
//                   <tr className="bg-gray-100 text-left text-xs md:text-sm font-semibold">
//                     <th className="px-2 md:px-4 py-2">Nomor</th>
//                     <th className="px-2 md:px-4 py-2">Kode Kelas</th>
//                     <th className="px-2 md:px-4 py-2">Nama Kelas</th>
//                     <th className="px-2 md:px-4 py-2">Foto</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredCourses?.map((course, index) => {
//                     const rowNumber =
//                       (currentPage - 1) * itemsPerPage + index + 1;
//                     return (
//                       <tr key={index} className="border-t text-xs md:text-sm">
//                         <td className="px-2 md:px-4 py-2">{rowNumber}</td>
//                         <td className="px-2 md:px-4 py-2">
//                           {course.courseCode}
//                         </td>
//                         <td className="px-2 md:px-4 py-2">
//                           {course.courseName}
//                         </td>
//                         <td className="px-2 md:px-4 py-2">
//                           {course.courseCode}
//                         </td>
//                         <td className="px-2 md:px-4 py-2">
//                           <img
//                             src={course.image}
//                             alt={course.courseName}
//                             className="w-16 h-16 object-cover rounded-md"
//                           />
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             )}
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

// export default AdminDataKelas;
import React, { useEffect, useState } from "react";
import { FaSearch, FaFilter, FaBars } from "react-icons/fa";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getAllKelas } from "../../../redux/actions/adminDataKelasActions";
import Sidebar from "../../../components/Sidebar/SidebarAdmin";

const AdminDataKelas = () => {
  const [courseTypeSearch, setCourseTypeSearch] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.courses);

  useEffect(() => {
    dispatch(getAllKelas());
  }, [dispatch]);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

   const filteredCourses = courses.filter((courseType) => {
     const search = courseTypeSearch || ""; // Pastikan courseTypeSearch tidak undefined

     return (
       courseType.typeCourse.typeName.toLowerCase().includes(search.toLowerCase()) && // Gunakan typeName untuk penyaringan
       (filter === "" || courseType.typeCourse.typeName === filter)
     );
   });


  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="flex">
      <div
        className={`fixed inset-0 z-50 transition-transform transform bg-white md:relative md:translate-x-0 md:bg-transparent ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className="flex-1 p-4 md:p-6 bg-secondary min-h-screen font-poppins">
        <div className="bg-[#F3F7FB] p-4 flex justify-between items-center mb-4 shadow-sm">
          <button className="text-[#0a61aa] md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars className="text-2xl" />
          </button>
          <h1 className="text-2xl font-bold text-[#0a61aa]">Hi, Admin!</h1>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
          <h2 className="text-lg md:text-xl font-bold text-[#0a61aa]">Data Kelas</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={filter}
                onChange={handleFilterChange}
                className="p-1 border border-[#0a61aa] rounded-full text-sm text-[#0a61aa]"
              >
                <option value="">Filter</option>
                <option value="Free">Free</option>
                <option value="Premium">Premium</option>
              </select>
              <FaFilter className="absolute right-4 top-2 text-[#0a61aa] text-sm" />
            </div>
            <div className="relative w-full md:w-auto flex items-center">
              <FaSearch className="text-[#173D94] text-lg cursor-pointer" onClick={toggleSearch} />
              <input
                type="text"
                value={courseTypeSearch}
                onChange={(e) => setCourseTypeSearch(e.target.value)}
                className={`transition-all duration-300 ease-in-out border border-[#173D94] rounded-full ml-2 p-1 ${
                  searchVisible ? "w-40 opacity-100" : "w-0 opacity-0 pointer-events-none"
                }`}
                placeholder="Cari Id..."
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left text-xs md:text-sm font-semibold">
                <th className="px-2 md:px-4 py-2">Urutan</th>
                <th className="px-2 md:px-4 py-2">Kategori</th>
                <th className="px-2 md:px-4 py-2">Nama Kelas</th>
                <th className="px-2 md:px-4 py-2">Tipe Kelas</th>
                <th className="px-2 md:px-4 py-2">Level</th>
                <th className="px-2 md:px-4 py-2">Harga</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((courseType, index) => (
                <tr key={courseType.id} className="border-t text-xs md:text-sm">
                  {/* Gunakan index + 1 untuk membuat urutan dari 1 */}
                  <td className="px-2 md:px-4 py-2">{index + 1}</td>
                  <td className="px-2 md:px-4 py-2">{courseType.category.categoryName}</td>
                  <td className="px-2 md:px-4 py-2">{courseType.courseName}</td>
                  <td
                    className={`px-2 md:px-4 py-2 font-bold ${
                      courseType.typeCourse.typeName === "Free" ? "text-success" : "text-failed"
                    }`}
                  >
                    {courseType.typeCourse.typeName}
                  </td>
                  <td className="px-2 md:px-4 py-2">{courseType.courseLevel.levelName}</td>
                  <td className="px-2 md:px-4 py-2">{courseType.coursePrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            className={`flex items-center py-2 px-4 rounded-lg ${
              currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-[#0a61aa] text-white"
            } transition-all duration-300 hover:scale-105`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <IoArrowBackCircle className="mr-2 text-xl" />
            Previous
          </button>

          <span className="text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className={`flex items-center py-2 px-4 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#0a61aa] text-white"
            } transition-all duration-300 hover:scale-105`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <IoArrowForwardCircle className="ml-2 text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDataKelas;
