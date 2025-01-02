// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { FaBars } from "react-icons/fa";
// import {
//   IoAddCircleOutline,
//   IoArrowBack,
//   IoArrowBackCircle,
//   IoArrowForwardCircle,
// } from "react-icons/io5";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import SideBar from "../../components/Sidebar/SidebarInstruktur";
// import UbahModule from "../../components/InstrukturComponents/DataModuleComponent/UbahModule";
// import { deleteDataModule, getDataModule } from "../../redux/actions/instruktorActions";
// import DataModuleInput from "../../components/InstrukturComponents/DataModuleComponent/DataModuleInput";
// import HeadInstruktur from "../../components/InstrukturComponents/HeadInstruktur";
// import toast from "react-hot-toast";

// const InstruktorDataModule = () => {
//   const [showTambahPopup, setShowTambahPopup] = useState(false);
//   const [showUbahPopup, setShowUbahPopup] = useState(false);
//   const [selectedChapter, setSelectedChapter] = useState(null);

//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [chapterToDelete, setChapterToDelete] = useState(null);

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { chapter } = useSelector((state) => state.chapter);

//   const { id } = useParams();

//   // Ambil data chapter dari Redux store
//   useEffect(() => {
//     dispatch(getDataModule(id));
//   }, [dispatch, id]);

//   console.log("Chapter data:", chapter); // Tambahkan ini untuk debugging

//   const handleAddClick = () => {
//     setSelectedChapter({});
//     setShowTambahPopup(true);
//   };

//   const handleEditClick = (chapter) => {
//     setSelectedChapter(chapter);
//     setShowUbahPopup(true);
//   };

//   const handleDelete = (chapter) => {
//     setChapterToDelete(chapter);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = () => {
//     if (!chapterToDelete?.id) {
//       console.error("Chapter ID is required."); // Pastikan ID chapter ada
//       return; // Hentikan proses jika id chapter tidak ada
//     }

//     // Hapus chapter
//     dispatch(deleteDataModule(chapterToDelete.id))
//       .then(() => {
//         // Tampilkan toast sukses setelah berhasil menghapus
//         toast.success("Chapter berhasil dihapus");

//         setShowDeleteModal(false); // Tutup modal setelah berhasil
//         // Panggil ulang getDataModule untuk mengambil data terbaru
//         //  dispatch(getDataModule(id));
//         window.location.reload();
//       })
//       .catch((error) => {
//         // Tampilkan toast error jika ada kesalahan
//         toast.error("Gagal menghapus chapter");

//         console.error("Error deleting chapter:", error);
//         setShowDeleteModal(false);
//       });
//   };

//   const handleBackClick = () => {
//     navigate(-1);
//   };

//   const totalPages =
//     chapter && Array.isArray(chapter) ? Math.ceil(chapter.length / itemsPerPage) : 0;
//   const currentItems =
//     chapter && Array.isArray(chapter)
//       ? chapter.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
//       : [];

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

//             <HeadInstruktur />
//           </div>

          // <button className="flex items-center py-2 px-4 bg-gradient-to-r from-[#FF5722] to-[#FF9800] text-white font-semibold rounded-md text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4">
          //   <span className="font-bold">Data Chapter Kelas</span>
          // </button>

//           <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
//             {/* Mobile layout: tombol kiri dan kanan */}
//             <div className="flex justify-between w-full md:hidden">
//               <button
//                 className="flex items-center py-2 px-4 bg-gradient-to-r from-[#0a61aa] to-[#007bbf] text-white font-semibold rounded-md text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
//                 onClick={handleBackClick}
//               >
//                 <IoArrowBack className="text-2xl mr-2" />
//                 <span className="font-bold">Kembali</span>
//               </button>
//               <button
//                 className="flex items-center justify-center py-2 px-4 bg-gradient-to-r from-[#0a61aa] to-[#007bbf] text-white font-semibold rounded-md text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ml-2"
//                 onClick={handleAddClick}
//               >
//                 <IoAddCircleOutline className="mr-2 text-2xl" />
//                 <span className="font-bold">Tambah</span>
//               </button>
//             </div>

//             {/* Desktop layout: Back tetap di kiri, Tambah di kanan */}
//             <div className="hidden md:flex md:w-full items-center justify-between">
//               <button
//                 className="flex items-center py-2 px-4 bg-gradient-to-r from-[#0a61aa] to-[#007bbf] text-white font-semibold rounded-md text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
//                 onClick={handleBackClick}
//               >
//                 <IoArrowBack className="text-2xl mr-2" />
//                 <span className="font-bold">Kembali</span>
//               </button>
//               <button
//                 className="flex items-center justify-center py-2 px-4 bg-gradient-to-r from-[#0a61aa] to-[#007bbf] text-white font-semibold rounded-md text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
//                 onClick={handleAddClick}
//               >
//                 <IoAddCircleOutline className="mr-2 text-2xl" />
//                 <span className="font-bold">Tambah</span>
//               </button>
//             </div>
//           </div>

//           {/* Kondisi loading dan error */}

//           <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
//             <div className="hidden md:block">
//               <table className="min-w-full table-auto">
//                 <thead>
//                   <tr className="bg-gray-200 text-left text-xs md:text-sm font-semibold border-b">
//                     <th className="px-4 py-2 w-1/6">ID</th>
//                     <th className="px-4 py-2 w-1/6">Judul Chapter</th>
//                     <th className="px-4 py-2 w-1/6">Aksi</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentItems.map((chapter, index) => (
//                     <tr key={index} className="border-b text-xs md:text-sm hover:bg-gray-50">
//                       <td className="px-4 py-2">{chapter.sort}</td>
//                       <td className="px-4 py-2">{chapter.chapterTitle}</td>
//                       <td className="px-4 py-2 flex space-x-2">
//                         <Link to={`/inst/data-konten/${chapter.id}`}>
//                           <button className="py-1 px-2 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2">
//                             Kelola
//                           </button>
//                         </Link>
//                         <button
//                           className="py-1 px-2 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
//                           onClick={() => handleEditClick(chapter)}
//                         >
//                           Ubah
//                         </button>
//                         <button
//                           className="py-1 px-2 bg-red-700 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
//                           onClick={() => handleDelete(chapter)}
//                         >
//                           Hapus
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <div className=" bg-white p-4 rounded-lg shadow-md block md:hidden space-y-6 ">
//               {currentItems.length > 0 ? (
//                 currentItems.map((chapter) => (
//                   <div key={chapter.id} className="border rounded-md p-4 shadow-md bg-white">
//                     <div className="text-sm space-y-2">
//                       <div>
//                         <span className="font-semibold">ID:</span> {chapter.sort}
//                       </div>
//                       <div>
//                         <span className="font-semibold">Judul Chapter:</span> {chapter.chapterTitle}
//                       </div>
//                     </div>
//                     <div className="flex flex-col space-y-2 mt-4">
//                       <Link to={`/inst/data-konten/${chapter.id}`} className="flex-1">
//                         <button className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:bg-blue-700">
//                           Kelola
//                         </button>
//                       </Link>
//                       <button
//                         className="flex-1 py-2 bg-green-600 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:bg-green-700"
//                         onClick={() => handleEditClick(chapter)}
//                       >
//                         Ubah
//                       </button>
//                       <button
//                         className="flex-1 py-2 bg-red-600 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:bg-red-700"
//                         onClick={() => handleDelete(chapter)}
//                       >
//                         Hapus
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-center text-gray-500">Tidak ada chapter ditemukan.</p>
//               )}
//             </div>
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex justify-between items-center mt-4">
//               <button
//                 className={`flex items-center py-2 px-4 rounded-lg ${
//                   currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-[#0a61aa] text-white"
//                 } transition-all duration-300 hover:scale-105`}
//                 onClick={() => setCurrentPage(currentPage - 1)}
//                 disabled={currentPage === 1}
//               >
//                 <IoArrowBackCircle className="mr-2 text-xl" />
//                 Previous
//               </button>

//               <span className="text-lg font-semibold">
//                 Page {currentPage} of {totalPages}
//               </span>

//               <button
//                 className={`flex items-center py-2 px-4 rounded-lg ${
//                   currentPage === totalPages
//                     ? "bg-gray-300 cursor-not-allowed"
//                     : "bg-[#0a61aa] text-white"
//                 } transition-all duration-300 hover:scale-105`}
//                 onClick={() => setCurrentPage(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//               >
//                 Next
//                 <IoArrowForwardCircle className="ml-2 text-xl" />
//               </button>
//             </div>
//           )}

//           {/* Pop-up untuk tambah module */}
//           <DataModuleInput
//             show={showTambahPopup}
//             onClose={() => setShowTambahPopup(false)}
//             courseId={id}
//           />

//           {/* Pop-up untuk ubah module */}
//           <UbahModule
//             show={showUbahPopup}
//             onClose={() => setShowUbahPopup(false)}
//             existingData={selectedChapter}
//             // chapterId={id} // Pastikan ini valid
//           />

//           {showDeleteModal && (
//             <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-70">
//               {" "}
//               {/* Ubah warna latar belakang */}
//               <div className="bg-white p-6 rounded-lg shadow-lg">
//                 <h2 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
//                 <p className="mb-4">Apakah Anda yakin ingin menghapus konten ini?</p>
//                 <div className="flex justify-end space-x-4">
//                   <button
//                     className="py-2 px-4 bg-red-500 text-white rounded-md"
//                     onClick={confirmDelete}
//                   >
//                     Hapus
//                   </button>
//                   <button
//                     className="py-2 px-4 bg-gray-300 rounded-md"
//                     onClick={() => setShowDeleteModal(false)}
//                   >
//                     Batal
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default InstruktorDataModule;
import { useState, useEffect, useRef } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";
import {
  IoAddCircleOutline,
  IoArrowBack,
  IoArrowBackCircle,
  IoArrowForwardCircle,
} from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/SidebarInstruktur";
import UbahModule from "../../components/InstrukturComponents/DataModuleComponent/UbahModule";
import DataModuleInput from "../../components/InstrukturComponents/DataModuleComponent/DataModuleInput";
import { deleteDataModule, getDataModule } from "../../redux/actions/instruktorActions";
import HeadInstruktur from "../../components/InstrukturComponents/HeadInstruktur";
import toast from "react-hot-toast";

const InstrukturDataModule = () => {
  const [showTambahPopup, setShowTambahPopup] = useState(false);
  const [showUbahPopup, setShowUbahPopup] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [chapterToDelete, setChapterToDelete] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Destructure successMessage and error from Redux state
  const { chapter, successMessage, error } = useSelector((state) => state.chapter);

  const { id } = useParams();

  // Reference for the sidebar to handle click outside
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

  // Fetch data module on component mount
  useEffect(() => {
    dispatch(getDataModule(id));
  }, [dispatch, id]);

  console.log("Chapter data:", chapter); // For debugging

  const handleAddClick = () => {
    setSelectedChapter({});
    setShowTambahPopup(true);
  };

  const handleEditClick = (chapter) => {
    setSelectedChapter(chapter);
    setShowUbahPopup(true);
  };

  const handleDelete = (chapter) => {
    setChapterToDelete(chapter);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!chapterToDelete?.id) {
      console.error("Chapter ID is required.");
      return;
    }

    // Delete chapter
    dispatch(deleteDataModule(chapterToDelete.id))
      .then(() => {
        toast.success("Chapter berhasil dihapus");
        setShowDeleteModal(false);
        dispatch(getDataModule(id)); // Refresh data
      })
      .catch((error) => {
        toast.error("Gagal menghapus chapter");
        console.error("Error deleting chapter:", error);
        setShowDeleteModal(false);
      });
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  // Pagination logic
  const totalPages =
    chapter && Array.isArray(chapter) ? Math.ceil(chapter.length / itemsPerPage) : 0;
  const currentItems =
    chapter && Array.isArray(chapter)
      ? chapter.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      : [];

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 z-50 w-64 min-h-screen transform bg-white transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <Sidebar />
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

        {/* "Data Module" Label */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
        <h2 className="flex items-center py-2 px-4 mt-4 bg-gradient-to-r from-[#FF5722] to-[#FF9800] text-white font-semibold rounded-md text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4">
          Data Chapter Kelas
        </h2>
        </div>
        {/* Section Header: Kembali and Tambah Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
          {/* Mobile Buttons */}
          <div className="flex justify-between w-full md:hidden">
            <button
              className="flex items-center py-2 px-4 bg-gradient-to-r from-[#0a61aa] to-[#007bbf] text-white font-semibold rounded-md text-sm transition-transform duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              onClick={handleBackClick}
            >
              <IoArrowBack className="text-2xl mr-2" />
              <span className="font-bold">Kembali</span>
            </button>
            <button
              className="flex items-center justify-center py-2 px-4 bg-gradient-to-r from-[#0a61aa] to-[#007bbf] text-white font-semibold rounded-md text-sm transition-transform duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ml-2"
              onClick={handleAddClick}
            >
              <IoAddCircleOutline className="mr-2 text-2xl" />
              <span className="font-bold">Tambah</span>
            </button>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex md:w-full items-center justify-between">
            <button
              className="flex items-center py-2 px-4 bg-gradient-to-r from-[#0a61aa] to-[#007bbf] text-white font-semibold rounded-md text-sm transition-transform duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              onClick={handleBackClick}
            >
              <IoArrowBack className="text-2xl mr-2" />
              <span className="font-bold">Kembali</span>
            </button>
            <button
              className="flex items-center justify-center py-2 px-4 bg-gradient-to-r from-[#0a61aa] to-[#007bbf] text-white font-semibold rounded-md text-sm transition-transform duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              onClick={handleAddClick}
            >
              <IoAddCircleOutline className="mr-2 text-2xl" />
              <span className="font-bold">Tambah</span>
            </button>
          </div>
        </div>

        {/* Success and Error Messages */}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Table Data Module */}
        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-left text-xs md:text-sm font-semibold border-b">
                  <th className="px-4 py-2">No</th>
                  <th className="px-4 py-2">Judul Chapter</th>
                  <th className="px-4 py-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((chapter, index) => (
                  <tr
                    key={chapter.id} // Unique key
                    className="border-b text-xs md:text-sm hover:bg-gray-50 transition-all duration-300"
                  >
                    <td className="px-4 py-2">{chapter.sort}</td>
                    <td className="px-4 py-2">{chapter.chapterTitle}</td>
                    <td className="px-4 py-2 flex space-x-2">
                      <Link to={`/inst/data-konten/${chapter.id}`}>
                        <button className="py-1 px-2 bg-blue-600 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:bg-blue-700 transform hover:scale-105">
                          Kelola
                        </button>
                      </Link>
                      <button
                        className="py-1 px-2 bg-green-600 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:bg-green-700 transform hover:scale-105"
                        onClick={() => handleEditClick(chapter)}
                      >
                        Ubah
                      </button>
                      <button
                        className="py-1 px-2 bg-red-600 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:bg-red-700 transform hover:scale-105"
                        onClick={() => handleDelete(chapter)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
                {currentItems && currentItems.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-500">
                      Tidak ada chapter yang ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="block md:hidden space-y-6">
            {currentItems.length > 0 ? (
              currentItems.map((chapter) => (
                <div
                  key={chapter.id}
                  className="border rounded-lg p-5 shadow-lg bg-white"
                >
                  {/* Header: No and Chapter Title */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-lg font-bold text-gray-700">
                      {chapter.sort}. {chapter.chapterTitle}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2 mt-4">
                    <Link to={`/inst/data-konten/${chapter.id}`} className="w-full">
                      <button className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:bg-blue-700 transform hover:scale-105">
                        Kelola
                      </button>
                    </Link>
                    <button
                      className="w-full py-2 bg-green-600 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:bg-green-700 transform hover:scale-105"
                      onClick={() => handleEditClick(chapter)}
                    >
                      Ubah
                    </button>
                    <button
                      className="w-full py-2 bg-red-600 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:bg-red-700 transform hover:scale-105"
                      onClick={() => handleDelete(chapter)}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Tidak ada chapter yang ditemukan.</p>
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
                  className="flex items-center py-2 px-4 rounded-lg bg-[#0a61aa] text-white transition-all duration-300 hover:scale-105"
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
                  className="flex items-center py-2 px-4 rounded-lg bg-[#0a61aa] text-white transition-all duration-300 hover:scale-105"
                  onClick={handleNextPage}
                >
                  Next
                  <IoArrowForwardCircle className="ml-2 text-xl" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Pop-ups for Add, Edit, and Delete Modals */}
        <DataModuleInput
          show={showTambahPopup}
          onClose={() => setShowTambahPopup(false)}
          courseId={id}
        />

        <UbahModule
          show={showUbahPopup}
          onClose={() => setShowUbahPopup(false)}
          existingData={selectedChapter}
        />

        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-70">
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

export default InstrukturDataModule;
