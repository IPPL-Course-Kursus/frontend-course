import { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/SidebarAdminR"; // Retain original import
import { FaSearch } from "react-icons/fa";
import {
  IoAddCircleOutline,
  IoArrowBackCircle,
  IoArrowForwardCircle,
} from "react-icons/io5";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTypeCourses,
  createTypeCourse,
  updateTypeCourseById,
  deleteTypeCourseById,
} from "../../../redux/actions/typeCourseActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DataTypeInput from "../../../components/Admin/DataType/DataTypeInput";
import DataTypeUbah from "../../../components/Admin/DataType/DataTypeUbah";
import DeleteType from "../../../components/Admin/DataType/deletetype";

const AdminDataType = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [formData, setFormData] = useState({ typeName: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const dispatch = useDispatch();
  const { typeCourses = [], loading, error } = useSelector(
    (state) => state.typeCourse
  );

  useEffect(() => {
    dispatch(getAllTypeCourses());
  }, [dispatch]);

  // Function for notifications using Toastify
  const showNotification = (message, type = "success") => {
    const options = {
      style: {
        borderRadius: "8px",
        background: type === "success" ? "#4BB543" : "#FF3333",
        color: "#fff",
      },
    };
    if (type === "success") toast.success(message, options);
    else toast.error(message, options);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, typeName: e.target.value });
  };

  // Handle adding a new type
  const handleAddType = async () => {
    if (!isNaN(formData.typeName)) {
      showNotification("Tidak boleh berupa angka", "error");
      return;
    }

    const regex = /^(?=.*[a-zA-Z])(?=.*\d)/;

    if (regex.test(formData.typeName)) {
      showNotification(
        "Nama tipe tidak boleh mengandung kombinasi huruf dan angka",
        "error"
      );
      return;
    }

    // Check if input has at least 3 characters
    if (formData.typeName.length < 3) {
      showNotification("Nama tipe harus terdiri dari minimal 3 huruf", "error");
      return;
    }

    if (
      typeCourses.some(
        (type) =>
          type.typeName.toLowerCase() === formData.typeName.toLowerCase()
      )
    ) {
      showNotification("Tipe sudah ada", "error");
      return;
    }

    try {
      await dispatch(createTypeCourse(formData.typeName));
      setFormData({ typeName: "" });
      setShowModal(false);
      showNotification("Tipe berhasil ditambahkan");
      dispatch(getAllTypeCourses());
    } catch (err) {
      showNotification("Terjadi kesalahan saat menambahkan tipe", "error");
    }
  };

  // Handle editing an existing type
  const handleEditType = async () => {
    if (!isNaN(formData.typeName)) {
      showNotification("Nama tipe tidak boleh hanya berupa angka", "error");
      return;
    }

    // Check if the type name contains numbers
    const containsNumber = /\d/.test(formData.typeName);
    if (containsNumber) {
      showNotification("Nama tipe tidak boleh mengandung angka", "error");
      return;
    }

    // Check if the new type name already exists
    if (
      typeCourses.some(
        (type) =>
          type.typeName.toLowerCase() === formData.typeName.toLowerCase() &&
          type.id !== selectedType.id
      )
    ) {
      showNotification("Nama tipe sudah ada", "error");
      return;
    }

    try {
      await dispatch(updateTypeCourseById(selectedType.id, formData.typeName));
      setFormData({ typeName: "" });
      setSelectedType(null);
      setIsEditMode(false);
      setShowModal(false);
      showNotification("Tipe berhasil diubah");
      dispatch(getAllTypeCourses());
    } catch (err) {
      showNotification("Terjadi kesalahan saat mengubah tipe", "error");
    }
  };

  // Handle delete type
  const handleDeleteType = (id) => {
    setSelectedType(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteType = async () => {
    try {
      const response = await dispatch(deleteTypeCourseById(selectedType));

      console.log("Delete response:", response);

      if (response?.success) {
        // Show success notification if deletion was successful
        showNotification("Tipe berhasil dihapus");
        // Refresh the list after deletion
        dispatch(getAllTypeCourses());
        setShowDeleteModal(false); // Close the modal
      } else {
        // Handle cases where deletion wasn't successful
        showNotification(
          "Tipe tidak dapat dihapus karena memiliki course",
          "error"
        );
        dispatch(getAllTypeCourses());
        setShowDeleteModal(false);
      }
    } catch (err) {
      console.error("Error during deletion:", err);
      const errorMessage =
        err.response?.data?.message || "Terjadi kesalahan saat menghapus tipe";
      showNotification(errorMessage, "error");
      dispatch(getAllTypeCourses());
      setShowDeleteModal(false);
    }
  };

  const cancelDeleteType = () => {
    setShowDeleteModal(false);
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

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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
            </div>
          </div>

          {/* Success and Error Messages */}
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500 mb-4">Error: {error}</p>}

          {/* Responsive Layout: Table for Desktop, Cards for Mobile */}
          <div className="overflow-x-auto bg-white p-4 rounded-md shadow-md">
            {/* Desktop Table */}
            <div className="hidden md:block">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100 text-left text-xs md:text-sm font-semibold">
                    <th className="px-2 md:px-4 py-2">Nomor</th>
                    <th className="px-2 md:px-4 py-2">Tipe Kelas</th>
                    <th className="px-2 md:px-4 py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {typeCourses && typeCourses.length > 0 ? (
                    typeCourses.map((type, index) => {
                      const rowNumber = index + 1;
                      return (
                        <tr key={type.id} className="border-t text-xs md:text-sm">
                          <td className="px-2 md:px-4 py-2">{rowNumber}</td>
                          <td className="px-2 md:px-4 py-2">{type.typeName}</td>
                          <td className="px-2 md:px-4 py-2 flex space-x-2">
                            {/* Tombol Ubah */}
                            <button
                              className="py-2 px-4 bg-green-600 text-white font-semibold rounded-md text-sm transition-all duration-300 hover:bg-green-700"
                              onClick={() => openEditModal(type)}
                            >
                              Ubah
                            </button>
                            {/* Tombol Hapus */}
                            <button
                              className="py-2 px-4 bg-red-500 text-white font-semibold rounded-md text-sm transition-all duration-300 hover:bg-red-600"
                              onClick={() => handleDeleteType(type.id)}
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center py-4">
                        Tidak ada tipe ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="block md:hidden space-y-4">
              {typeCourses && typeCourses.length > 0 ? (
                typeCourses.map((type, index) => {
                  const rowNumber = index + 1;
                  return (
                    <div key={type.id} className="border rounded-md p-4 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">
                          {rowNumber}. {type.typeName}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        {/* Tombol Ubah */}
                        <button
                          className="py-1 px-3 bg-green-600 text-white font-semibold rounded-md text-sm transition-all duration-300 hover:bg-green-700 flex-1"
                          onClick={() => openEditModal(type)}
                        >
                          Ubah
                        </button>
                        {/* Tombol Hapus */}
                        <button
                          className="py-1 px-3 bg-red-500 text-white font-semibold rounded-md text-sm transition-all duration-300 hover:bg-red-600 flex-1"
                          onClick={() => handleDeleteType(type.id)}
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-gray-500">Tidak ada tipe ditemukan.</p>
              )}
            </div>
          </div>

          {/* Modal for Adding or Editing Type */}
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
                  {isEditMode ? "Ubah Tipe Kelas" : "Tambah Tipe Kelas"}
                </h2>

                {loading ? (
                  <div className="text-center">Loading...</div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      isEditMode ? handleEditType() : handleAddType();
                    }}
                  >
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
                        className={`py-2 px-6 rounded-xl ${
                          // Disable button if no change or input is empty
                          (isEditMode &&
                            formData.typeName.toLowerCase() ===
                              selectedType?.typeName.toLowerCase()) ||
                          formData.typeName.trim() === ""
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#0a61aa]"
                        } text-white`}
                        type="submit"
                        disabled={
                          // Disable button if no change or input is empty
                          (isEditMode &&
                            formData.typeName.toLowerCase() ===
                              selectedType?.typeName.toLowerCase()) ||
                          formData.typeName.trim() === ""
                        }
                      >
                        {isEditMode ? "Ubah" : "Tambah"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteModal && (
            <DeleteType
              show={showDeleteModal}
              onClose={cancelDeleteType}
              onConfirm={confirmDeleteType}
            />
          )}

          {/* Toast Container */}
          <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
      </div>
    </>
    );
};

export default AdminDataType;