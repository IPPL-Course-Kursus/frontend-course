import { useState } from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import SideBar from "../../../components/Sidebar/SidebarAdmin";
import TambahInstruktur from "../../../components/InstrukturComponents/TambahInstruktur";
import UbahInstruktur from "../../../components/InstrukturComponents/UbahInstruktur";

const AdminDataInstruktur = () => {
  // Data instruktur
  const [instructors, setInstructors] = useState([
    {
      id: 1,
      name: "Benedicta",
      photoUrl:
        "https://blog.tempoinstitute.com/wp-content/uploads/2019/07/aperture-black-blur-274973-800x600.jpg",
    },
    {
      id: 2,
      name: "John",
      photoUrl:
        "https://blog.tempoinstitute.com/wp-content/uploads/2019/07/aperture-black-blur-274973-800x600.jpg",
    },
    {
      id: 3,
      name: "Sarah",
      photoUrl:
        "https://blog.tempoinstitute.com/wp-content/uploads/2019/07/aperture-black-blur-274973-800x600.jpg",
    },
    {
      id: 4,
      name: "Michael",
      photoUrl:
        "https://blog.tempoinstitute.com/wp-content/uploads/2019/07/aperture-black-blur-274973-800x600.jpg",
    },
  ]);

  // State for popups
  const [showTambahPopup, setShowTambahPopup] = useState(false);
  const [showUbahPopup, setShowUbahPopup] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  // Sidebar state for mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Search state
  const [searchValue, setSearchValue] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const handleAddClick = () => {
    setSelectedInstructor(null);
    setShowTambahPopup(true);
  };

  const handleEditClick = (instructor) => {
    setSelectedInstructor(instructor);
    setShowUbahPopup(true);
  };

  const handleDeleteInstructor = (id) => {
    const updatedInstructors = instructors.filter((instructor) => instructor.id !== id);
    setInstructors(updatedInstructors);
  };

  // Filtered instructors based on search
  const filteredInstructors = instructors.filter((instructor) =>
    instructor.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`fixed inset-0 z-50 transition-transform transform bg-white md:relative md:translate-x-0 md:bg-transparent ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SideBar />
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main content */}
        <div className="flex-1 p-4 md:p-6 bg-secondary min-h-screen font-poppins">
          {/* Header */}
          <div className="bg-[#F3F7FB] p-4 flex justify-between items-center mb-4 shadow-sm">
            {/* Menu button - visible on mobile */}
            <button
              className="text-[#0a61aa] md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FaBars className="text-2xl" />
            </button>

            <h1 className="text-2xl font-bold text-[#0a61aa]">Hi, Admin!</h1>
          </div>

          {/* Section Data Instruktur */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
            <h2 className="text-lg md:text-xl font-bold text-[#0a61aa]">Data Instruktur</h2>

            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
              {/* Tombol tambah instruktur */}
              <div className="relative">
                <button
                  className="py-1 px-4 bg-[#0a61aa] text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 flex items-center justify-center"
                  onClick={handleAddClick}
                >
                  <IoAddCircleOutline className="mr-2" />
                  Tambah
                </button>
              </div>

              {/* Pencarian */}
              <div className="relative w-full md:w-auto flex items-center">
                <FaSearch
                  className="text-[#173D94] text-lg cursor-pointer"
                  onClick={toggleSearch}
                />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className={`transition-all duration-300 ease-in-out border border-[#173D94] rounded-full ml-2 p-1 ${
                    searchVisible ? "w-40 opacity-100" : "w-0 opacity-0 pointer-events-none"
                  }`}
                  placeholder="Cari Nama..."
                />
              </div>
            </div>
          </div>

          {/* Tabel Data Instruktur */}
          <div className="overflow-x-auto bg-white p-4">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100 text-left text-xs md:text-sm font-semibold">
                  <th className="px-4 py-2 text-center">ID</th>
                  <th className="px-4 py-2 text-center">Nama</th>
                  <th className="px-4 py-2 text-center">Foto</th>
                  <th className="px-4 py-2 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredInstructors.map((instructor, index) => (
                  <tr key={index} className="border-t text-xs md:text-sm">
                    <td className="px-4 py-2 text-center">{instructor.id}</td>
                    <td className="px-4 py-2 text-center">{instructor.name}</td>
                    <td className="px-4 py-2 text-center">
                      <img
                        src={instructor.photoUrl}
                        alt={instructor.name}
                        className="w-16 h-16 object-cover rounded-full mx-auto"
                      />
                    </td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex flex-wrap justify-center space-x-2">
                        {/* Tombol Ubah */}
                        <button
                          className="py-1 px-2 md:px-4 bg-green-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105"
                          onClick={() => handleEditClick(instructor)}
                        >
                          Ubah
                        </button>
                        {/* Tombol Hapus */}
                        <button
                          className="py-1 px-2 md:px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105"
                          onClick={() => handleDeleteInstructor(instructor.id)}
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pop-up untuk tambah instruktur */}
          <TambahInstruktur
            show={showTambahPopup}
            onClose={() => setShowTambahPopup(false)}
            addInstructor={(newInstructor) => {
              const newId = instructors.length + 1;
              setInstructors([...instructors, { id: newId, ...newInstructor }]);
            }}
          />

          {/* Pop-up untuk ubah instruktur */}
          <UbahInstruktur
            show={showUbahPopup}
            onClose={() => setShowUbahPopup(false)}
            existingData={selectedInstructor}
            updateInstructor={(updatedInstructor) => {
              const updatedInstructors = instructors.map((instructor) =>
                instructor.id === updatedInstructor.id ? updatedInstructor : instructor
              );
              setInstructors(updatedInstructors);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default AdminDataInstruktur;
