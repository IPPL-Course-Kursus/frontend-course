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
import NavbarAdmin from "../../../components/NavbarAdmin";


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

  // State for popup notification
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // Fetch level courses on component mount
  useEffect(() => {
    dispatch(getAllLevelCourses());
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
    setFormData({ ...formData, levelName: e.target.value });
  };

  // Handle add level
  const handleAddLevel = async () => {
    if (levelCourses.some((level) => level.levelName.toLowerCase() === formData.levelName.toLowerCase())) {
      showPopupNotification("Level sudah ada");
      return;
    }
    try {
      await dispatch(createLevelCourse(formData.levelName));
      setFormData({ levelName: "" });
      setShowModal(false);
      showPopupNotification("Level berhasil ditambahkan");
    } catch (err) {
      showPopupNotification("Terjadi kesalahan saat menambahkan level");
    }
  };

  // Handle edit level
  const handleEditLevel = async () => {
    try {
      await dispatch(updateLevelCourseById(selectedLevel.id, formData.levelName));
      setFormData({ levelName: "" });
      setSelectedLevel(null);
      setIsEditMode(false);
      setShowModal(false);
      showPopupNotification("Level berhasil diubah");
    } catch (err) {
      showPopupNotification("Terjadi kesalahan saat mengubah level");
    }
  };

  // Handle delete level
  const handleDeleteLevel = async (id) => {
    if (window.confirm("Are you sure you want to delete this level?")) {
      try {
        await dispatch(deleteLevelCourseById(id));
        showPopupNotification("Level berhasil dihapus");
      } catch (err) {
        showPopupNotification("Terjadi kesalahan saat menghapus level");
      }
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
          <NavbarAdmin setSidebarOpen={setSidebarOpen} />
          {/* Section Data Level */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
            <h2 className="flex items-center py-2 px-4 mt-4 bg-gradient-to-r from-[#FF5722] to-[#FF9800] text-white font-semibold rounded-md text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4">
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
                    <th className="px-2 md:px-4 py-2">Nomor</th>
                    <th className="px-2 md:px-4 py-2">Level</th>
                    <th className="px-2 md:px-4 py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {levelCourses.map((level, index) => {
                    const rowNumber = index + 1;
                    return (
                      <tr key={index} className="border-t text-xs md:text-sm">
                        <td className="px-2 md:px-4 py-2">{rowNumber}</td>
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
                    );
                  })}
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

export default AdminDataLevel;
