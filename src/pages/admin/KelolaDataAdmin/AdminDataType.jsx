// import { useState } from "react";
// import Sidebar from "../../../components/Sidebar/SidebarAdmin";
// import { FaBars } from "react-icons/fa";
// import { IoAddCircleOutline } from "react-icons/io5";
// import DataTypeUbah from "../../../components/Admin/DataType/DataTypeUbah";
// import DataTypeInput from "../../../components/Admin/DataType/DataTypeInput";

// const AdminDataType = () => {
//   const [showTambahPopup, setShowTambahPopup] = useState(false);
//   const [showUbahPopup, setShowUbahPopup] = useState(false);
//   const [selectedTypes, setSelectedTypes] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // State untuk data level dan pencarian
//   const [types, setTypes] = useState([
//     { id: 1, tipeKelas: "Free" },
//     { id: 2, tipeKelas: "Premium" },
//   ]);

//   const handleAddClick = () => {
//     setSelectedTypes(null);
//     setShowTambahPopup(true);
//   };

//   const handleEditClick = (content) => {
//     setSelectedTypes(content);
//     setShowUbahPopup(true);
//   };

//   const handleDeleteLevel = (id) => {
//     setTypes(types.filter((types) => types.id !== id));
//   };

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
//             {/* Menu button on mobile */}
//             <button
//               className="text-[#0a61aa] md:hidden"
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//             >
//               <FaBars className="text-2xl" />
//             </button>

//             <h1 className="text-2xl font-bold text-[#0a61aa]">Hi, Admin!</h1>
//           </div>

//           {/* Section Data Level */}
//           <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
//             <h2 className="text-lg md:text-xl font-bold text-[#0a61aa]">Data Type</h2>

//             <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
//               {/* Tombol tambah kategori */}
//               <div className="relative">
//                 <button
//                   className="py-1 px-4 bg-[#0a61aa] text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 flex items-center justify-center"
//                   onClick={handleAddClick}
//                 >
//                   <IoAddCircleOutline className="mr-2" />
//                   Tambah
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Tabel Data Level */}
//           <div className="overflow-x-auto bg-white p-4">
//             <table className="min-w-full table-auto">
//               <thead>
//                 <tr className="bg-gray-100 text-left text-xs md:text-sm font-semibold">
//                   <th className="px-2 md:px-4 py-2">ID</th>
//                   <th className="px-2 md:px-4 py-2">Tipe Kelas</th>
//                   <th className="px-2 md:px-4 py-2">Aksi</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {types.map((type) => (
//                   <tr key={type.id} className="border-t text-xs md:text-sm">
//                     <td className="px-2 md:px-4 py-2">{type.id}</td>
//                     <td className="px-2 md:px-4 py-2">{type.tipeKelas}</td>
//                     <td className="px-2 md:px-4 py-2 flex flex-wrap space-x-2">
//                       {/* Tombol Ubah */}
//                       <button
//                         className="py-1 px-2 md:px-4 bg-green-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
//                         onClick={() => handleEditClick(type)}
//                       >
//                         Ubah
//                       </button>
//                       {/* Tombol Hapus */}
//                       <button
//                         className="py-1 px-2 md:px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
//                         onClick={() => handleDeleteLevel(type.id)}
//                       >
//                         Hapus
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Form Tambah/Ubah Level */}
//           <DataTypeInput
//             show={showTambahPopup}
//             onClose={() => setShowUbahPopup(false)}
//             existingData={selectedTypes}
//           />
//           <DataTypeUbah
//             show={showUbahPopup}
//             onClose={() => setShowUbahPopup(false)}
//             existingData={selectedTypes}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// // export default AdminDataType;
// import { useState } from "react";
// import Sidebar from "../../../components/Sidebar/SidebarAdmin";
// import { FaBars } from "react-icons/fa";
// import { IoAddCircleOutline } from "react-icons/io5";
// import DataTypeUbah from "../../../components/Admin/DataType/DataTypeUbah";
// import DataTypeInput from "../../../components/Admin/DataType/DataTypeInput";

// const AdminDataType = () => {
//   const [showTambahPopup, setShowTambahPopup] = useState(false);
//   const [showUbahPopup, setShowUbahPopup] = useState(false);
//   const [selectedTypes, setSelectedTypes] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // State untuk data level
//   const [types, setTypes] = useState([
//     { id: 1, tipeKelas: "Free" },
//     { id: 2, tipeKelas: "Premium" },
//   ]);

//   // Fungsi untuk menambah tipe kelas baru
//   const handleAdd = (newType) => {
//     setTypes((prev) => [
//       ...prev,
//       { id: prev.length + 1, tipeKelas: newType.TipeKelas }, // Menambahkan ID secara otomatis
//     ]);
//   };

//   // Fungsi untuk mengedit tipe kelas
//   const handleEditClick = (content) => {
//     setSelectedTypes(content);
//     setShowUbahPopup(true);
//   };

//   // Fungsi untuk menghapus tipe kelas
//   const handleDeleteLevel = (id) => {
//     setTypes(types.filter((type) => type.id !== id));
//   };

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
//             {/* Menu button on mobile */}
//             <button
//               className="text-[#0a61aa] md:hidden"
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//             >
//               <FaBars className="text-2xl" />
//             </button>

//             <h1 className="text-2xl font-bold text-[#0a61aa]">Hi, Admin!</h1>
//           </div>

//           {/* Section Data Type */}
//           <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
//             <h2 className="text-lg md:text-xl font-bold text-[#0a61aa]">Data Type</h2>

//             <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
//               {/* Tombol tambah type */}
//               <div className="relative">
//                 <button
//                   className="py-1 px-4 bg-[#0a61aa] text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 flex items-center justify-center"
//                   onClick={() => setShowTambahPopup(true)}
//                 >
//                   <IoAddCircleOutline className="mr-2" />
//                   Tambah
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Tabel Data Type */}
//           <div className="overflow-x-auto bg-white p-4">
//             <table className="min-w-full table-auto">
//               <thead>
//                 <tr className="bg-gray-100 text-left text-xs md:text-sm font-semibold">
//                   <th className="px-2 md:px-4 py-2">ID</th>
//                   <th className="px-2 md:px-4 py-2">Tipe Kelas</th>
//                   <th className="px-2 md:px-4 py-2">Aksi</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {types.map((type) => (
//                   <tr key={type.id} className="border-t text-xs md:text-sm">
//                     <td className="px-2 md:px-4 py-2">{type.id}</td>
//                     <td className="px-2 md:px-4 py-2">{type.tipeKelas}</td>
//                     <td className="px-2 md:px-4 py-2 flex flex-wrap space-x-2">
//                       {/* Tombol Ubah */}
//                       <button
//                         className="py-1 px-2 md:px-4 bg-green-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
//                         onClick={() => handleEditClick(type)}
//                       >
//                         Ubah
//                       </button>
//                       {/* Tombol Hapus */}
//                       <button
//                         className="py-1 px-2 md:px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
//                         onClick={() => handleDeleteLevel(type.id)}
//                       >
//                         Hapus
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Form Tambah/Ubah Data */}
//           <DataTypeInput
//             show={showTambahPopup}
//             onClose={() => setShowTambahPopup(false)}
//             onAdd={handleAdd} // Kirim fungsi onAdd untuk menambah data baru
//           />
//           <DataTypeUbah
//             show={showUbahPopup}
//             onClose={() => setShowUbahPopup(false)}
//             existingData={selectedTypes}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminDataType;

// AdminDataType.jsx

import { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/SidebarAdmin";
import { FaBars } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import DataTypeUbah from "../../../components/Admin/DataType/DataTypeUbah";
import DataTypeInput from "../../../components/Admin/DataType/DataTypeInput";

// Import Redux hooks and actions
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTypeCourses,
  deleteTypeCourseById,
} from "../../../redux/actions/typeCourseActions";

const AdminDataType = () => {
  const [showTambahPopup, setShowTambahPopup] = useState(false);
  const [showUbahPopup, setShowUbahPopup] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redux dispatch and selector
  const dispatch = useDispatch();
  const { typeCourses, loading, error } = useSelector(
    (state) => state.typeCourse
  );

  // Fetch type courses on component mount
  useEffect(() => {
    dispatch(getAllTypeCourses());
  }, [dispatch]);

  // Handle edit button click
  const handleEditClick = (type) => {
    setSelectedType(type);
    setShowUbahPopup(true);
  };

  // Handle delete action
  const handleDeleteType = (id) => {
    if (window.confirm("Are you sure you want to delete this type course?")) {
      dispatch(deleteTypeCourseById(id));
    }
  };

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`fixed inset-0 z-50 transition-transform transform bg-white md:relative md:translate-x-0 md:bg-transparent ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
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
          {/* Header */}
          <div className="bg-[#F3F7FB] p-4 flex justify-between items-center mb-4 shadow-sm">
            {/* Menu button on mobile */}
            <button
              className="text-[#0a61aa] md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FaBars className="text-2xl" />
            </button>

            <h1 className="text-2xl font-bold text-[#0a61aa]">Hi, Admin!</h1>
          </div>

          {/* Section Data Type */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
            <h2 className="text-lg md:text-xl font-bold text-[#0a61aa]">
              Data Type
            </h2>

            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
              {/* Tombol tambah kategori */}
              <div className="relative">
                <button
                  className="py-1 px-4 bg-[#0a61aa] text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 flex items-center justify-center"
                  onClick={() => setShowTambahPopup(true)}
                >
                  <IoAddCircleOutline className="mr-2" />
                  Tambah
                </button>
              </div>
            </div>
          </div>

          {/* Tabel Data Type */}
          <div className="overflow-x-auto bg-white p-4">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100 text-left text-xs md:text-sm font-semibold">
                    <th className="px-2 md:px-4 py-2">ID</th>
                    <th className="px-2 md:px-4 py-2">Tipe Kelas</th>
                    <th className="px-2 md:px-4 py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {typeCourses.map((type) => (
                    <tr key={type.id} className="border-t text-xs md:text-sm">
                      <td className="px-2 md:px-4 py-2">{type.id}</td>
                      <td className="px-2 md:px-4 py-2">{type.typeName}</td>
                      <td className="px-2 md:px-4 py-2 flex flex-wrap space-x-2">
                        {/* Tombol Ubah */}
                        <button
                          className="py-1 px-2 md:px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
                          onClick={() => handleEditClick(type)}
                        >
                          Ubah
                        </button>
                        {/* Tombol Hapus */}
                        <button
                          className="py-1 px-2 md:px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
                          onClick={() => handleDeleteType(type.id)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Form Tambah/Ubah Data */}
          <DataTypeInput
            show={showTambahPopup}
            onClose={() => setShowTambahPopup(false)}
          />
          <DataTypeUbah
            show={showUbahPopup}
            onClose={() => setShowUbahPopup(false)}
            existingData={selectedType}
          />
        </div>
      </div>
    </>
  );
};

export default AdminDataType;
