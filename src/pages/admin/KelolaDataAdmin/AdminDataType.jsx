// src/pages/Admin/DataType/AdminDataType.jsx

import React, { useState, useEffect } from "react"; 
import SidebarAdminR from "../../../components/Sidebar/SidebarAdminR";
import { IoAddCircleOutline, IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import {
  getAllTypeCourses,
  createTypeCourse,
  updateTypeCourseById,
  deleteTypeCourseById,
} from "../../../redux/actions/typeCourseActions";
import NavbarAdmin from "../../../components/NavbarAdmin";
import DeleteType from "../../../components/Admin/DataType/DeleteType";

const AdminDataType = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redux dispatch and selector
  const dispatch = useDispatch();
  const { typeCourses = [], loading, error, successMessage } = useSelector(
    (state) => state.typeCourse
  );

  // State untuk pencarian
  const [searchValue, setSearchValue] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);

  // State untuk modal visibility dan form data
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [formData, setFormData] = useState({
    typeName: "",
  });

  // State untuk delete modal visibility dan type ID to delete
  const [showDelete, setShowDelete] = useState(false);
  const [typeToDelete, setTypeToDelete] = useState(null);

  // Loading state untuk add/edit/delete operations
  const [loadingAction, setLoadingAction] = useState(false);

  // Fetch type courses on component mount
  useEffect(() => {
    dispatch(getAllTypeCourses());
  }, [dispatch]);

  // Handle form input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, typeName: e.target.value });
  };

  // Handle add type
  const handleAddType = async () => {
    // Validasi: Nama tipe tidak boleh berupa angka
    if (!isNaN(formData.typeName)) {
      toast.error("Tidak boleh berupa angka", {
        style: { backgroundColor: "#d93025", color: "#fff" },
      });
      return;
    }

    // Validasi: Nama tipe tidak boleh mengandung kombinasi huruf dan angka
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)/;
    if (regex.test(formData.typeName)) {
      toast.error("Nama tipe tidak boleh mengandung kombinasi huruf dan angka", {
        style: { backgroundColor: "#d93025", color: "#fff" },
      });
      return;
    }

    // Validasi: Nama tipe harus terdiri dari minimal 3 huruf
    if (formData.typeName.length < 3) {
      toast.error("Nama tipe harus terdiri dari minimal 3 huruf", {
        style: { backgroundColor: "#d93025", color: "#fff" },
      });
      return;
    }

    // Validasi: Nama tipe tidak boleh duplikat
    if (
      typeCourses.some(
        (type) =>
          type.typeName.toLowerCase() === formData.typeName.toLowerCase()
      )
    ) {
      toast.error("Tipe sudah ada", {
        style: { backgroundColor: "#d93025", color: "#fff" },
      });
      return;
    }

    setLoadingAction(true);

    try {
      await dispatch(createTypeCourse(formData.typeName));
      setFormData({ typeName: "" });
      setShowModal(false);
      toast.success("Tipe berhasil ditambahkan", {
        style: { backgroundColor: "#4BB543", color: "#fff" },
      });
      dispatch(getAllTypeCourses());
    } catch (err) {
      toast.error("Terjadi kesalahan saat menambahkan tipe", {
        style: { backgroundColor: "#d93025", color: "#fff" },
      });
    } finally {
      setLoadingAction(false);
    }
  };

  // Handle edit type
  const handleEditType = async () => {
    // Validasi: Nama tipe tidak boleh hanya berupa angka
    if (!isNaN(formData.typeName)) {
      toast.error("Nama tipe tidak boleh hanya berupa angka", {
        style: { backgroundColor: "#d93025", color: "#fff" },
      });
      return;
    }

    // Validasi: Nama tipe tidak boleh mengandung angka
    const containsNumber = /\d/.test(formData.typeName);
    if (containsNumber) {
      toast.error("Nama tipe tidak boleh mengandung angka", {
        style: { backgroundColor: "#d93025", color: "#fff" },
      });
      return;
    }

    // Validasi: Nama tipe tidak boleh duplikat kecuali tipe yang sedang diedit
    if (
      typeCourses.some(
        (type) =>
          type.typeName.toLowerCase() === formData.typeName.toLowerCase() &&
          type.id !== selectedType.id
      )
    ) {
      toast.error("Nama tipe sudah ada", {
        style: { backgroundColor: "#d93025", color: "#fff" },
      });
      return;
    }

    setLoadingAction(true);
    try {
      await dispatch(
        updateTypeCourseById(selectedType.id, formData.typeName)
      );
      setFormData({ typeName: "" });
      setSelectedType(null);
      setIsEditMode(false);
      setShowModal(false);
      toast.success("Tipe berhasil diubah", {
        style: { backgroundColor: "#4BB543", color: "#fff" },
      });
      dispatch(getAllTypeCourses());
    } catch (err) {
      toast.error("Terjadi kesalahan saat mengubah tipe", {
        style: { backgroundColor: "#d93025", color: "#fff" },
      });
    } finally {
      setLoadingAction(false);
    }
  };

  // Handle delete type (called from modal)
  const handleDeleteType = (id) => {
    setTypeToDelete(id);
    setShowDelete(true);
  };

  // Confirm deletion
  const confirmDeleteType = async () => {
    setLoadingAction(true); // Mulai loading

    try {
      const response = await dispatch(deleteTypeCourseById(typeToDelete));

      console.log('Delete response:', response); // Log the response to inspect it

      if (response?.success) {
        // Show success notification if deletion was successful
        toast.success("Tipe berhasil dihapus", {
          style: {
            borderRadius: "8px",
            background: "#4BB543",
            color: "#fff",
          },
        });

        // Refresh the list after deletion
        dispatch(getAllTypeCourses());
        setShowDelete(false);
      } else {
        // Handle cases where deletion wasn't successful
        toast.error("Tipe tidak dapat dihapus karena memiliki course", {
          style: {
            borderRadius: "8px",
            background: "#d93025",
            color: "#fff",
          },
        });
        dispatch(getAllTypeCourses());
        setShowDelete(false);
      }
    } catch (err) {
      console.error("Error during deletion:", err);
      const errorMessage = err.response?.data?.message || "Terjadi kesalahan saat menghapus tipe";
      toast.error(errorMessage, {
        style: {
          borderRadius: "8px",
          background: "#d93025",
          color: "#fff",
        },
      });
      dispatch(getAllTypeCourses());
      setShowDelete(false);
    } finally {
      setLoadingAction(false); // Selesai loading
    }
  };

  const cancelDeleteType = () => {
    setShowDelete(false);
    setTypeToDelete(null);
  };

  // Open modal for adding new type
  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({ typeName: "" });
    setSelectedType(null);
    setShowModal(true);
  };

  // Open modal for editing type
  const openEditModal = (type) => {
    setIsEditMode(true);
    setSelectedType(type);
    setFormData({ typeName: type.typeName });
    setShowModal(true);
  };

  // Toggle visibility of search input
  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  // Remove undefined or null types
  const validTypeCourses = typeCourses.filter(
    (type) => type && typeof type.typeName === "string"
  );

  // Filter types based on searchValue before pagination
  const filteredTypes = validTypeCourses.filter((type) => {
    const typeName = type.typeName.toLowerCase();
    const searchTerm = (searchValue || "").toLowerCase();
    return typeName.includes(searchTerm);
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Calculate total pages based on filtered types
  const totalPages = Math.ceil(filteredTypes.length / itemsPerPage) || 1;

  // Adjust currentPage if it exceeds totalPages
  const adjustedCurrentPage = Math.min(currentPage, totalPages);

  // Slice the filtered types for the current page
  const currentItems = filteredTypes.slice(
    (adjustedCurrentPage - 1) * itemsPerPage,
    adjustedCurrentPage * itemsPerPage
  );

  // Update currentPage when totalPages changes
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <>
      {/* Toaster for react-hot-toast */}
      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <div className="flex">
        {/* Sidebar */}
        <SidebarAdminR sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        <div className="flex-1 p-4 md:p-6 bg-secondary min-h-screen font-poppins">
          <NavbarAdmin setSidebarOpen={setSidebarOpen} />

          {/* Section Data Type */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
            <h2 className="flex items-center py-2 px-4 mt-4 bg-gradient-to-r from-[#FF5722] to-[#FF9800] text-white font-semibold rounded-md text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4">
              Data Type
            </h2>

            <div className="flex justify-end items-center space-x-2 w-full md:w-auto">
              {/* Tambah Type Button */}
              <button
                className="py-2 px-4 bg-[#0a61aa] text-white font-semibold rounded-md text-sm transition-all duration-300 hover:scale-105 flex items-center"
                onClick={openAddModal}
              >
                <IoAddCircleOutline className="mr-2" />
                Tambah
              </button>

              {/* Search Input */}
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
                    setCurrentPage(1);
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

          {/* Success and Error Messages */}
          {successMessage && (
            <p className="text-green-500 mb-4">{successMessage}</p>
          )}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Container Tabel tanpa Indikator Loading Global */}
          <div className="overflow-x-auto bg-white p-4 rounded-md shadow-md">
            {/* Always render the table, no global loading indicator */}
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100 text-left text-xs md:text-sm font-semibold">
                  <th className="px-2 md:px-4 py-2">Nomor</th>
                  <th className="px-2 md:px-4 py-2">Tipe Kelas</th>
                  <th className="px-2 md:px-4 py-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredTypes.length === 0 ? (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-2 md:px-4 py-4 text-center text-gray-500 italic"
                    >
                      {loading ? "Loading..." : "Tidak ada tipe ditemukan."}
                    </td>
                  </tr>
                ) : (
                  currentItems.map((type, index) => (
                    <tr
                      key={type.id}
                      className="border-t text-xs md:text-sm"
                    >
                      {/* Row Number */}
                      <td className="px-2 md:px-4 py-2 ">
                        {(adjustedCurrentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-2 md:px-4 py-2 ">
                        {type.typeName}
                      </td>
                      <td className="px-2 md:px-4 py-2 flex space-x-2">
                        {/* Edit Button */}
                        <button
                          className="py-2 px-3 md:px-4 bg-green-500 text-white font-semibold rounded-md text-sm transition-all duration-300 hover:bg-green-600"
                          onClick={() => openEditModal(type)}
                        >
                          Ubah
                        </button>
                        {/* Delete Button */}
                        <button
                          className="py-2 px-3 md:px-4 bg-red-500 text-white font-semibold rounded-md text-sm transition-all duration-300 hover:bg-red-600"
                          onClick={() => handleDeleteType(type.id)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {filteredTypes.length > itemsPerPage && (
            <div className="grid grid-cols-3 items-center mt-4">
              {/* Previous Button */}
              <div className="flex justify-start">
                {adjustedCurrentPage > 1 && (
                  <button
                    className="flex items-center py-2 px-4 rounded-lg bg-[#0a61aa] text-white transition-all duration-300 hover:scale-105"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  >
                    <IoArrowBackCircle className="mr-2 text-xl" />
                    Previous
                  </button>
                )}
              </div>

              {/* Page Indicator */}
              <div className="flex justify-center">
                <span className="text-lg font-semibold">
                  Page {adjustedCurrentPage} of {totalPages}
                </span>
              </div>

              {/* Next Button */}
              <div className="flex justify-end">
                {adjustedCurrentPage < totalPages && (
                  <button
                    className="flex items-center py-2 px-4 rounded-lg bg-[#0a61aa] text-white transition-all duration-300 hover:scale-105"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    Next
                    <IoArrowForwardCircle className="ml-2 text-xl" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Modal for Adding and Editing Type */}
{showModal && (
  <div
    className="fixed inset-0 flex justify-center items-center z-50"
    style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    aria-live="assertive"
    aria-busy={loadingAction}
  >
    <div className="bg-white w-full max-w-lg md:max-w-xl lg:max-w-2xl max-h-[80vh] p-6 rounded-lg shadow-lg relative overflow-y-auto mx-2 sm:mx-0">
      <button
        className="absolute top-2 right-2 text-xl font-bold"
        onClick={() => setShowModal(false)}
        disabled={loadingAction}
        aria-label="Close Modal"
      >
        &times;
      </button>
      <h2 className="text-xl font-bold text-[#0a61aa] mb-4 text-center">
        {isEditMode ? "Ubah Tipe Kelas" : "Tambah Tipe Kelas"}
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          isEditMode ? handleEditType() : handleAddType();
        }}
      >
        {/* Type Name Input */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">
            Tipe Kelas
          </label>
          <input
            type="text"
            name="typeName"
            value={formData.typeName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-xl"
            placeholder="Masukkan Nama Tipe"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            className="py-2 px-6 bg-[#0a61aa] text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={
              loadingAction ||
              !formData.typeName.trim() ||
              (isEditMode &&
                formData.typeName.toLowerCase() ===
                  selectedType?.typeName.toLowerCase())
            }
          >
            {loadingAction
              ? "Loading..."
              : isEditMode
              ? "Ubah"
              : "Tambah"}
          </button>
        </div>
      </form>
    </div>
  </div>
)}


          {/* Delete Confirmation Modal */}
          {showDelete && (
            <DeleteType
              show={showDelete}
              onClose={cancelDeleteType}
              onConfirm={confirmDeleteType}
              loading={loadingAction} // Pass loading state
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDataType;
