import { useState } from "react";
import Sidebar from "../../../components/Sidebar/SidebarAdmin";
import { FaBars } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";

// Komponen utama AdminDataLevel
const AdminDataLevel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // State untuk data level dan pencarian
  const [levels, setLevels] = useState([
    { id: 1, name: "Beginner" },
    { id: 2, name: "Intermediate" },
    { id: 3, name: "Advance" },
  ]);

  const [newLevel, setNewLevel] = useState("");

  // State untuk mengontrol pop-up tambah dan ubah
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);

  // Handle tambah level
  const handleAddLevel = () => {
    if (newLevel.trim()) {
      const newId = levels.length ? levels[levels.length - 1].id + 1 : 1;
      setLevels([...levels, { id: newId, name: newLevel }]);
      setNewLevel(""); // Clear input
    }
  };

  // Handle ubah level
  const handleEditLevel = () => {
    setLevels(
      levels.map((level) => (level.id === selectedLevel.id ? { ...level, name: newLevel } : level))
    );
    setNewLevel(""); // Clear input
    setIsEditMode(false);
    setSelectedLevel(null);
  };

  // Handle hapus level
  const handleDeleteLevel = (id) => {
    setLevels(levels.filter((level) => level.id !== id));
  };

  // Filter data level berdasarkan pencarian

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
            <h2 className="text-lg md:text-xl font-bold text-[#0a61aa]">Data Level Kelas</h2>

            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
              {/* Tombol tambah kategori */}
              <div className="relative">
                <button
                  className="py-1 px-4 bg-[#0a61aa] text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 flex items-center justify-center"
                  onClick={() => {
                    setIsEditMode(false);
                    setNewLevel("");
                    setSelectedLevel(null);
                  }}
                >
                  <IoAddCircleOutline className="mr-2" />
                  Tambah
                </button>
              </div>

              {/* Pencarian */}
              {/* <div className="relative w-full md:w-auto flex items-center">
                <FaSearch className="text-[#173D94] text-lg cursor-pointer" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-[#173D94] rounded-full ml-2 p-1 w-40"
                  placeholder="Cari Nama..."
                />
              </div> */}
            </div>
          </div>

          {/* Tabel Data Level */}
          <div className="overflow-x-auto bg-white p-4">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100 text-left text-xs md:text-sm font-semibold">
                  <th className="px-2 md:px-4 py-2">ID</th>
                  <th className="px-2 md:px-4 py-2">Level</th>
                  <th className="px-2 md:px-4 py-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {levels.map((level) => (
                  <tr key={level.id} className="border-t text-xs md:text-sm">
                    <td className="px-2 md:px-4 py-2">{level.id}</td>
                    <td className="px-2 md:px-4 py-2">{level.name}</td>
                    <td className="px-2 md:px-4 py-2 flex flex-wrap space-x-2">
                      {/* Tombol Ubah */}
                      <button
                        className="py-1 px-2 md:px-4 bg-green-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
                        onClick={() => {
                          setIsEditMode(true);
                          setSelectedLevel(level);
                          setNewLevel(level.name);
                        }}
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
          </div>

          {/* Form Tambah/Ubah Level */}
          {/* <div className="mt-4">
            <input
              type="text"
              value={newLevel}
              onChange={(e) => setNewLevel(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full"
              placeholder="Masukkan Nama Level"
            />
            <button
              onClick={isEditMode ? handleEditLevel : handleAddLevel}
              className="mt-2 py-1 px-4 bg-[#0a61aa] text-white font-semibold rounded-md transition-all duration-300 hover:scale-105"
            >
              {isEditMode ? "Ubah Level" : "Tambah Level"}
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default AdminDataLevel;
