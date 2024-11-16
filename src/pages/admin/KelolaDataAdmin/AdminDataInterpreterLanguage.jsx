import { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/SidebarAdmin";
import { FaBars } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLanguages,
  createLanguage,
  updateLanguage,
  deleteLanguage,
} from "../../../redux/actions/adminDataInterLangActions";
import NavbarAdmin from "../../../components/NavbarAdmin";

const AdminDataInterpreterLanguage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redux dispatch and selector
  const dispatch = useDispatch();
  const { languages, loading, error, successMessage } = useSelector(
    (state) => state.interpreterLanguages
  );

  // State for modal visibility and form data
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [formData, setFormData] = useState({
    languageInterpreter: "",
    version: "",
  });

  // State for popup notification
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // Fetch languages on component mount
  useEffect(() => {
    dispatch(fetchLanguages());
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle add language
  const handleAddLanguage = async () => {
    if (
      languages.some(
        (lang) =>
          lang.languageInterpreter.toLowerCase() ===
          formData.languageInterpreter.toLowerCase()
      )
    ) {
      showPopupNotification("Bahasa sudah ada");
      return;
    }
    try {
      await dispatch(createLanguage(formData));
      setFormData({
        languageInterpreter: "",
        version: "",
      });
      setShowModal(false);
      showPopupNotification("Bahasa berhasil ditambahkan");
    } catch (err) {
      showPopupNotification("Terjadi kesalahan saat menambahkan bahasa");
    }
  };

  // Handle edit language
  const handleEditLanguage = async () => {
    try {
      await dispatch(updateLanguage(selectedLanguage.id, formData));
      setFormData({
        languageInterpreter: "",
        version: "",
      });
      setSelectedLanguage(null);
      setIsEditMode(false);
      setShowModal(false);
      showPopupNotification("Bahasa berhasil diubah");
    } catch (err) {
      showPopupNotification("Terjadi kesalahan saat mengubah bahasa");
    }
  };

  // Handle delete language
  const handleDeleteLanguage = async (id) => {
    if (window.confirm("Anda yakin ingin menghapus bahasa ini?")) {
      try {
        await dispatch(deleteLanguage(id));
        showPopupNotification("Bahasa berhasil dihapus");
      } catch (err) {
        showPopupNotification("Terjadi kesalahan saat menghapus bahasa");
      }
    }
  };

  // Open modal for adding new language
  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({
      languageInterpreter: "",
      version: "",
    });
    setSelectedLanguage(null);
    setShowModal(true);
  };

  // Open modal for editing language
  const openEditModal = (language) => {
    setIsEditMode(true);
    setSelectedLanguage(language);
    setFormData({
      languageInterpreter: language.languageInterpreter,
      version: language.version,
    });
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

          {/* Section Data Interpreter Language */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
            <h2 className="flex items-center py-2 px-4 mt-4 bg-gradient-to-r from-[#FF5722] to-[#FF9800] text-white font-semibold rounded-md text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4">
              Data Bahasa Interpreter
            </h2>

            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
              {/* Tambah Bahasa Button */}
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

          {/* Tabel Data Bahasa Interpreter */}
          <div className="overflow-x-auto bg-white p-4">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100 text-left text-xs md:text-sm font-semibold">
                    <th className="px-2 md:px-4 py-2">Nomor</th>
                    <th className="px-2 md:px-4 py-2">Bahasa Interpreter</th>
                    <th className="px-2 md:px-4 py-2">Versi</th>
                    <th className="px-2 md:px-4 py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {languages.map((language, index) => {
                    const rowNumber = index + 1;
                    return (
                      <tr key={index} className="border-t text-xs md:text-sm">
                        <td className="px-2 md:px-4 py-2">{rowNumber}</td>
                        <td className="px-2 md:px-4 py-2">
                          {language.languageInterpreter}
                        </td>
                        <td className="px-2 md:px-4 py-2">{language.version}</td>
                        <td className="px-2 md:px-4 py-2 flex flex-wrap space-x-2">
                          {/* Tombol Ubah */}
                          <button
                            className="py-1 px-2 md:px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
                            onClick={() => openEditModal(language)}
                          >
                            Ubah
                          </button>
                          {/* Tombol Hapus */}
                          <button
                            className="py-1 px-2 md:px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
                            onClick={() => handleDeleteLanguage(language.id)}
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

          {/* Modal for Adding and Editing Language */}
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
                  {isEditMode
                    ? "Ubah Bahasa Interpreter"
                    : "Tambah Bahasa Interpreter"}
                </h2>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    isEditMode ? handleEditLanguage() : handleAddLanguage();
                  }}
                >
                  {/* Language Interpreter Input */}
                  <div className="mb-4">
                    <label className="block mb-1 font-semibold">
                      Bahasa Interpreter
                    </label>
                    <input
                      type="text"
                      name="languageInterpreter"
                      value={formData.languageInterpreter}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-xl"
                      placeholder="Masukkan Bahasa Interpreter"
                      required
                    />
                  </div>

                  {/* Version Input */}
                  <div className="mb-4">
                    <label className="block mb-1 font-semibold">Versi</label>
                    <input
                      type="text"
                      name="version"
                      value={formData.version}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-xl"
                      placeholder="Masukkan Versi"
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

export default AdminDataInterpreterLanguage;
