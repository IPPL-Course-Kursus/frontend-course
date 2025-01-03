import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllInstructors,
  addInstructor,
  deleteInstructor,
} from "../../../redux/actions/datainstructorActions";
import { FaSearch } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import SideBar from "../../../components/Sidebar/SidebarAdminR";
import TambahInstruktur from "../../../components/InstrukturComponents/TambahInstruktur";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

const AdminDataInstruktur = () => {
  const dispatch = useDispatch();
  const { instructors, loadingFetch, loadingOperation, error } = useSelector(
    (state) => state.instructors
  );

  const [showTambahPopup, setShowTambahPopup] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // State lokal tidak diperlukan untuk loading karena sudah dihandle oleh Redux

  const itemsPerPage = 7;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllInstructors());
        toast.dismiss();
        toast.success("Data instruktur berhasil ditampilkan", {
          style: {
            borderRadius: "8px",
            background: "#4BB543",
            color: "#fff",
          },
        });
      } catch (error) {
        toast.dismiss();
        toast.error("Gagal memuat data instruktur. Silakan coba lagi.", {
          style: {
            borderRadius: "8px",
            background: "#FF3333",
            color: "#fff",
          },
        });
      }
    };

    fetchData();
  }, [dispatch]);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const handleAddClick = () => {
    setShowTambahPopup(true);
  };

  const handleDeleteInstructor = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data instruktur ini akan dihapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await dispatch(deleteInstructor(id));
          await dispatch(getAllInstructors());
          setTimeout(() => {
	    toast.dismiss();
	  }, 2000);
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "Gagal menghapus instruktur. Silakan coba lagi.";
          toast.dismiss();
          toast.error(errorMessage, {
            style: {
              borderRadius: "8px",
              background: "#FF3333",
              color: "#fff",
            },
          });
          console.error("Error deleting instructor:", errorMessage);
          Swal.showValidationMessage(errorMessage);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  const handleCloseTambahPopup = () => {
    setShowTambahPopup(false);
  };

  const handleAddInstructor = async (newInstructor) => {
    try {
      await dispatch(addInstructor(newInstructor));
      await dispatch(getAllInstructors());
      toast.dismiss();
      handleCloseTambahPopup();
    } catch (error) {
      console.error("Error adding instructor:", error);
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan instruktur. Silakan coba lagi nanti.";
      toast.dismiss();
      toast.error(errorMessage, {
        style: {
          borderRadius: "8px",
          background: "#FF3333",
          color: "#fff",
        },
      });
    }
  };

  const filteredInstructors = (instructors || []).filter(
    (instructor) =>
      instructor &&
      instructor.fullName &&
      instructor.fullName.toLowerCase().includes(searchValue.toLowerCase())
  );

  const currentItems = filteredInstructors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex">
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className="flex-1 p-4 md:p-6 bg-secondary min-h-screen font-poppins">
        <NavbarAdmin setSidebarOpen={setSidebarOpen} />

        <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
          <h2 className="flex items-center py-2 px-4 mt-4 bg-gradient-to-r from-[#FF5722] to-[#FF9800] text-white font-semibold rounded-md text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4">
            Data Instruktur
          </h2>

          <div className="flex justify-end items-center space-x-2 w-full md:w-auto">
            <button
              className={`py-2 px-3 md:px-4 bg-[#0a61aa] text-white font-semibold rounded-md text-sm transition-all duration-300 hover:scale-105 flex items-center justify-center ${
                loadingOperation ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleAddClick}
              disabled={loadingOperation}
            >
              <IoAddCircleOutline className="mr-2" />
              {loadingOperation ? "Memproses..." : "Tambah"}
            </button>

            <div className="relative flex items-center">
              <FaSearch
                className="text-[#173D94] text-lg cursor-pointer"
                onClick={toggleSearch}
              />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value ?? "");
                  setCurrentPage(1); // Reset ke halaman pertama saat pencarian
                }}
                className={`transition-all duration-300 ease-in-out border border-[#173D94] rounded-full ml-2 p-2 text-sm ${
                  searchVisible
                    ? "w-40 opacity-100"
                    : "w-0 opacity-0 pointer-events-none"
                }`}
                placeholder="Cari Nama..."
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto bg-white p-4">
          {loadingFetch ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
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
                {filteredInstructors.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-4 text-center text-gray-500 italic"
                    >
                      Instruktur tidak ditemukan.
                    </td>
                  </tr>
                ) : (
                  currentItems.map((instructor, index) => (
                    <tr key={instructor.id} className="border-t text-xs md:text-sm">
                      <td className="px-4 py-2 text-center">{index + 1}</td>
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
                          className={`py-1 px-2 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 ${
                            loadingOperation ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                          onClick={() => handleDeleteInstructor(instructor.id)}
                          disabled={loadingOperation}
                        >
                          {loadingOperation ? "Memproses..." : "Hapus"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        <TambahInstruktur
          show={showTambahPopup}
          onClose={handleCloseTambahPopup}
          addInstructor={handleAddInstructor}
          // Tidak perlu lagi menggunakan isAdding karena loading dihandle oleh Redux
        />
      </div>
    </div>
  );
};

export default AdminDataInstruktur;
