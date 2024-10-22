import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInstructors, addInstructor, updateInstructor, deleteInstructor } from "../../../redux/actions/datainstructorActions";
import { FaSearch, FaBars } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import SideBar from "../../../components/Sidebar/SidebarAdmin";
import TambahInstruktur from "../../../components/InstrukturComponents/TambahInstruktur";
import UbahInstruktur from "../../../components/InstrukturComponents/UbahInstruktur";

const AdminDataInstruktur = () => {
  const dispatch = useDispatch();
  const { instructors, loading, error } = useSelector((state) => state.instructors);

  // State for popups and selected instructor
  const [showTambahPopup, setShowTambahPopup] = useState(false);
  const [showUbahPopup, setShowUbahPopup] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    dispatch(getAllInstructors());
  }, [dispatch]);

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
    if (window.confirm("Apakah Anda yakin ingin menghapus instruktur ini?")) {
      dispatch(deleteInstructor(id));
    }
  };

  const handleCloseTambahPopup = () => {
    setShowTambahPopup(false);
  };

  const handleCloseUbahPopup = () => {
    setShowUbahPopup(false);
  };

  // Filtered instructors based on search value
  const filteredInstructors = instructors.filter((instructor) =>
    instructor.fullName.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
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
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
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
                    <td className="px-4 py-2 text-center">{instructor.fullName}</td>
                    <td className="px-4 py-2 text-center">
                      <img
                        src={instructor.image}
                        alt={instructor.fullName}
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
          )}
        </div>

        {/* Pop-up untuk tambah instruktur */}
        <TambahInstruktur
          show={showTambahPopup}
          onClose={handleCloseTambahPopup}
          addInstructor={(newInstructor) => {
            dispatch(addInstructor(newInstructor));
            handleCloseTambahPopup();
          }}
        />
        

        {/* Pop-up untuk ubah instruktur */}
        <UbahInstruktur
          show={showUbahPopup}
          instructor={selectedInstructor}
          onClose={handleCloseUbahPopup}
          updateInstructor={(updatedInstructor) => {
            dispatch(updateInstructor(selectedInstructor.id, updatedInstructor));
            handleCloseUbahPopup();
          }}
        />
      </div>
    </div>
  );
};

export default AdminDataInstruktur;
