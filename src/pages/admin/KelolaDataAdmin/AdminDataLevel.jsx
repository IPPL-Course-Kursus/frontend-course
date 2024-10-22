// import { useState } from "react";
// import Sidebar from "../../../components/Sidebar/SidebarAdmin";
// import { FaBars } from "react-icons/fa";
// import { IoAddCircleOutline } from "react-icons/io5";

// // Komponen utama AdminDataLevel
// const AdminDataLevel = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // State untuk data level dan pencarian
//   const [levels, setLevels] = useState([
//     { id: 1, name: "Beginner" },
//     { id: 2, name: "Intermediate" },
//     { id: 3, name: "Advance" },
//   ]);

//   const [newLevel, setNewLevel] = useState("");

//   // State untuk mengontrol pop-up tambah dan ubah
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [selectedLevel, setSelectedLevel] = useState(null);

//   // Handle tambah level
//   const handleAddLevel = () => {
//     if (newLevel.trim()) {
//       const newId = levels.length ? levels[levels.length - 1].id + 1 : 1;
//       setLevels([...levels, { id: newId, name: newLevel }]);
//       setNewLevel(""); // Clear input
//     }
//   };

//   // Handle ubah level
//   const handleEditLevel = () => {
//     setLevels(
//       levels.map((level) => (level.id === selectedLevel.id ? { ...level, name: newLevel } : level))
//     );
//     setNewLevel(""); // Clear input
//     setIsEditMode(false);
//     setSelectedLevel(null);
//   };

//   // Handle hapus level
//   const handleDeleteLevel = (id) => {
//     setLevels(levels.filter((level) => level.id !== id));
//   };

//   // Filter data level berdasarkan pencarian

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
//             <h2 className="text-lg md:text-xl font-bold text-[#0a61aa]">Data Level Kelas</h2>

//             <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
//               {/* Tombol tambah kategori */}
//               <div className="relative">
//                 <button
//                   className="py-1 px-4 bg-[#0a61aa] text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 flex items-center justify-center"
//                   onClick={() => {
//                     setIsEditMode(false);
//                     setNewLevel("");
//                     setSelectedLevel(null);
//                   }}
//                 >
//                   <IoAddCircleOutline className="mr-2" />
//                   Tambah
//                 </button>
//               </div>

//               {/* Pencarian */}
//               {/* <div className="relative w-full md:w-auto flex items-center">
//                 <FaSearch className="text-[#173D94] text-lg cursor-pointer" />
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="border border-[#173D94] rounded-full ml-2 p-1 w-40"
//                   placeholder="Cari Nama..."
//                 />
//               </div> */}
//             </div>
//           </div>

//           {/* Tabel Data Level */}
//           <div className="overflow-x-auto bg-white p-4">
//             <table className="min-w-full table-auto">
//               <thead>
//                 <tr className="bg-gray-100 text-left text-xs md:text-sm font-semibold">
//                   <th className="px-2 md:px-4 py-2">ID</th>
//                   <th className="px-2 md:px-4 py-2">Level</th>
//                   <th className="px-2 md:px-4 py-2">Aksi</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {levels.map((level) => (
//                   <tr key={level.id} className="border-t text-xs md:text-sm">
//                     <td className="px-2 md:px-4 py-2">{level.id}</td>
//                     <td className="px-2 md:px-4 py-2">{level.name}</td>
//                     <td className="px-2 md:px-4 py-2 flex flex-wrap space-x-2">
//                       {/* Tombol Ubah */}
//                       <button
//                         className="py-1 px-2 md:px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
//                         onClick={() => {
//                           setIsEditMode(true);
//                           setSelectedLevel(level);
//                           setNewLevel(level.name);
//                         }}
//                       >
//                         Ubah
//                       </button>
//                       {/* Tombol Hapus */}
//                       <button
//                         className="py-1 px-2 md:px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
//                         onClick={() => handleDeleteLevel(level.id)}
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
//           {/* <div className="mt-4">
//             <input
//               type="text"
//               value={newLevel}
//               onChange={(e) => setNewLevel(e.target.value)}
//               className="border border-gray-300 p-2 rounded-md w-full"
//               placeholder="Masukkan Nama Level"
//             />
//             <button
//               onClick={isEditMode ? handleEditLevel : handleAddLevel}
//               className="mt-2 py-1 px-4 bg-[#0a61aa] text-white font-semibold rounded-md transition-all duration-300 hover:scale-105"
//             >
//               {isEditMode ? "Ubah Level" : "Tambah Level"}
//             </button>
//           </div> */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminDataLevel;

// AdminDataLevel.jsx

import { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/SidebarAdmin";
import { FaBars } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllLevelCourses,
  createLevelCourse,
  updateLevelCourseById,
  deleteLevelCourseById,
} from "../../../redux/actions/levelCourseActions";

const AdminDataLevel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redux dispatch and selector
  const dispatch = useDispatch();
  const { levelCourses, loading, error, successMessage } = useSelector(
    (state) => state.levelCourse
  );

  // State for modal visibility and form data
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [formData, setFormData] = useState({
    levelName: "",
  });

  // Fetch level courses on component mount
  useEffect(() => {
    dispatch(getAllLevelCourses());
  }, [dispatch]);

  // Handle form input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, levelName: e.target.value });
  };

  // Handle add level
  const handleAddLevel = () => {
    dispatch(createLevelCourse(formData.levelName));
    setFormData({ levelName: "" });
    setShowModal(false);
  };

  // Handle edit level
  const handleEditLevel = () => {
    dispatch(updateLevelCourseById(selectedLevel.id, formData.levelName));
    setFormData({ levelName: "" });
    setSelectedLevel(null);
    setIsEditMode(false);
    setShowModal(false);
  };

  // Handle delete level
  const handleDeleteLevel = (id) => {
    if (window.confirm("Are you sure you want to delete this level?")) {
      dispatch(deleteLevelCourseById(id));
    }
  };

  // Open modal for adding new level
  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({ levelName: "" });
    setSelectedLevel(null);
    setShowModal(true);
  };

  // Open modal for editing level
  const openEditModal = (level) => {
    setIsEditMode(true);
    setSelectedLevel(level);
    setFormData({ levelName: level.levelName });
    setShowModal(true);
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

          {/* Section Data Level */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
            <h2 className="text-lg md:text-xl font-bold text-[#0a61aa]">
              Data Level Kelas
            </h2>

            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
              {/* Tambah Level Button */}
              <div className="relative">
                <button
                  className="py-1 px-4 bg-[#0a61aa] text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 flex items-center justify-center"
                  onClick={openAddModal}
                >
                  <IoAddCircleOutline className="mr-2" />
                  Tambah
                </button>
              </div>
            </div>
          </div>

          {/* Success and Error Messages */}
          {successMessage && (
            <p className="text-green-500 mb-4">{successMessage}</p>
          )}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Tabel Data Level */}
          <div className="overflow-x-auto bg-white p-4">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100 text-left text-xs md:text-sm font-semibold">
                    <th className="px-2 md:px-4 py-2">ID</th>
                    <th className="px-2 md:px-4 py-2">Level</th>
                    <th className="px-2 md:px-4 py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {levelCourses.map((level) => (
                    <tr key={level.id} className="border-t text-xs md:text-sm">
                      <td className="px-2 md:px-4 py-2">{level.id}</td>
                      <td className="px-2 md:px-4 py-2">{level.levelName}</td>
                      <td className="px-2 md:px-4 py-2 flex flex-wrap space-x-2">
                        {/* Tombol Ubah */}
                        <button
                          className="py-1 px-2 md:px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
                          onClick={() => openEditModal(level)}
                        >
                          Ubah
                        </button>
                        {/* Tombol Hapus */}
                        <button
                          className="py-1 px-2 md:px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
                          onClick={() => handleDeleteLevel(level.id)}
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

          {/* Modal for Adding and Editing Level */}
          {showModal && (
            <div
              className="fixed inset-0 flex justify-center items-center z-50"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
            >
              <div className="bg-white w-full max-w-lg max-h-[80vh] p-6 rounded-lg shadow-lg relative overflow-y-auto">
                <button
                  className="absolute top-2 right-2 text-xl font-bold"
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </button>
                <h2 className="text-xl font-bold text-[#0a61aa] mb-4 text-center">
                  {isEditMode ? "Ubah Level Kelas" : "Tambah Level Kelas"}
                </h2>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    isEditMode ? handleEditLevel() : handleAddLevel();
                  }}
                >
                  {/* Level Name Input */}
                  <div className="mb-4">
                    <label className="block mb-1 font-semibold">Level Kelas</label>
                    <input
                      type="text"
                      name="levelName"
                      value={formData.levelName}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-xl"
                      placeholder="Masukkan Nama Level"
                      required
                    />
                  </div>

                  <div className="flex justify-center">
                    <button
                      className="py-2 px-6 bg-[#0a61aa] text-white rounded-xl"
                      type="submit"
                    >
                      {isEditMode ? "Ubah" : "Tambah"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDataLevel;
