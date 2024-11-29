import { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/SidebarAdmin";
import { FaBars } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import NavbarAdmin from "../../../components/NavbarAdmin";

// Import Redux hooks and actions
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTypeCourses,
  createTypeCourse,
  updateTypeCourseById,
  deleteTypeCourseById,
} from "../../../redux/actions/typeCourseActions";

const AdminDataType = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // State for modal visibility and form data
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [formData, setFormData] = useState({
    typeName: "",
  });

  // State for popup notification
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // Redux dispatch and selector
  const dispatch = useDispatch();
  const { typeCourses, loading, error } = useSelector(
    (state) => state.typeCourse
  );

  // Fetch type courses on component mount
  useEffect(() => {
    dispatch(getAllTypeCourses());
  }, [dispatch]);

  // Show notification popup
  const showPopupNotification = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, typeName: e.target.value });
  };

  // Handle add type
  const handleAddType = async () => {
    if (
      typeCourses.some(
        (type) =>
          type.typeName.toLowerCase() === formData.typeName.toLowerCase()
      )
    ) {
      showPopupNotification("Type sudah ada");
      return;
    }
    try {
      await dispatch(createTypeCourse(formData.typeName));
      setFormData({ typeName: "" });
      setShowModal(false);
      showPopupNotification("Tipe berhasil ditambahkan");
      dispatch(getAllTypeCourses()); // Refresh the list after addition
    } catch (err) {
      showPopupNotification("Terjadi kesalahan saat menambahkan tipe");
    }
  };

  // Handle edit type
  const handleEditType = async () => {
    try {
      await dispatch(
        updateTypeCourseById(selectedType.id, formData.typeName)
      );
      setFormData({ typeName: "" });
      setSelectedType(null);
      setIsEditMode(false);
      setShowModal(false);
      showPopupNotification("Tipe berhasil diubah");
      dispatch(getAllTypeCourses()); // Refresh the list after update
    } catch (err) {
      showPopupNotification("Terjadi kesalahan saat mengubah tipe");
    }
  };

  // Handle delete type
  const handleDeleteType = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this type course?")
    ) {
      try {
        await dispatch(deleteTypeCourseById(id));
        showPopupNotification("Tipe berhasil dihapus");
        dispatch(getAllTypeCourses()); // Refresh the list after deletion
      } catch (err) {
        showPopupNotification("Terjadi kesalahan saat menghapus tipe");
      }
    }
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
          <NavbarAdmin setSidebarOpen={setSidebarOpen} />

          {/* Section Data Type */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
            <h2 className="flex items-center py-2 px-4 mt-4 bg-gradient-to-r from-[#FF5722] to-[#FF9800] text-white font-semibold rounded-md text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4">
              Data Type
            </h2>

            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
              {/* Tambah Tipe Button */}
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
                    <th className="px-2 md:px-4 py-2">Nomor</th>
                    <th className="px-2 md:px-4 py-2">Tipe Kelas</th>
                    <th className="px-2 md:px-4 py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {typeCourses.map((type, index) => {
                    const rowNumber = index + 1;
                    return (
                      <tr
                        key={type.id}
                        className="border-t text-xs md:text-sm"
                      >
                        <td className="px-2 md:px-4 py-2">{rowNumber}</td>
                        <td className="px-2 md:px-4 py-2">
                          {type.typeName}
                        </td>
                        <td className="px-2 md:px-4 py-2 flex flex-wrap space-x-2">
                          {/* Tombol Ubah */}
                          <button
                            className="py-1 px-2 md:px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
                            onClick={() => openEditModal(type)}
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
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Modal for Adding and Editing Type */}
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

          {/* Notification Popup */}
          {showNotification && (
            <div
              className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-10 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg transition-transform duration-500 ease-in-out ${
                showNotification ? "translate-y-0" : "translate-y-full"
              }`}
            >
              {notificationMessage}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDataType;
