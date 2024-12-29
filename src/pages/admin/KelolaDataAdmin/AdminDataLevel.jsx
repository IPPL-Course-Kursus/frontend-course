import { useState, useEffect } from "react"; 
import Sidebar from "../../../components/Sidebar/SidebarAdminR";
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllLevelCourses,
  createLevelCourse,
  updateLevelCourseById,
  deleteLevelCourseById,
} from "../../../redux/actions/levelCourseActions";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { toast, Toaster } from "react-hot-toast";
import DataLevelDelete from "../../../components/Admin/DataLevel/DataLevelDelete";

const AdminDataLevel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redux dispatch and selector
  const dispatch = useDispatch();
  const { levelCourses = [], loading, error, successMessage } = useSelector(
    (state) => state.levelCourse
  );

  // State for modal visibility and form data
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [formData, setFormData] = useState({
    levelName: "",
  });

  // State for delete modal visibility and level ID to delete
  const [showDelete, setShowDelete] = useState(false);
  const [levelToDelete, setLevelToDelete] = useState(null);

  // Fetch level courses on component mount
  useEffect(() => {
    dispatch(getAllLevelCourses());
  }, [dispatch]);

  // Handle form input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, levelName: e.target.value });
  };

  // Loading state for add/edit operations
  const [loadingTambah, setLoadingTambah] = useState(false);

  // Handle add level
  const handleAddLevel = async () => {
    if (!formData.levelName.trim()) {
      toast.error("Nama level tidak boleh kosong", {
        style: { backgroundColor: "#d93025", color: "#fff" },
      });
      return;
    }

    if (
      levelCourses.some(
        (level) =>
          level.levelName.toLowerCase() === formData.levelName.toLowerCase()
      )
    ) {
      toast.error("Level sudah ada", {
        style: { backgroundColor: "#d93025", color: "#fff" },
      });
      return;
    }

    setLoadingTambah(true);

    try {
      await dispatch(createLevelCourse(formData.levelName));
      setFormData({ levelName: "" });
      setShowModal(false);
      toast.success("Level berhasil ditambahkan", {
        style: { backgroundColor: "#4BB543", color: "#fff" },
      });
      dispatch(getAllLevelCourses());
    } catch (err) {
      toast.error("Terjadi kesalahan saat menambahkan level", {
        style: { backgroundColor: "#d93025", color: "#fff" },
      });
    } finally {
      setLoadingTambah(false);
    }
  };

  // Handle edit level
  const handleEditLevel = async () => {
    if (!formData.levelName.trim()) {
      toast.error("Nama level tidak boleh kosong", {
        style: { backgroundColor: "#d93025", color: "#fff" },
      });
      return;
    }

    if (
      levelCourses.some(
        (level) =>
          level.levelName.toLowerCase() === formData.levelName.toLowerCase() &&
          level.id !== selectedLevel.id
      )
    ) {
      toast.error("Nama level sudah ada", {
        style: { backgroundColor: "#d93025", color: "#fff" },
      });
      return;
    }

    setLoadingTambah(true);
    try {
      await dispatch(
        updateLevelCourseById(selectedLevel.id, formData.levelName)
      );
      setFormData({ levelName: "" });
      setSelectedLevel(null);
      setIsEditMode(false);
      setShowModal(false);
      toast.success("Level berhasil diubah", {
        style: { backgroundColor: "#4BB543", color: "#fff" },
      });
      dispatch(getAllLevelCourses());
    } catch (err) {
      toast.error("Terjadi kesalahan saat mengedit level", {
        style: { backgroundColor: "#d93025", color: "#fff" },
      });
    } finally {
      setLoadingTambah(false);
    }
  };

  // Handle delete level (called from modal)
  const handleDeleteLevel = (id) => {
    setLevelToDelete(id);
    setShowDelete(true);
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

  // Close the delete modal
  const closeDeleteModal = () => {
    setShowDelete(false);
    setLevelToDelete(null);
  };

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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
              Data Level
            </h2>

            <div className="flex justify-end items-center space-x-2 w-full md:w-auto">
              {/* Tambah Level Button */}
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
          {successMessage && (
            <p className="text-green-500 mb-4">{successMessage}</p>
          )}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Responsive Layout: Table for Desktop, Cards for Mobile */}
          <div className="overflow-x-auto bg-white p-4 rounded-md shadow-md">
            {/* Desktop Table */}
            <div className="hidden md:block">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100 text-left text-xs md:text-sm font-semibold">
                    <th className="px-2 md:px-4 py-2">Nomor</th>
                    <th className="px-2 md:px-4 py-2">Level</th>
                    <th className="px-2 md:px-4 py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {levelCourses && levelCourses.length > 0 ? (
                    levelCourses.map((level, index) => {
                      const rowNumber = index + 1;
                      return (
                        <tr key={level.id} className="border-t text-xs md:text-sm">
                          <td className="px-2 md:px-4 py-2">{rowNumber}</td>
                          <td className="px-2 md:px-4 py-2">{level.levelName}</td>
                          <td className="px-2 md:px-4 py-2 flex space-x-2">
                            {/* Tombol Ubah */}
                            <button
                              className="py-1 px-4 bg-green-600 text-white font-semibold rounded-md text-sm transition-all duration-300 hover:bg-green-700"
                              onClick={() => openEditModal(level)}
                            >
                              Ubah
                            </button>
                            {/* Tombol Hapus */}
                            <button
                              className="py-1 px-4 bg-red-500 text-white font-semibold rounded-md text-sm transition-all duration-300 hover:bg-red-600"
                              onClick={() => handleDeleteLevel(level.id)}
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
                        Tidak ada level ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="block md:hidden space-y-4">
              {levelCourses && levelCourses.length > 0 ? (
                levelCourses.map((level, index) => {
                  const rowNumber = index + 1;
                  return (
                    <div key={level.id} className="border rounded-md p-4 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">
                          {rowNumber}. {level.levelName}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        {/* Tombol Ubah */}
                        <button
                          className="py-1 px-3 bg-green-600 text-white font-semibold rounded-md text-sm transition-all duration-300 hover:bg-green-700 flex-1"
                          onClick={() => openEditModal(level)}
                        >
                          Ubah
                        </button>
                        {/* Tombol Hapus */}
                        <button
                          className="py-1 px-3 bg-red-500 text-white font-semibold rounded-md text-sm transition-all duration-300 hover:bg-red-600 flex-1"
                          onClick={() => handleDeleteLevel(level.id)}
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-gray-500">Tidak ada level ditemukan.</p>
              )}
            </div>
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
                    <label className="block mb-1 font-semibold">
                      Level Kelas
                    </label>
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
                      className="py-2 px-6 bg-[#0a61aa] text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      type="submit"
                      disabled={
                        loadingTambah ||
                        !formData.levelName.trim() ||
                        (isEditMode &&
                          formData.levelName.toLowerCase() ===
                            selectedLevel?.levelName.toLowerCase())
                      }
                    >
                      {loadingTambah
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
            <DataLevelDelete
              show={showDelete}
              onClose={closeDeleteModal}
              levelId={levelToDelete}
            />
          )}

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
        </div>
      </div>
    </>
    );
  };

  export default AdminDataLevel;
