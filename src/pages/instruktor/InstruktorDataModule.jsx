// import { useState } from "react";
// import { FaBars } from "react-icons/fa";
// import {
//   IoAddCircleOutline,
//   IoArrowBack,
//   IoArrowBackCircle,
//   IoArrowForwardCircle,
// } from "react-icons/io5";
// import { Link, useNavigate } from "react-router-dom";
// import SideBar from "../../components/Sidebar/SidebarInstruktur";
// import TambahModule from "../../components/InstrukturComponents/DataModuleComponent/TambahModule";
// import UbahModule from "../../components/InstrukturComponents/DataModuleComponent/UbahModule";

// const InstruktorDataModule = () => {
//   const [showTambahPopup, setShowTambahPopup] = useState(false);
//   const [showUbahPopup, setShowUbahPopup] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const navigate = useNavigate();

//   const handleAddClick = () => {
//     setSelectedCourse(null);
//     setShowTambahPopup(true);
//   };

//   const handleEditClick = (course) => {
//     setSelectedCourse(course);
//     setShowUbahPopup(true);
//   };

//   const handleDetailClick = (course) => {
//     console.log("Detail clicked for:", course);
//   };

//   const handleBackClick = () => {
//     navigate(-1);
//   };

//   const totalPages = Math.ceil(courseType.length / itemsPerPage);
//   const currentItems = courseType.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <>
//       <div className="flex">
//         <div
//           className={`fixed inset-0 z-50 transition-transform transform bg-white md:relative md:translate-x-0 md:bg-transparent ${
//             sidebarOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//         >
//           <SideBar />
//         </div>

//         {sidebarOpen && (
//           <div
//             className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
//             onClick={() => setSidebarOpen(false)}
//           ></div>
//         )}

//         <div className="flex-1 p-4 md:p-6 bg-secondary min-h-screen font-poppins">
//           <div className="bg-[#F3F7FB] p-4 flex justify-between items-center mb-4 shadow-lg rounded-lg">
//             <button
//               className="text-[#0a61aa] md:hidden hover:scale-105 transition-transform duration-300"
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//             >
//               <FaBars className="text-2xl" />
//             </button>

//             <h1 className="text-3xl font-bold text-[#0a61aa] tracking-wide">Hi, Instruktur!</h1>

//             {/* Add a placeholder for potential user profile or settings */}
//           </div>

//           <button
//             className="flex items-center py-2 px-4 bg-gradient-to-r from-[#FF5722] to-[#FF9800] text-white font-semibold rounded-md text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4"
//             onClick={handleDetailClick}
//           >
//             <span className="font-bold">Data Module Kelas</span>
//           </button>

//           <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
//             <button
//               className="flex items-center py-2 px-4 bg-gradient-to-r from-[#0a61aa] to-[#007bbf] text-white font-semibold rounded-md text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
//               onClick={handleBackClick}
//             >
//               <IoArrowBack className="text-2xl mr-2" />
//               <span className="font-bold">Kembali</span>
//             </button>

//             <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
//               <button
//                 className="flex items-center justify-center py-2 px-4 bg-gradient-to-r from-[#0a61aa] to-[#007bbf] text-white font-semibold rounded-md text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
//                 onClick={handleAddClick}
//               >
//                 <IoAddCircleOutline className="mr-2 text-2xl" />
//                 <span className="font-bold">Tambah</span>
//               </button>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
//             <table className="min-w-full table-auto">
//               <thead>
//                 <tr className="bg-gray-200 text-left text-xs md:text-sm font-semibold border-b">
//                   <th className="px-4 py-3">ID</th>
//                   <th className="px-4 py-3">Judul Chapter</th>
//                   <th className="px-4 py-3">Konten</th>
//                   <th className="px-4 py-3">Aksi</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentItems.map((course) => (
//                   <tr key={course.id} className="border-b text-xs md:text-sm hover:bg-gray-50">
//                     <td className="px-4 py-2">{course.id}</td>
//                     <td className="px-4 py-2">{course.judulChapter}</td>
//                     <td className="px-4 py-2">{course.konten}</td>
//                     <td className="px-4 py-2 flex space-x-2">
//                       <Link to="/inst/data-konten">
//                         <button className="py-1 px-2 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2">
//                           Kelola
//                         </button>
//                       </Link>
//                       <button
//                         className="py-1 px-2 bg-blue-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
//                         onClick={() => handleEditClick(course)}
//                       >
//                         Ubah
//                       </button>
//                       <button
//                         className="py-1 px-2 bg-red-700 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
//                         onClick={() => handleDetailClick(course)}
//                       >
//                         Hapus
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="flex justify-between items-center mt-4">
//             <button
//               className={`flex items-center py-2 px-4 rounded-lg ${
//                 currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-[#0a61aa] text-white"
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

//           {/* Pop-up untuk tambah module */}
//           <TambahModule show={showTambahPopup} onClose={() => setShowTambahPopup(false)} />

//           {/* Pop-up untuk ubah module */}
//           <UbahModule
//             show={showUbahPopup}
//             onClose={() => setShowUbahPopup(false)}
//             existingData={selectedCourse}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default InstruktorDataModule;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";
import {
  IoAddCircleOutline,
  IoArrowBack,
  IoArrowBackCircle,
  IoArrowForwardCircle,
} from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import SideBar from "../../components/Sidebar/SidebarInstruktur";
import TambahModule from "../../components/InstrukturComponents/DataModuleComponent/TambahModule";
import UbahModule from "../../components/InstrukturComponents/DataModuleComponent/UbahModule";
import { getDataModule } from "../../redux/actions/instruktorActions";

const InstruktorDataModule = () => {
  const [showTambahPopup, setShowTambahPopup] = useState(false);
  const [showUbahPopup, setShowUbahPopup] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chapter, loading, error } = useSelector((state) => state.chapter);

  const { id } = useParams();
  // const courseId = 1; // Ganti dengan courseId yang sesuai

  // Ambil data chapter dari Redux store
  useEffect(() => {
    dispatch(getDataModule(id)); // Menggunakan courseId sebagai parameter
  }, [dispatch, id]);

  // useEffect(() => {
  //   console.log("Chapter state:", chapter); // Pastikan chapter memiliki data setelah dispatch
  // }, [chapter]);

  const handleAddClick = () => {
    setSelectedCourse(null);
    setShowTambahPopup(true);
  };

  const handleEditClick = (course) => {
    setSelectedCourse(course);
    setShowUbahPopup(true);
  };

  const handleDetailClick = (course) => {
    console.log("Detail clicked for:", course);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const getChaptersWithSequentialId = (chapters) => {
    return chapters.map((chapter, index) => ({
      ...chapter,
      id: index + 1, // Mengatur ID baru berdasarkan urutan
    }));
  };

  // Menggunakan ID yang sudah diatur urutannya
  const sortedChapters = getChaptersWithSequentialId(chapter);

  // Pagination logic
  const totalPages = Math.ceil(sortedChapters.length / itemsPerPage);
  const currentItems = sortedChapters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="flex">
        <div
          className={`fixed inset-0 z-50 transition-transform transform bg-white md:relative md:translate-x-0 md:bg-transparent ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SideBar />
        </div>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        <div className="flex-1 p-4 md:p-6 bg-secondary min-h-screen font-poppins">
          <div className="bg-[#F3F7FB] p-4 flex justify-between items-center mb-4 shadow-lg rounded-lg">
            <button
              className="text-[#0a61aa] md:hidden hover:scale-105 transition-transform duration-300"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FaBars className="text-2xl" />
            </button>

            <h1 className="text-3xl font-bold text-[#0a61aa] tracking-wide">Hi, Instruktur!</h1>
          </div>

          <button
            className="flex items-center py-2 px-4 bg-gradient-to-r from-[#FF5722] to-[#FF9800] text-white font-semibold rounded-md text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4"
            onClick={handleDetailClick}
          >
            <span className="font-bold">Data Chapter Kelas</span>
          </button>

          <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
            <button
              className="flex items-center py-2 px-4 bg-gradient-to-r from-[#0a61aa] to-[#007bbf] text-white font-semibold rounded-md text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              onClick={handleBackClick}
            >
              <IoArrowBack className="text-2xl mr-2" />
              <span className="font-bold">Kembali</span>
            </button>

            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <button
                className="flex items-center justify-center py-2 px-4 bg-gradient-to-r from-[#0a61aa] to-[#007bbf] text-white font-semibold rounded-md text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={handleAddClick}
              >
                <IoAddCircleOutline className="mr-2 text-2xl" />
                <span className="font-bold">Tambah</span>
              </button>
            </div>
          </div>

          {/* Kondisi loading dan error */}
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-left text-xs md:text-sm font-semibold border-b">
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Judul Chapter</th>
                    <th className="px-4 py-3">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((chapter) => (
                    <tr key={chapter.id} className="border-b text-xs md:text-sm hover:bg-gray-50">
                      <td className="px-4 py-2">{chapter.id}</td>
                      <td className="px-4 py-2">{chapter.chapterTitle}</td>
                      <td className="px-4 py-2 flex space-x-2">
                        <Link to={`/inst/data-konten/${chapter.id}`}>
                          <button className="py-1 px-2 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2">
                            Kelola
                          </button>
                        </Link>
                        <button
                          className="py-1 px-2 bg-blue-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
                          onClick={() => handleEditClick(chapter)}
                        >
                          Ubah
                        </button>
                        <button
                          className="py-1 px-2 bg-red-700 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
                          onClick={() => handleDetailClick(chapter)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
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

          {/* Pop-up untuk tambah module */}
          <TambahModule show={showTambahPopup} onClose={() => setShowTambahPopup(false)} />

          {/* Pop-up untuk ubah module */}
          <UbahModule
            show={showUbahPopup}
            onClose={() => setShowUbahPopup(false)}
            existingData={selectedCourse}
          />
        </div>
      </div>
    </>
  );
};

export default InstruktorDataModule;
