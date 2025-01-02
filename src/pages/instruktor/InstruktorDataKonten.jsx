// import { useEffect, useState } from "react";
// import { FaBars } from "react-icons/fa";
// import {
//   IoAddCircleOutline,
//   IoArrowBack,
//   IoArrowBackCircle,
//   IoArrowForwardCircle,
// } from "react-icons/io5";
// import DataKontenInput from "../../components/InstrukturComponents/DataKelas/DataKonten/DataKontenInput";
// import DataKontenUbah from "../../components/InstrukturComponents/DataKelas/DataKonten/DataKontenUbah";
// // import DataKontenDetail from "../../components/InstrukturComponents/DataKelas/DataKonten/DataKontenDetail";
// import Sidebar from "../../components/Sidebar/SidebarInstruktur";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteDataKonten, getDataKonten } from "../../redux/actions/instruktorActions";
// import HeadInstruktur from "../../components/InstrukturComponents/HeadInstruktur";
// import toast from "react-hot-toast";

// const InstruktorDataKonten = () => {
//   const [showTambahPopup, setShowTambahPopup] = useState(false);
//   const [showUbahPopup, setShowUbahPopup] = useState(false);
//   // const [showDetailPopup, setShowDetailPopup] = useState(false);
//   const [selectedContent, setSelectedContent] = useState(null);

//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [contentToDelete, setContentToDelete] = useState(null);

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8;

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { content } = useSelector((state) => state.content);
//   const { id } = useParams();

//   useEffect(() => {
//     dispatch(getDataKonten(id));
//   }, [dispatch, id]);

//   const handleAddClick = () => {
//     setSelectedContent({}); // Reset selectedContent saat menambah konten baru
//     setShowTambahPopup(true);
//   };

//   const handleEditClick = (contentItem) => {
//     setSelectedContent(contentItem);
//     setShowUbahPopup(true);
//   };

//   // const handleDetailClick = (contentItem) => {
//   //   setSelectedContent(contentItem);
//   //   setShowDetailPopup(true);
//   // };

//   const handleDelete = (content) => {
//     setContentToDelete(content);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = () => {
//     if (!contentToDelete?.chapterId) {
//       console.error("Chapter ID is required.");
//       return; // Jangan lanjut jika chapterId tidak ada
//     }

//     dispatch(deleteDataKonten(contentToDelete.id, contentToDelete.chapterId))
//       .then(() => {
//         setShowDeleteModal(false); // Tutup modal setelah berhasil
//         dispatch(getDataKonten(id)); // Memuat ulang data setelah penghapusan

//         // Menampilkan toast sukses
//         toast.success("Konten berhasil dihapus!");
//       })
//       .catch((error) => {
//         console.error("Error deleting content:", error);
//         setShowDeleteModal(false);

//         // Menampilkan toast error
//         toast.error(`Gagal menghapus konten: ${error.message}`);
//       });
//   };

//   const handleBackClick = () => {
//     navigate(-1);
//   };

//   const truncateText = (text, maxLength) => {
//     if (text.length > maxLength) {
//       return text.substring(0, maxLength) + "...";
//     }
//     return text;
//   };

//   const totalPages = Math.ceil(content.length / itemsPerPage);
//   const currentItems = Array.isArray(content)
//     ? content.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
//     : [];

//   return (
//     <>
//       <div className="flex">
//         {/* Sidebar */}
//         <div
//           className={`fixed inset-0 z-50 transition-transform transform bg-white md:relative md:translate-x-0 md:bg-transparent ${
//             sidebarOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//         >
//           <Sidebar />
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
//             <button
//               className="text-[#0a61aa] md:hidden"
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//             >
//               <FaBars className="text-2xl" />
//             </button>
//             <HeadInstruktur />
//           </div>

//           <button
//             className="flex items-center py-2 px-4 bg-gradient-to-r from-[#FF5722] to-[#FF9800] text-white font-semibold rounded-md text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4"
//             // onClick={handleDetailClick}
//           >
//             <span className="font-bold">Data Konten Kelas</span>
//           </button>

//           {/* Section Data Kelas */}
//           <div className="flex justify-between items-center mb-4">
//             {/* Tombol Kembali - Mobile dan Web */}
//             <button
//               className="flex items-center py-2 px-4 bg-gradient-to-r from-[#0a61aa] to-[#007bbf] text-white font-semibold rounded-md text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
//               onClick={handleBackClick}
//             >
//               <IoArrowBack className="text-2xl mr-2" />
//               <span className="font-bold">Kembali</span>
//             </button>

//             {/* Tombol Tambah - Mobile dan Web */}
//             <button
//               className="flex items-center justify-center py-2 px-4 bg-gradient-to-r from-[#0a61aa] to-[#007bbf] text-white font-semibold rounded-md text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
//               onClick={handleAddClick}
//             >
//               <IoAddCircleOutline className="mr-2 text-2xl" />
//               <span className="font-bold">Tambah</span>
//             </button>
//           </div>

//           <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
//             <div className="hidden md:block">
//               <table className="min-w-full table-auto">
//                 <thead>
//                   <tr className="bg-gray-200 text-left text-xs md:text-sm font-semibold border-b">
//                     <th className="px-4 py-3">Urutan</th>
//                     <th className="px-4 py-3">Judul Materi</th>
//                     <th className="px-4 py-3">Teks</th>
//                     <th className="px-4 py-3">Video URL</th>
//                     <th className="px-4 py-3">Durasi</th>
//                     <th className="px-4 py-3">Aksi</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentItems.map((content) => (
//                     <tr key={content.id} className="border-t text-xs md:text-sm">
//                       <td className="px-4 py-3">{content.sort}</td>
//                       <td className="px-4 py-3">{content.contentTitle}</td>
//                       <td className="px-4 py-3 max-h-12 overflow-hidden text-ellipsis whitespace-nowrap">
//                         {truncateText(content.teks, 30)}
//                       </td>
//                       <td className="px-4 py-3">{truncateText(content.contentUrl, 60)}</td>
//                       <td className="px-4 py-3">{content.duration}</td>
//                       <td className="px-4 py-3 flex flex-wrap space-x-2">
//                         <button
//                           className="py-1 px-2 md:px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
//                           onClick={() => handleEditClick(content)}
//                         >
//                           Ubah
//                         </button>
//                         {/* <button
//                         className="py-1 px-2 md:px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
//                         onClick={() => handleDetailClick(content)}
//                       >
//                         Detail
//                       </button> */}
//                         <button
//                           className="py-1 px-2 md:px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
//                           onClick={() => handleDelete(content)}
//                         >
//                           Hapus
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <div className="block md:hidden space-y-4">
//               {currentItems.length > 0 ? (
//                 currentItems.map((content) => (
//                   <div key={content.id} className="border rounded-md p-4 shadow-md bg-white">
//                     <div className="flex items-start space-x-4 mb-3">
//                       <div className="flex-1">
//                         <span className="font-semibold text-sm block">Urutan: {content.sort}</span>
//                         <span className="text-sm block">Judul: {content.contentTitle}</span>
//                       </div>
//                     </div>
//                     <div className="text-sm space-y-2">
//                       <div>
//                         <span className="font-semibold">Teks:</span>{" "}
//                         {truncateText(content.teks, 30)}
//                       </div>
//                       <div>
//                         <span className="font-semibold">Video URL:</span>{" "}
//                         {truncateText(content.contentUrl, 60)}
//                       </div>
//                       <div>
//                         <span className="font-semibold">Durasi:</span> {content.duration}
//                       </div>
//                     </div>
//                     <div className="flex space-x-2 mt-4">
//                       <button
//                         className="flex-1 py-2 bg-blue-600 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:bg-blue-700"
//                         onClick={() => handleEditClick(content)}
//                       >
//                         Ubah
//                       </button>
//                       <button
//                         className="flex-1 py-2 bg-red-600 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:bg-red-700"
//                         onClick={() => handleDelete(content)}
//                       >
//                         Hapus
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-center text-gray-500">Tidak ada konten ditemukan.</p>
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

//           {/* Modal Pop-up */}
//           <DataKontenInput
//             show={showTambahPopup}
//             onClose={() => setShowTambahPopup(false)}
//             chapterId={id} // Pass the chapterId (which is obtained from useParams)
//           />
//           <DataKontenUbah
//             show={showUbahPopup}
//             onClose={() => setShowUbahPopup(false)}
//             existingData={selectedContent}
//           />
//           {/* <DataKontenDetail
//             show={showDetailPopup}
//             onClose={() => setShowDetailPopup(false)}
//             contentId={selectedContent ? Number(selectedContent.id) : null}
//           /> */}

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

// export default InstruktorDataKonten;

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
import DataKontenInput from "../../components/InstrukturComponents/DataKelas/DataKonten/DataKontenInput";
import DataKontenUbah from "../../components/InstrukturComponents/DataKelas/DataKonten/DataKontenUbah";
// import DataKontenDetail from "../../components/InstrukturComponents/DataKelas/DataKonten/DataKontenDetail";
import { deleteDataKonten, getDataKonten } from "../../redux/actions/instruktorActions";
import HeadInstruktur from "../../components/InstrukturComponents/HeadInstruktur";
import toast from "react-hot-toast";

const InstrukturDataKonten = () => {
  const [showTambahPopup, setShowTambahPopup] = useState(false);
  const [showUbahPopup, setShowUbahPopup] = useState(false);
  // const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contentToDelete, setContentToDelete] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Destructure content, successMessage, and error from Redux state
  const { content, successMessage, error } = useSelector((state) => state.content);
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

  // Fetch data konten on component mount
  useEffect(() => {
    dispatch(getDataKonten(id));
  }, [dispatch, id]);

  const handleAddClick = () => {
    setSelectedContent({}); // Reset selectedContent saat menambah konten baru
    setShowTambahPopup(true);
  };

  const handleEditClick = (contentItem) => {
    setSelectedContent(contentItem);
    setShowUbahPopup(true);
  };

  // const handleDetailClick = (contentItem) => {
  //   setSelectedContent(contentItem);
  //   setShowDetailPopup(true);
  // };

  const handleDelete = (content) => {
    setContentToDelete(content);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!contentToDelete?.chapterId) {
      console.error("Chapter ID is required.");
      return; // Jangan lanjut jika chapterId tidak ada
    }

    dispatch(deleteDataKonten(contentToDelete.id, contentToDelete.chapterId))
      .then(() => {
        setShowDeleteModal(false); // Tutup modal setelah berhasil
        dispatch(getDataKonten(id)); // Memuat ulang data setelah penghapusan

        // Menampilkan toast sukses
        toast.success("Konten berhasil dihapus!");
      })
      .catch((error) => {
        console.error("Error deleting content:", error);
        setShowDeleteModal(false);

        // Menampilkan toast error
        toast.error(`Gagal menghapus konten: ${error.message}`);
      });
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const totalPages = Math.ceil(content.length / itemsPerPage);
  const currentItems = Array.isArray(content)
    ? content.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
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

        {/* "Data Konten" Label */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
        <h2 className="flex items-center py-2 px-4 mt-4 bg-gradient-to-r from-[#FF5722] to-[#FF9800] text-white font-semibold rounded-md text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4">
          Data Konten Kelas
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

        {/* Table Data Konten */}
        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-left text-xs md:text-sm font-semibold border-b">
                  <th className="px-4 py-3">No</th>
                  <th className="px-4 py-3">Judul Materi</th>
                  <th className="px-4 py-3">Teks</th>
                  <th className="px-4 py-3">Video URL</th>
                  <th className="px-4 py-3">Durasi</th>
                  <th className="px-4 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((contentItem) => (
                  <tr
                    key={contentItem.id} // Unique key
                    className="border-b text-xs md:text-sm hover:bg-gray-50 transition-all duration-300"
                  >
                    <td className="px-4 py-3">{contentItem.sort}</td>
                    <td className="px-4 py-3">{contentItem.contentTitle}</td>
                    <td className="px-4 py-3 max-h-12 overflow-hidden text-ellipsis whitespace-nowrap">
                      {truncateText(contentItem.teks, 30)}
                    </td>
                    <td className="px-4 py-3">
                      {truncateText(contentItem.contentUrl, 60)}
                    </td>
                    <td className="px-4 py-3">{contentItem.duration}</td>
                    <td className="px-4 py-3 flex space-x-2">
                      <button
                        className="py-1 px-2 bg-blue-600 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:bg-blue-700 transform hover:scale-105"
                        onClick={() => handleEditClick(contentItem)}
                      >
                        Ubah
                      </button>
                      {/* <button
                        className="py-1 px-2 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:bg-red-700 transform hover:scale-105"
                        onClick={() => handleDetailClick(contentItem)}
                      >
                        Detail
                      </button> */}
                      <button
                        className="py-1 px-2 bg-red-600 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:bg-red-700 transform hover:scale-105"
                        onClick={() => handleDelete(contentItem)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
                {currentItems && currentItems.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      Tidak ada konten ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="block md:hidden space-y-4">
            {currentItems.length > 0 ? (
              currentItems.map((contentItem) => (
                <div
                  key={contentItem.id}
                  className="border rounded-lg p-5 shadow-md bg-white"
                >
                  {/* Header: No and Chapter Title */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-lg font-bold text-gray-700">
                      {contentItem.sort}. {contentItem.contentTitle}
                    </div>
                  </div>

                  {/* Content Details */}
                  <div className="text-sm space-y-2">
                    <div>
                      <span className="font-semibold">Teks:</span>{" "}
                      {truncateText(contentItem.teks, 30)}
                    </div>
                    <div>
                      <span className="font-semibold">Video URL:</span>{" "}
                      {truncateText(contentItem.contentUrl, 60)}
                    </div>
                    <div>
                      <span className="font-semibold">Durasi:</span> {contentItem.duration}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 mt-4">
                    <button
                      className="flex-1 py-2 bg-green-600 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:bg-green-700 transform hover:scale-105"
                      onClick={() => handleEditClick(contentItem)}
                    >
                      Ubah
                    </button>
                    <button
                      className="flex-1 py-2 bg-red-600 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:bg-red-700 transform hover:scale-105"
                      onClick={() => handleDelete(contentItem)}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Tidak ada konten ditemukan.</p>
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

        {/* Pop-ups for Add and Edit Modals */}
        <DataKontenInput
          show={showTambahPopup}
          onClose={() => setShowTambahPopup(false)}
          chapterId={id} // Pass the chapterId obtained from useParams
        />
        <DataKontenUbah
          show={showUbahPopup}
          onClose={() => setShowUbahPopup(false)}
          existingData={selectedContent}
        />
        {/* <DataKontenDetail
          show={showDetailPopup}
          onClose={() => setShowDetailPopup(false)}
          contentId={selectedContent ? Number(selectedContent.id) : null}
        /> */}

        {/* Delete Confirmation Modal */}
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

export default InstrukturDataKonten;
