

// import { useEffect, useState, useRef } from "react";
// import { FaFilter, FaBars } from "react-icons/fa";
// import { IoAddCircleOutline, IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
// import DataKelasInput from "../../components/InstrukturComponents/DataKelas/DataKelasInput";
// import DataKelasUbah from "../../components/InstrukturComponents/DataKelas/DataKelasUbah";
// import DataKelasDetail from "../../components/InstrukturComponents/DataKelas/DataKelasDetail";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import SidebarInstruktur from "../../components/Sidebar/SidebarInstruktur";
// import { deleteDataCourse, fetchUserCourses } from "../../redux/actions/instruktorActions";
// import HeadInstruktur from "../../components/InstrukturComponents/HeadInstruktur";
// import toast from "react-hot-toast";

// const InstruktorDataKelas = () => {
//   const [courseTypeSearch, setCourseTypeSearch] = useState("");
//   const [searchVisible] = useState(false);
//   const [showTambahPopup, setShowTambahPopup] = useState(false);
//   const [showUbahPopup, setShowUbahPopup] = useState(false);
//   const [showDetailPopup, setShowDetailPopup] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [courseToDelete, setCourseToDelete] = useState(null);

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [filter, setFilter] = useState("");

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 7;
//   const dispatch = useDispatch();
//   const { mycourse } = useSelector((state) => state.course);

//   const sidebarRef = useRef(null);

//   // Close sidebar when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//         setSidebarOpen(false);
//       }
//     };

//     if (sidebarOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [sidebarOpen]);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         await dispatch(fetchUserCourses());
//       } catch (error) {
//         console.error("Failed to fetch courses:", error);
//       }
//     };
//     fetchCourses();
//   }, [dispatch, mycourse]); // Added mycourse as a dependency

//   const handleAddClick = () => {
//     setSelectedCourse({});
//     setShowTambahPopup(true);
//   };

//   const handleEditClick = (mycourse) => {
//     setSelectedCourse(mycourse);
//     setShowUbahPopup(true);
//   };

//   const handleDetailClick = (mycourse) => {
//     setSelectedCourse(mycourse);
//     setShowDetailPopup(true);
//   };

//   const handleDelete = (mycourse) => {
//     setCourseToDelete(mycourse); // Ensure you set the course to delete
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = () => {
//     if (!courseToDelete?.id) {
//       return; // No need to display console error as there's no ID
//     }

//     dispatch(deleteDataCourse(courseToDelete.id))
//       .then(() => {
//         // Show success toast after successfully deleting the course
//         toast.success("Course berhasil dihapus");

//         setShowDeleteModal(false);
//         dispatch(fetchUserCourses()); // Reload the user's course list
//       })
//       .catch(() => {
//         // Show error toast if failed to delete the course
//         toast.error("Gagal menghapus course. Silakan coba lagi.");
//       });
//   };

//   const filteredCourses = Array.isArray(mycourse)
//     ? mycourse.filter((courseType) => {
//         const search = courseTypeSearch || "";
//         return (
//           courseType.typeCourse.typeName.toLowerCase().includes(search.toLowerCase()) &&
//           (filter === "" || courseType.typeCourse.typeName === filter)
//         );
//       })
//     : [];

//   // Calculate total pages
//   const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

//   // Determine data to display on the current page
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handleFilterChange = (e) => {
//     setFilter(e.target.value);
//     setCurrentPage(1); // Reset page when filter changes
//   };

//   return (
//     <div className="flex flex-col md:flex-row">
//       {/* Sidebar */}
//       <div
//         ref={sidebarRef}
//         className={`fixed inset-y-0 z-50 w-64 min-h-screen transform bg-white transition-transform duration-300 ease-in-out ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:relative md:translate-x-0`}
//       >
//         <SidebarInstruktur />
//       </div>

//       {/* Overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         ></div>
//       )}

//       <div className="flex-1 p-4 md:p-6 bg-secondary min-h-screen font-poppins">
//         {/* HeadInstruktur with setSidebarOpen prop */}
//         <HeadInstruktur setSidebarOpen={setSidebarOpen} />

//         {/* Section Data Kelas */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
//           <h2 className="flex items-center py-2 px-4 bg-gradient-to-r from-[#FF5722] to-[#FF9800] text-white font-semibold rounded-md text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4">
//             Data Kelas
//           </h2>

//           <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
//             {/* Add Class Button */}
//             <div className="flex items-center space-x-4">
//               {/* Add Button */}
//               <div className="relative inline-block">
//                 <button
//                   className="flex items-center py-2 px-4 bg-[#0a61aa] text-white font-semibold rounded-md text-sm transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#0a61aa] focus:ring-opacity-50"
//                   onClick={handleAddClick}
//                 >
//                   <IoAddCircleOutline className="mr-2 text-2xl" />
//                   <span className="font-bold">Tambah</span>
//                 </button>
//               </div>

//               {/* Dropdown Filter */}
//               <div className="relative inline-block">
//                 <select
//                   value={filter}
//                   onChange={handleFilterChange}
//                   className="flex items-center py-2 pl-10 pr-4 bg-[#0a61aa] text-white font-semibold rounded-md text-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#0a61aa] focus:ring-opacity-50"
//                 >
//                   <option value="" className="text-gray-500">
//                     Filter
//                   </option>
//                   <option value="Free">Free</option>
//                   <option value="Premium">Premium</option>
//                 </select>
//                 <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-sm" />
//               </div>
//             </div>

//             {/* Search */}
//             <div className="relative w-full md:w-auto flex items-center">
//               <input
//                 type="text"
//                 value={courseTypeSearch}
//                 onChange={(e) => setCourseTypeSearch(e.target.value)}
//                 className={`transition-all duration-300 ease-in-out border border-[#173D94] rounded-full ml-2 p-1 ${
//                   searchVisible ? "w-40 opacity-100" : "w-0 opacity-0 pointer-events-none"
//                 }`}
//                 placeholder="Cari Id..."
//               />
//             </div>
//           </div>
//         </div>

//         {/* Data Kelas Table */}
//         <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
//           {/* Desktop Table */}
//           <div className="hidden md:block">
//             <table className="min-w-full table-auto">
//               <thead>
//                 <tr className="bg-gray-100 text-left text-xs md:text-sm font-semibold">
//                   <th className="px-4 py-2 w-1/12">Urutan</th>
//                   <th className="px-2 md:px-4 py-2">Image</th>
//                   <th className="px-4 py-2 w-1/6">Kategori</th>
//                   <th className="px-4 py-2 w-2/6">Nama Kelas</th>
//                   <th className="px-4 py-2 w-1/6">Tipe Kelas</th>
//                   <th className="px-4 py-2 w-1/6">Level</th>
//                   <th className="px-4 py-2 w-1/6">Publish</th>
//                   <th className="px-4 py-2 w-1/6">Harga</th>
//                   <th className="px-4 py-2 w-1/6">Aksi</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {currentItems.map((courseType, index) => (
//                   <tr
//                     key={courseType.id}
//                     className="border-t text-xs md:text-sm hover:bg-gray-50 transition-all duration-300"
//                   >
//                     {/* Nomor urutan */}
//                     <td className="px-2 md:px-4 py-2 text-center">
//                       {(currentPage - 1) * itemsPerPage + index + 1}
//                     </td>

//                     {/* Gambar */}
//                     <td className="px-2 md:px-4 py-2 text-center">
//                       <img
//                         src={courseType.image}
//                         alt={courseType.courseName}
//                         className="w-16 object-cover h-16 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
//                       />
//                     </td>

//                     {/* Kategori */}
//                     <td className="px-2 md:px-4 py-2">{courseType.category.categoryName}</td>

//                     {/* Nama Kursus */}
//                     <td className="px-2 md:px-4 py-2 font-semibold">{courseType.courseName}</td>

//                     {/* Tipe Kursus */}
//                     <td
//                       className={`px-2 md:px-4 py-2 font-bold ${
//                         courseType.typeCourse.typeName === "Free" ? "text-success" : "text-failed"
//                       }`}
//                     >
//                       {courseType.typeCourse.typeName}
//                     </td>

//                     {/* Level Kursus */}
//                     <td className="px-2 md:px-4 py-2 text-center">
//                       {courseType.courseLevel.levelName}
//                     </td>

//                     {/* Status Publish */}
//                     <td className="px-2 md:px-4 py-2 text-center">
//                       {courseType.publish ? (
//                         <span className="text-green-500 font-semibold">Published</span>
//                       ) : (
//                         <span className="text-red-500 font-semibold">Unpublished</span>
//                       )}
//                     </td>

//                     {/* Harga */}
//                     <td className="px-2 md:px-4 py-2 font-semibold">
//                       {new Intl.NumberFormat("id-ID", {
//                         style: "currency",
//                         currency: "IDR",
//                       }).format(courseType.coursePrice)}
//                     </td>

//                     {/* Tombol Aksi */}
//                     <td className="px-2 md:px-4 py-2 flex justify-center space-x-3 items-center">
//                       <Link to={`/inst/data-chapter/${courseType.id}`}>
//                         <button className="py-1 px-3 bg-blue-600 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:bg-blue-700 transform hover:scale-105 mt-4">
//                           Kelola
//                         </button>
//                       </Link>
//                       <button
//                         className="py-1 px-3 bg-green-600 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:bg-green-700 transform hover:scale-105 mt-4"
//                         onClick={() => handleEditClick(courseType)}
//                       >
//                         Ubah
//                       </button>
//                       <button
//                         className="py-1 px-3 bg-yellow-600 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:bg-yellow-700 transform hover:scale-105 mt-4"
//                         onClick={() => handleDetailClick(courseType)}
//                       >
//                         Detail
//                       </button>
//                       <button
//                         className="py-1 px-3 bg-red-600 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:bg-red-700 transform hover:scale-105 mt-4"
//                         onClick={() => handleDelete(courseType)}
//                       >
//                         Hapus
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//                 {currentItems.length === 0 && (
//                   <tr>
//                     <td colSpan="9" className="text-center py-4">
//                       Tidak ada kelas ditemukan.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile Cards */}
//           <div className="block md:hidden space-y-6">
//             {currentItems.length > 0 ? (
//               currentItems.map((course, index) => (
//                 <div
//                   key={course.id}
//                   className="border rounded-lg p-5 shadow-lg bg-gradient-to-r from-white to-gray-100"
//                 >
//                   {/* Header: Nomor urutan dan nama kelas */}
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="text-lg font-bold text-gray-700">
//                       {(currentPage - 1) * itemsPerPage + index + 1}. {course.courseName}
//                     </div>
//                     <img
//                       src={course.image}
//                       alt={course.courseName}
//                       className="w-20 h-20 object-cover rounded-md shadow-md transition-transform duration-300 hover:scale-105"
//                     />
//                   </div>

//                   {/* Kategori */}
//                   <div className="mb-3 text-sm text-gray-600">
//                     <span className="font-semibold text-gray-800">Kategori:</span>{" "}
//                     {course.category.categoryName}
//                   </div>

//                   {/* Tipe Kelas */}
//                   <div className="mb-3 text-sm text-gray-600">
//                     <span className="font-semibold text-gray-800">Tipe Kelas:</span>{" "}
//                     <span
//                       className={`font-bold ${
//                         course.typeCourse.typeName === "Free" ? "text-green-500" : "text-red-500"
//                       }`}
//                     >
//                       {course.typeCourse.typeName}
//                     </span>
//                   </div>

//                   {/* Level */}
//                   <div className="mb-3 text-sm text-gray-600">
//                     <span className="font-semibold text-gray-800">Level:</span>{" "}
//                     {course.courseLevel.levelName}
//                   </div>

//                   {/* Harga */}
//                   <div className="mb-3 text-sm text-gray-600">
//                     <span className="font-semibold text-gray-800">Harga:</span>{" "}
//                     {new Intl.NumberFormat("id-ID", {
//                       style: "currency",
//                       currency: "IDR",
//                     }).format(course.coursePrice)}
//                   </div>

//                   {/* Status Publish */}
//                   <div className="mb-3 text-sm text-gray-600">
//                     <span className="font-semibold text-gray-800">Status:</span>{" "}
//                     {course.publish ? (
//                       <span className="text-green-600 font-semibold">Published</span>
//                     ) : (
//                       <span className="text-red-600 font-semibold">Unpublished</span>
//                     )}
//                   </div>

//                   {/* Tombol Aksi */}
//                   <div className="flex flex-col space-y-2 mt-4">
//                     <Link to={`/inst/data-chapter/${course.id}`} className="w-full">
//                       <button className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md text-sm shadow-md hover:bg-blue-700 transition-transform duration-300 hover:scale-105">
//                         Kelola
//                       </button>
//                     </Link>
//                     <button
//                       className="w-full py-2 bg-green-600 text-white font-semibold rounded-md text-sm shadow-md hover:bg-green-700 transition-transform duration-300 hover:scale-105"
//                       onClick={() => handleEditClick(course)}
//                     >
//                       Ubah
//                     </button>
//                     <button
//                       className="w-full py-2 bg-yellow-600 text-white font-semibold rounded-md text-sm shadow-md hover:bg-yellow-700 transition-transform duration-300 hover:scale-105"
//                       onClick={() => handleDetailClick(course)}
//                     >
//                       Detail
//                     </button>
//                     <button
//                       className="w-full py-2 bg-red-600 text-white font-semibold rounded-md text-sm shadow-md hover:bg-red-700 transition-transform duration-300 hover:scale-105"
//                       onClick={() => handleDelete(course)}
//                     >
//                       Hapus
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-gray-500">Tidak ada kelas ditemukan.</p>
//             )}
//           </div>
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-between items-center mt-4">
//           <button
//             className={`flex items-center py-2 px-4 rounded-lg ${
//               currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
//             }`}
//             onClick={handlePreviousPage}
//             disabled={currentPage === 1}
//           >
//             <IoArrowBackCircle className="mr-2" />
//             Previous
//           </button>

//           <span>
//             Page {currentPage} of {totalPages}
//           </span>

//           <button
//             className={`flex items-center py-2 px-4 rounded-lg ${
//               currentPage === totalPages
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-blue-500 text-white"
//             }`}
//             onClick={handleNextPage}
//             disabled={currentPage === totalPages}
//           >
//             Next
//             <IoArrowForwardCircle className="ml-2" />
//           </button>
//         </div>

//         {/* Popups for Add, Edit, Detail, and Delete Modals */}
//         <DataKelasInput show={showTambahPopup} onClose={() => setShowTambahPopup(false)} />
//         <DataKelasUbah
//           show={showUbahPopup}
//           onClose={() => setShowUbahPopup(false)}
//           existingData={selectedCourse}
//         />
//         <DataKelasDetail
//           show={showDetailPopup}
//           onClose={() => setShowDetailPopup(false)}
//           existingData={selectedCourse}
//         />

//         {showDeleteModal && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-70">
//             {/* Confirmation Modal */}
//             <div className="bg-white p-6 rounded-lg shadow-lg">
//               <h2 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
//               <p className="mb-4">Apakah Anda yakin ingin menghapus konten ini?</p>
//               <div className="flex justify-end space-x-4">
//                 <button
//                   className="py-2 px-4 bg-red-500 text-white rounded-md"
//                   onClick={confirmDelete}
//                 >
//                   Hapus
//                 </button>
//                 <button
//                   className="py-2 px-4 bg-gray-300 rounded-md"
//                   onClick={() => setShowDeleteModal(false)}
//                 >
//                   Batal
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InstruktorDataKelas;

// import { useEffect, useState, useRef } from "react";
// import { FaFilter, FaBars } from "react-icons/fa";
// import { IoAddCircleOutline, IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
// import DataKelasInput from "../../components/InstrukturComponents/DataKelas/DataKelasInput";
// import DataKelasUbah from "../../components/InstrukturComponents/DataKelas/DataKelasUbah";
// import DataKelasDetail from "../../components/InstrukturComponents/DataKelas/DataKelasDetail";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import SidebarInstruktur from "../../components/Sidebar/SidebarInstruktur";
// import { deleteDataCourse, fetchUserCourses } from "../../redux/actions/instruktorActions";
// import HeadInstruktur from "../../components/InstrukturComponents/HeadInstruktur";
// import toast from "react-hot-toast";

// const InstruktorDataKelas = () => {
//   const [courseTypeSearch, setCourseTypeSearch] = useState("");
//   const [searchVisible] = useState(false);
//   const [showTambahPopup, setShowTambahPopup] = useState(false);
//   const [showUbahPopup, setShowUbahPopup] = useState(false);
//   const [showDetailPopup, setShowDetailPopup] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [courseToDelete, setCourseToDelete] = useState(null);

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [filter, setFilter] = useState("");

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 7;
//   const dispatch = useDispatch();
//   const { mycourse } = useSelector((state) => state.course);

//   const sidebarRef = useRef(null);

//   // Close sidebar when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//         setSidebarOpen(false);
//       }
//     };

//     if (sidebarOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [sidebarOpen]);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         await dispatch(fetchUserCourses());
//       } catch (error) {
//         console.error("Failed to fetch courses:", error);
//       }
//     };
//     fetchCourses();
//   }, [dispatch, mycourse]); // Added mycourse as a dependency

//   const handleAddClick = () => {
//     setSelectedCourse({});
//     setShowTambahPopup(true);
//   };

//   const handleEditClick = (course) => {
//     setSelectedCourse(course);
//     setShowUbahPopup(true);
//   };

//   const handleDetailClick = (course) => {
//     setSelectedCourse(course);
//     setShowDetailPopup(true);
//   };

//   const handleDelete = (course) => {
//     setCourseToDelete(course); // Ensure the course to delete is set
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = () => {
//     if (!courseToDelete?.id) {
//       return; // No action if there's no ID
//     }

//     dispatch(deleteDataCourse(courseToDelete.id))
//       .then(() => {
//         // Show success toast after successful deletion
//         toast.success("Course berhasil dihapus");

//         setShowDeleteModal(false);
//         dispatch(fetchUserCourses()); // Reload the user's course list
//       })
//       .catch(() => {
//         // Show error toast if deletion fails
//         toast.error("Gagal menghapus course. Silakan coba lagi.");
//       });
//   };

//   const filteredCourses = Array.isArray(mycourse)
//     ? mycourse.filter((courseType) => {
//         const search = courseTypeSearch || "";
//         return (
//           courseType.typeCourse.typeName.toLowerCase().includes(search.toLowerCase()) &&
//           (filter === "" || courseType.typeCourse.typeName === filter)
//         );
//       })
//     : [];

//   // Calculate total pages
//   const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

//   // Determine data to display on the current page
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handleFilterChange = (e) => {
//     setFilter(e.target.value);
//     setCurrentPage(1); // Reset page when filter changes
//   };

//   return (
//     <div className="flex flex-col md:flex-row">
//       {/* Sidebar */}
//       <div
//         ref={sidebarRef} // Using useRef here
//         className={`fixed inset-y-0 z-50 w-64 min-h-screen transform bg-white transition-transform duration-300 ease-in-out ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:relative md:translate-x-0`}
//       >
//         <SidebarInstruktur />
//       </div>

//       {/* Overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         ></div>
//       )}

//       <div className="flex-1 p-4 md:p-6 bg-secondary min-h-screen font-poppins">
//         {/* HeadInstruktur with setSidebarOpen prop */}
//         <HeadInstruktur setSidebarOpen={setSidebarOpen} />

//         {/* Section Data Kelas */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
//             <h2 className="flex items-center py-2 px-4 mt-4 bg-gradient-to-r from-[#FF5722] to-[#FF9800] text-white font-semibold rounded-md text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4">
//               Data Kelas
//             </h2>

//           <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
//             {/* Tambah dan Filter Buttons */}
//             <div className="flex items-center space-x-4">
//               {/* Tambah Button */}
//               <div className="relative inline-block">
//                 <button
//                   className="flex items-center py-2 px-4 bg-[#0a61aa] text-white font-semibold rounded-md text-sm transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#0a61aa] focus:ring-opacity-50"
//                   onClick={handleAddClick}
//                 >
//                   <IoAddCircleOutline className="mr-2 text-2xl" />
//                   <span className="font-bold">Tambah</span>
//                 </button>
//               </div>

//               {/* Dropdown Filter */}
//               <div className="relative inline-block">
//                 <select
//                   value={filter}
//                   onChange={handleFilterChange}
//                   className="flex items-center py-2 pl-10 pr-4 bg-[#0a61aa] text-white font-semibold rounded-md text-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#0a61aa] focus:ring-opacity-50"
//                 >
//                   <option value="" className="text-gray-500">
//                     Filter
//                   </option>
//                   <option value="Free">Free</option>
//                   <option value="Premium">Premium</option>
//                 </select>
//                 <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-sm" />
//               </div>
//             </div>

//             {/* Search Input */}
//             <div className="relative w-full md:w-auto flex items-center">
//               <input
//                 type="text"
//                 value={courseTypeSearch}
//                 onChange={(e) => setCourseTypeSearch(e.target.value)}
//                 className={`transition-all duration-300 ease-in-out border border-[#173D94] rounded-full ml-2 p-1 ${
//                   searchVisible ? "w-40 opacity-100" : "w-0 opacity-0 pointer-events-none"
//                 }`}
//                 placeholder="Cari Id..."
//               />
//             </div>
//           </div>
//         </div>

//         {/* Tabel Data Kelas */}
//         <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
//           {/* Desktop Table */}
//           <div className="hidden md:block">
//             <table className="min-w-full table-auto">
//               <thead>
//                 <tr className="bg-gray-100 text-left text-xs md:text-sm font-semibold">
//                   <th className="px-4 py-2 w-1/12">Urutan</th>
//                   <th className="px-2 md:px-4 py-2">Image</th>
//                   <th className="px-4 py-2 w-1/6">Kategori</th>
//                   <th className="px-4 py-2 w-2/6">Nama Kelas</th>
//                   <th className="px-4 py-2 w-1/6">Tipe Kelas</th>
//                   <th className="px-4 py-2 w-1/6">Level</th>
//                   <th className="px-4 py-2 w-1/6">Publish</th>
//                   <th className="px-4 py-2 w-1/6">Harga</th>
//                   <th className="px-4 py-2 w-1/6">Aksi</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {currentItems.map((courseType, index) => (
//                   <tr
//                     key={courseType.id}
//                     className="border-t text-xs md:text-sm hover:bg-gray-50 transition-all duration-300"
//                   >
//                     {/* Nomor urutan */}
//                     <td className="px-2 md:px-4 py-2 text-center">
//                       {(currentPage - 1) * itemsPerPage + index + 1}
//                     </td>

//                     {/* Gambar */}
//                     <td className="px-2 md:px-4 py-2 text-center">
//                       <img
//                         src={courseType.image}
//                         alt={courseType.courseName}
//                         className="w-16 object-cover h-16 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
//                       />
//                     </td>

//                     {/* Kategori */}
//                     <td className="px-2 md:px-4 py-2">{courseType.category.categoryName}</td>

//                     {/* Nama Kursus */}
//                     <td className="px-2 md:px-4 py-2 font-semibold">{courseType.courseName}</td>

//                     {/* Tipe Kursus */}
//                     <td
//                       className={`px-2 md:px-4 py-2 font-bold ${
//                         courseType.typeCourse.typeName === "Free" ? "text-success" : "text-failed"
//                       }`}
//                     >
//                       {courseType.typeCourse.typeName}
//                     </td>

//                     {/* Level Kursus */}
//                     <td className="px-2 md:px-4 py-2 text-center">
//                       {courseType.courseLevel.levelName}
//                     </td>

//                     {/* Status Publish */}
//                     <td className="px-2 md:px-4 py-2 text-center">
//                       {courseType.publish ? (
//                         <span className="text-green-500 font-semibold">Published</span>
//                       ) : (
//                         <span className="text-red-500 font-semibold">Unpublished</span>
//                       )}
//                     </td>

//                     {/* Harga */}
//                     <td className="px-2 md:px-4 py-2 font-semibold">
//                       {new Intl.NumberFormat("id-ID", {
//                         style: "currency",
//                         currency: "IDR",
//                       }).format(courseType.coursePrice)}
//                     </td>

//                     {/* Tombol Aksi */}
//                     <td className="px-2 md:px-4 py-2 flex justify-center space-x-3 items-center">
//                       <Link to={`/inst/data-chapter/${courseType.id}`}>
//                         <button className="py-1 px-3 bg-blue-600 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:bg-blue-700 transform hover:scale-105">
//                           Kelola
//                         </button>
//                       </Link>
//                       <button
//                         className="py-1 px-3 bg-green-600 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:bg-green-700 transform hover:scale-105"
//                         onClick={() => handleEditClick(courseType)}
//                       >
//                         Ubah
//                       </button>
//                       <button
//                         className="py-1 px-3 bg-yellow-600 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:bg-yellow-700 transform hover:scale-105"
//                         onClick={() => handleDetailClick(courseType)}
//                       >
//                         Detail
//                       </button>
//                       <button
//                         className="py-1 px-3 bg-red-600 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:bg-red-700 transform hover:scale-105"
//                         onClick={() => handleDelete(courseType)}
//                       >
//                         Hapus
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile Cards */}
//           <div className="block md:hidden space-y-6">
//             {currentItems.length > 0 ? (
//               currentItems.map((course, index) => (
//                 <div
//                   key={course.id}
//                   className="border rounded-lg p-5 shadow-lg bg-gradient-to-r from-white to-gray-100"
//                 >
//                   {/* Header: Nomor urutan dan nama kelas */}
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="text-lg font-bold text-gray-700">
//                       {(currentPage - 1) * itemsPerPage + index + 1}. {course.courseName}
//                     </div>
//                     <img
//                       src={course.image}
//                       alt={course.courseName}
//                       className="w-20 h-20 object-cover rounded-md shadow-md transition-transform duration-300 hover:scale-105"
//                     />
//                   </div>

//                   {/* Kategori */}
//                   <div className="mb-3 text-sm text-gray-600">
//                     <span className="font-semibold text-gray-800">Kategori:</span>{" "}
//                     {course.category.categoryName}
//                   </div>

//                   {/* Tipe Kelas */}
//                   <div className="mb-3 text-sm text-gray-600">
//                     <span className="font-semibold text-gray-800">Tipe Kelas:</span>{" "}
//                     <span
//                       className={`font-bold ${
//                         course.typeCourse.typeName === "Free" ? "text-green-500" : "text-red-500"
//                       }`}
//                     >
//                       {course.typeCourse.typeName}
//                     </span>
//                   </div>

//                   {/* Level */}
//                   <div className="mb-3 text-sm text-gray-600">
//                     <span className="font-semibold text-gray-800">Level:</span>{" "}
//                     {course.courseLevel.levelName}
//                   </div>

//                   {/* Harga */}
//                   <div className="mb-3 text-sm text-gray-600">
//                     <span className="font-semibold text-gray-800">Harga:</span>{" "}
//                     {new Intl.NumberFormat("id-ID", {
//                       style: "currency",
//                       currency: "IDR",
//                     }).format(course.coursePrice)}
//                   </div>

//                   {/* Status Publish */}
//                   <div className="mb-3 text-sm text-gray-600">
//                     <span className="font-semibold text-gray-800">Status:</span>{" "}
//                     {course.publish ? (
//                       <span className="text-green-600 font-semibold">Published</span>
//                     ) : (
//                       <span className="text-red-600 font-semibold">Unpublished</span>
//                     )}
//                   </div>

//                   {/* Tombol Aksi */}
//                   <div className="flex flex-col space-y-2 mt-4">
//                     <Link to={`/inst/data-chapter/${course.id}`} className="w-full">
//                       <button className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md text-sm shadow-md hover:bg-blue-700 transition-transform duration-300 hover:scale-105">
//                         Kelola
//                       </button>
//                     </Link>
//                     <button
//                       className="w-full py-2 bg-green-600 text-white font-semibold rounded-md text-sm shadow-md hover:bg-green-700 transition-transform duration-300 hover:scale-105"
//                       onClick={() => handleEditClick(course)}
//                     >
//                       Ubah
//                     </button>
//                     <button
//                       className="w-full py-2 bg-yellow-600 text-white font-semibold rounded-md text-sm shadow-md hover:bg-yellow-700 transition-transform duration-300 hover:scale-105"
//                       onClick={() => handleDetailClick(course)}
//                     >
//                       Detail
//                     </button>
//                     <button
//                       className="w-full py-2 bg-red-600 text-white font-semibold rounded-md text-sm shadow-md hover:bg-red-700 transition-transform duration-300 hover:scale-105"
//                       onClick={() => handleDelete(course)}
//                     >
//                       Hapus
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-gray-500">Tidak ada kelas ditemukan.</p>
//             )}
//           </div>
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-between items-center mt-4">
//             <button
//               className={`flex items-center py-2 px-4 rounded-lg ${
//                 currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
//               }`}
//               onClick={handlePreviousPage}
//               disabled={currentPage === 1}
//             >
//               <IoArrowBackCircle className="mr-2" />
//               Previous
//             </button>

//             <span>
//               Page {currentPage} of {totalPages}
//             </span>

//             <button
//               className={`flex items-center py-2 px-4 rounded-lg ${
//                 currentPage === totalPages
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-blue-500 text-white"
//               }`}
//               onClick={handleNextPage}
//               disabled={currentPage === totalPages}
//             >
//               Next
//               <IoArrowForwardCircle className="ml-2" />
//             </button>
//           </div>
//         )}

//         {/* Popups for Add, Edit, Detail, and Delete Modals */}
//         <DataKelasInput show={showTambahPopup} onClose={() => setShowTambahPopup(false)} />
//         <DataKelasUbah
//           show={showUbahPopup}
//           onClose={() => setShowUbahPopup(false)}
//           existingData={selectedCourse}
//         />
//         <DataKelasDetail
//           show={showDetailPopup}
//           onClose={() => setShowDetailPopup(false)}
//           existingData={selectedCourse}
//         />

//         {showDeleteModal && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-70">
//             {/* Modal Content */}
//             <div className="bg-white p-6 rounded-lg shadow-lg">
//               <h2 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
//               <p className="mb-4">Apakah Anda yakin ingin menghapus konten ini?</p>
//               <div className="flex justify-end space-x-4">
//                 <button
//                   className="py-2 px-4 bg-red-500 text-white rounded-md"
//                   onClick={confirmDelete}
//                 >
//                   Hapus
//                 </button>
//                 <button
//                   className="py-2 px-4 bg-gray-300 rounded-md"
//                   onClick={() => setShowDeleteModal(false)}
//                 >
//                   Batal
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InstruktorDataKelas;

import { useEffect, useState, useRef } from "react";
import { FaFilter, FaBars } from "react-icons/fa";
import { IoAddCircleOutline, IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import DataKelasInput from "../../components/InstrukturComponents/DataKelas/DataKelasInput";
import DataKelasUbah from "../../components/InstrukturComponents/DataKelas/DataKelasUbah";
import DataKelasDetail from "../../components/InstrukturComponents/DataKelas/DataKelasDetail";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SidebarInstruktur from "../../components/Sidebar/SidebarInstruktur";
import { deleteDataCourse, fetchUserCourses } from "../../redux/actions/instruktorActions";
import HeadInstruktur from "../../components/InstrukturComponents/HeadInstruktur";
import toast from "react-hot-toast";

const InstruktorDataKelas = () => {
  const [courseTypeSearch, setCourseTypeSearch] = useState("");
  const [searchVisible] = useState(false);
  const [showTambahPopup, setShowTambahPopup] = useState(false);
  const [showUbahPopup, setShowUbahPopup] = useState(false);
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const dispatch = useDispatch();
  const { mycourse } = useSelector((state) => state.course);

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

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        await dispatch(fetchUserCourses());
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    fetchCourses();
  }, [dispatch, mycourse]); // Added mycourse as a dependency

  const handleAddClick = () => {
    setSelectedCourse({});
    setShowTambahPopup(true);
  };

  const handleEditClick = (course) => {
    setSelectedCourse(course);
    setShowUbahPopup(true);
  };

  const handleDetailClick = (course) => {
    setSelectedCourse(course);
    setShowDetailPopup(true);
  };

  const handleDelete = (course) => {
    setCourseToDelete(course); // Ensure the course to delete is set
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!courseToDelete?.id) {
      return; // No action if there's no ID
    }

    dispatch(deleteDataCourse(courseToDelete.id))
      .then(() => {
        // Show success toast after successful deletion
        toast.success("Course berhasil dihapus");

        setShowDeleteModal(false);
        dispatch(fetchUserCourses()); // Reload the user's course list
      })
      .catch(() => {
        // Show error toast if deletion fails
        toast.error("Gagal menghapus course. Silakan coba lagi.");
      });
  };

  const filteredCourses = Array.isArray(mycourse)
    ? mycourse.filter((courseType) => {
        const search = courseTypeSearch || "";
        return (
          courseType.typeCourse.typeName.toLowerCase().includes(search.toLowerCase()) &&
          (filter === "" || courseType.typeCourse.typeName === filter)
        );
      })
    : [];

  // Calculate total pages
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  // Determine data to display on the current page
  const currentItems = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1); // Reset page when filter changes
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

        {/* Section Data Kelas */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
          <h2 className="flex items-center py-2 px-4 mt-4 bg-gradient-to-r from-[#FF5722] to-[#FF9800] text-white font-semibold rounded-md text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4">
            Data Kelas
          </h2>

          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
            {/* Tambah dan Filter Buttons */}
            <div className="flex items-center space-x-4">
              {/* Tambah Button */}
              <div className="relative inline-block">
                <button
                  className="flex items-center py-2 px-4 bg-[#0a61aa] text-white font-semibold rounded-md text-sm transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#0a61aa] focus:ring-opacity-50"
                  onClick={handleAddClick}
                >
                  <IoAddCircleOutline className="mr-2 text-2xl" />
                  <span className="font-bold">Tambah</span>
                </button>
              </div>

              {/* Dropdown Filter */}
              <div className="relative inline-block">
                <select
                  value={filter}
                  onChange={handleFilterChange}
                  className="flex items-center py-2 pl-10 pr-4 bg-[#0a61aa] text-white font-semibold rounded-md text-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#0a61aa] focus:ring-opacity-50"
                >
                  <option value="" className="text-gray-500">
                    Filter
                  </option>
                  <option value="Free">Free</option>
                  <option value="Premium">Premium</option>
                </select>
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-sm" />
              </div>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-auto flex items-center">
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

        {/* Tabel Data Kelas */}
        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100 text-left text-xs md:text-sm font-semibold">
                  <th className="px-4 py-2 w-1/12">No</th>
                  <th className="px-2 md:px-4 py-2">Image</th>
                  <th className="px-4 py-2 w-1/6">Kategori</th>
                  <th className="px-4 py-2 w-2/6">Nama Kelas</th>
                  <th className="px-4 py-2 w-1/6">Tipe Kelas</th>
                  <th className="px-4 py-2 w-1/6">Level</th>
                  <th className="px-4 py-2 w-1/6">Publish</th>
                  <th className="px-4 py-2 w-1/6">Harga</th>
                  <th className="px-4 py-2 w-1/6">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((courseType, index) => (
                  <tr
                    key={courseType.id}
                    className="border-t text-xs md:text-sm hover:bg-gray-50 transition-all duration-300"
                  >
                    {/* Nomor urutan */}
                    <td className="px-2 md:px-4 py-2 text-center">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>

                    {/* Gambar */}
                    <td className="px-2 md:px-4 py-2 text-center">
                      <img
                        src={courseType.image}
                        alt={courseType.courseName}
                        className="w-16 object-cover h-16 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
                      />
                    </td>

                    {/* Kategori */}
                    <td className="px-2 md:px-4 py-2">{courseType.category.categoryName}</td>

                    {/* Nama Kursus */}
                    <td className="px-2 md:px-4 py-2 font-semibold">{courseType.courseName}</td>

                    {/* Tipe Kursus */}
                    <td
                      className={`px-2 md:px-4 py-2 font-bold ${
                        courseType.typeCourse.typeName === "Free" ? "text-success" : "text-failed"
                      }`}
                    >
                      {courseType.typeCourse.typeName}
                    </td>

                    {/* Level Kursus */}
                    <td className="px-2 md:px-4 py-2 text-center">
                      {courseType.courseLevel.levelName}
                    </td>

                    {/* Status Publish */}
                    <td className="px-2 md:px-4 py-2 text-center">
                      {courseType.publish ? (
                        <span className="text-green-500 font-semibold">Published</span>
                      ) : (
                        <span className="text-red-500 font-semibold">Unpublished</span>
                      )}
                    </td>

                    {/* Harga */}
                    <td className="px-2 md:px-4 py-2 font-semibold">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(courseType.coursePrice)}
                    </td>

                    {/* Tombol Aksi */}
                    <td className="px-2 md:px-4 py-2 flex justify-center space-x-3 items-center">
                      <Link to={`/inst/data-chapter/${courseType.id}`}>
                        <button className="py-1 px-3 bg-blue-600 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:bg-blue-700 transform hover:scale-105">
                          Kelola
                        </button>
                      </Link>
                      <button
                        className="py-1 px-3 bg-green-600 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:bg-green-700 transform hover:scale-105"
                        onClick={() => handleEditClick(courseType)}
                      >
                        Ubah
                      </button>
                      <button
                        className="py-1 px-3 bg-yellow-600 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:bg-yellow-700 transform hover:scale-105"
                        onClick={() => handleDetailClick(courseType)}
                      >
                        Detail
                      </button>
                      <button
                        className="py-1 px-3 bg-red-600 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:bg-red-700 transform hover:scale-105"
                        onClick={() => handleDelete(courseType)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="block md:hidden space-y-6">
            {currentItems.length > 0 ? (
              currentItems.map((course, index) => (
                <div
                  key={course.id}
                  className="border rounded-lg p-5 shadow-lg bg-gradient-to-r from-white to-gray-100"
                >
                  {/* Header: Nomor urutan dan nama kelas */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-lg font-bold text-gray-700">
                      {(currentPage - 1) * itemsPerPage + index + 1}. {course.courseName}
                    </div>
                    <img
                      src={course.image}
                      alt={course.courseName}
                      className="w-20 h-20 object-cover rounded-md shadow-md transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  {/* Kategori */}
                  <div className="mb-3 text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">Kategori:</span>{" "}
                    {course.category.categoryName}
                  </div>

                  {/* Tipe Kelas */}
                  <div className="mb-3 text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">Tipe Kelas:</span>{" "}
                    <span
                      className={`font-bold ${
                        course.typeCourse.typeName === "Free" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {course.typeCourse.typeName}
                    </span>
                  </div>

                  {/* Level */}
                  <div className="mb-3 text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">Level:</span>{" "}
                    {course.courseLevel.levelName}
                  </div>

                  {/* Harga */}
                  <div className="mb-3 text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">Harga:</span>{" "}
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(course.coursePrice)}
                  </div>

                  {/* Status Publish */}
                  <div className="mb-3 text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">Status:</span>{" "}
                    {course.publish ? (
                      <span className="text-green-600 font-semibold">Published</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Unpublished</span>
                    )}
                  </div>

                  {/* Tombol Aksi */}
                  <div className="flex flex-col space-y-2 mt-4">
                    <Link to={`/inst/data-chapter/${course.id}`} className="w-full">
                      <button className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md text-sm shadow-md hover:bg-blue-700 transition-transform duration-300 hover:scale-105">
                        Kelola
                      </button>
                    </Link>
                    <button
                      className="w-full py-2 bg-green-600 text-white font-semibold rounded-md text-sm shadow-md hover:bg-green-700 transition-transform duration-300 hover:scale-105"
                      onClick={() => handleEditClick(course)}
                    >
                      Ubah
                    </button>
                    <button
                      className="w-full py-2 bg-yellow-600 text-white font-semibold rounded-md text-sm shadow-md hover:bg-yellow-700 transition-transform duration-300 hover:scale-105"
                      onClick={() => handleDetailClick(course)}
                    >
                      Detail
                    </button>
                    <button
                      className="w-full py-2 bg-red-600 text-white font-semibold rounded-md text-sm shadow-md hover:bg-red-700 transition-transform duration-300 hover:scale-105"
                      onClick={() => handleDelete(course)}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Tidak ada kelas ditemukan.</p>
            )}
          </div>
        </div>

        {/* Pagination */}
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

        {/* Popups for Add, Edit, Detail, and Delete Modals */}
        <DataKelasInput show={showTambahPopup} onClose={() => setShowTambahPopup(false)} />
        <DataKelasUbah
          show={showUbahPopup}
          onClose={() => setShowUbahPopup(false)}
          existingData={selectedCourse}
        />
        <DataKelasDetail
          show={showDetailPopup}
          onClose={() => setShowDetailPopup(false)}
          existingData={selectedCourse}
        />

        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-70">
            {/* Modal Content */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
              <p className="mb-4">Apakah Anda yakin ingin menghapus konten ini?</p>
              <div className="flex justify-end space-x-4">
                <button
                  className="py-2 px-4 bg-red-500 text-white rounded-md"
                  onClick={confirmDelete}
                >
                  Hapus
                </button>
                <button
                  className="py-2 px-4 bg-gray-300 rounded-md"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Define PropTypes for InstrukturDataKelas if needed
InstruktorDataKelas.propTypes = {
  // Add prop types if there are any props being passed
};

export default InstruktorDataKelas;
