import React, { useState, useEffect } from "react";
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
import TambahLanguage from "../../../components/Admin/DataLanguage/TambahLanguage";
import UbahLanguage from "../../../components/Admin/DataLanguage/UbahLanguage";
import CategoryDelete from "../../../components/KategoriComponents/CategoryDelete";
import toast from "react-hot-toast";

const AdminDataInterpreterLanguage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redux dispatch and selector
  const dispatch = useDispatch();
  const { languages, loadingFetch, errorFetch } = useSelector(
    (state) => state.interpreterLanguages
  );

  // State for modal visibility and form data
  const [showTambahPopup, setShowTambahPopup] = useState(false);
  const [showUbahPopup, setShowUbahPopup] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  // State for delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [languageToDelete, setLanguageToDelete] = useState(null);

  // Fetch languages on component mount
  useEffect(() => {
    dispatch(fetchLanguages());
  }, [dispatch]);

  // // Handle delete language confirmation
  // const handleDeleteConfirm = () => {
  //   if (languageToDelete) {
  //     dispatch(deleteLanguage(languageToDelete.id))
  //       .then(() => {
  //         // Show success toast
  //         // Assuming you have toast in the deleteLanguage action
  //       })
  //       .catch((error) => {
  //         // Handle error via toast in deleteLanguage action
  //       })
  //       .finally(() => {
  //         setShowDeleteModal(false);
  //         setLanguageToDelete(null);
  //       });
  //   }
  // };

  const handleDeleteConfirm = async () => {
    if (languageToDelete) {
      try {
        await dispatch(deleteLanguage(languageToDelete.id));
  
        // Show success toast
        toast.success("Bahasa berhasil dihapus.", {
          style: {
            borderRadius: "8px",
            background: "#4BB543",
            color: "#fff",
          },
        });
      } catch (error) {
        // Map backend error to frontend message
        let errorMessage = "Gagal menghapus bahasa. Silakan coba lagi.";
  
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          const backendMessage = error.response.data.message.toLowerCase();
  
          if (
            backendMessage.includes("not found") ||
            backendMessage.includes("bahasa tidak ditemukan")
          ) {
            errorMessage = "Bahasa tidak ditemukan.";
          } else {
            errorMessage = error.response.data.message;
          }
        }
  
        // Show error toast
        toast.error(errorMessage, {
          style: {
            borderRadius: "8px",
            background: "#FF3333",
            color: "#fff",
          },
        });
      } finally {
        setShowDeleteModal(false);
        setLanguageToDelete(null);
      }
    }
  };

  // Open modal for adding new language
  const openAddModal = () => {
    setShowTambahPopup(true);
  };

  // Open modal for editing language
  const openEditModal = (language) => {
    setSelectedLanguage(language);
    setShowUbahPopup(true);
  };

  // Open delete confirmation modal
  const openDeleteModal = (language) => {
    setLanguageToDelete(language);
    setShowDeleteModal(true);
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
          {loadingFetch && <p>Loading...</p>}
          {errorFetch && (
            <p className="text-red-500 mb-4">Error: {errorFetch}</p>
          )}

          {/* Tabel Data Bahasa Interpreter */}
          <div className="overflow-x-auto bg-white p-4">
            {!loadingFetch && !errorFetch && (
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
                  {languages && languages.length > 0 ? (
                    languages.map((language, index) => {
                      if (
                        !language ||
                        typeof language.languageInterpreter !== "string" ||
                        typeof language.version !== "string"
                      )
                        return null; // Skip undefined or malformed entries

                      const rowNumber = index + 1;
                      return (
                        <tr key={language.id || index} className="border-t text-xs md:text-sm">
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
                              onClick={() => openDeleteModal(language)}
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        No languages found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Modal for Adding Language */}
          <TambahLanguage
            show={showTambahPopup}
            onClose={() => setShowTambahPopup(false)}
            onSuccess={() => {
            }}
          />

          {/* Modal for Editing Language */}
          {selectedLanguage && (
            <UbahLanguage
              show={showUbahPopup}
              onClose={() => {
                setShowUbahPopup(false);
                setSelectedLanguage(null);
              }}
              onSuccess={() => {
              }}
              existingLanguage={selectedLanguage}
            />
          )}

          {/* Delete Confirmation Modal */}
          <CategoryDelete
            show={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDeleteConfirm}
            itemName={
              languageToDelete
                ? languageToDelete.languageInterpreter
                : "Bahasa Interpreter"
            }
          />
        </div>
      </div>
    </>
    );
};

export default AdminDataInterpreterLanguage;
