import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInstructors, addInstructor, updateInstructor, deleteInstructor } from "../../../redux/actions/datainstructorActions";
import { IoAddCircleOutline } from "react-icons/io5";
import SideBar from "../../../components/Sidebar/SidebarAdmin";
import TambahInstruktur from "../../../components/InstrukturComponents/TambahInstruktur";
import UbahInstruktur from "../../../components/InstrukturComponents/UbahInstruktur";

const AdminDataInstruktur = () => {
  const dispatch = useDispatch();
  const { instructors, loading, error } = useSelector((state) => state.instructors);

  // State untuk menampilkan popup dan instruktur terpilih
  const [showTambahPopup, setShowTambahPopup] = useState(false);
  const [showUbahPopup, setShowUbahPopup] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(getAllInstructors());
  }, [dispatch]);

  // Handler untuk membuka popup Tambah
  const handleAddClick = () => {
    setSelectedInstructor(null);
    setShowTambahPopup(true);
  };

  // Handler untuk membuka popup Edit
  const handleEditClick = (instructor) => {
    setSelectedInstructor(instructor);
    setShowUbahPopup(true);
  };

  // Handler untuk menghapus instruktur
  const handleDeleteInstructor = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus instruktur ini?")) {
      dispatch(deleteInstructor(id));
    }
  };

  // Menutup popup Tambah
  const handleCloseTambahPopup = () => {
    setShowTambahPopup(false);
  };

  // Menutup popup Ubah
  const handleCloseUbahPopup = () => {
    setShowUbahPopup(false);
  };

  // Filter berdasarkan input pencarian
  const filteredInstructors = instructors.filter((instructor) =>
    instructor.fullName.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="flex">
      {/* Sidebar */}
      <SideBar />

      {/* Main content */}
      <div className="flex-1 p-4 bg-secondary min-h-screen font-poppins">
        <h2 className="text-lg md:text-xl font-bold text-[#0a61aa]">Data Instruktur</h2>

        {/* Input pencarian */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Cari instruktur..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="border px-4 py-2 rounded-md w-full"
          />
        </div>

        {/* Tombol tambah instruktur */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleAddClick}
            className="flex items-center py-1 px-3 bg-blue-500 text-white rounded-md text-xs md:text-sm font-semibold"
          >
            <IoAddCircleOutline className="mr-2" /> Tambah Instruktur
          </button>
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
                {filteredInstructors.map((instructor) => (
                  <tr key={instructor.id} className="border-t text-xs md:text-sm">
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
                      <button
                        className="py-1 px-2 bg-green-500 text-white font-semibold rounded-md text-xs"
                        onClick={() => handleEditClick(instructor)}
                      >
                        Ubah
                      </button>
                      <button
                        className="py-1 px-2 bg-red-500 text-white font-semibold rounded-md text-xs"
                        onClick={() => handleDeleteInstructor(instructor.id)}
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
      </div>

      {/* Popup Tambah Instruktur */}
      {showTambahPopup && (
        <TambahInstruktur
          show={showTambahPopup}
          onClose={handleCloseTambahPopup}
          onSave={(newInstructor) => {
            dispatch(addInstructor(newInstructor));
            handleCloseTambahPopup();
          }}
        />
      )}

      {/* Popup Ubah Instruktur */}
      {showUbahPopup && (
        <UbahInstruktur
          show={showUbahPopup}
          instructor={selectedInstructor}
          onClose={handleCloseUbahPopup}
          onSave={(updatedInstructor) => {
            dispatch(updateInstructor(selectedInstructor.id, updatedInstructor));
            handleCloseUbahPopup();
          }}
        />
      )}
    </div>
  );
};

export default AdminDataInstruktur;
