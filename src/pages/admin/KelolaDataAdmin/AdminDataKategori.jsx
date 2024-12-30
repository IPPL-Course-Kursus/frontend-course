import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import {
  IoAddCircleOutline,
  IoArrowBackCircle,
  IoArrowForwardCircle,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";

import {
  fetchAdminCategories,
  deleteCategory,
} from "../../../redux/actions/adminDataKategoriActions";

import SidebarAdminR from "../../../components/Sidebar/SidebarAdminR";
import TambahKategori from "../../../components/KategoriComponents/TambahKategori";
import UbahKategori from "../../../components/KategoriComponents/UbahKategori";
import NavbarAdmin from "../../../components/NavbarAdmin";
import CategoryDelete from "../../../components/KategoriComponents/CategoryDelete";
import ErrorModal from "../../../components/KategoriComponents/ErrorModal";

const AdminDataKategori = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const [showTambahPopup, setShowTambahPopup] = useState(false);
  const [showUbahPopup, setShowUbahPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // State for delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // State for error modal
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorCourses, setErrorCourses] = useState([]);

  // Loading state for deletion
  const [isDeleting, setIsDeleting] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Sidebar state for mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const handleAddClick = () => {
    setSelectedCategory(null);
    setShowTambahPopup(true);
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setShowUbahPopup(true);
  };

  const handleDelete = (category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const dispatch = useDispatch();

  // Fetch categories from Redux store
  const { loadingFetch, categories = [], errorFetch } = useSelector(
    (state) => state.adminDataKategori
  );

  useEffect(() => {
    dispatch(fetchAdminCategories());
  }, [dispatch]);

  const confirmDelete = async () => {
    if (categoryToDelete) {
      setIsDeleting(true);
      try {
        await dispatch(deleteCategory(categoryToDelete.id));

        // Show success toast
        toast.success("Kategori berhasil dihapus.", {
          style: {
            borderRadius: "8px",
            background: "#4BB543",
            color: "#fff",
          },
        });
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || "";

        const specificErrorPrefix = "Cannot delete type course: it is referenced by existing courses:";
        const specificErrorEnglish = "Cannot delete type course: it is referenced by existing courses:";

        let coursesList = [];

        // Check for specific error message in Bahasa Indonesia
        if (errorMessage.includes("tidak dapat menghapus jenis kursus") && errorMessage.includes("dengan kursus yang ada.")) {
          // Example: "tidak dapat menghapus jenis kursus karena sudah terhubung dengan kursus yang ada: TESTING 123, Testingting, React Native, Flutter Development, Kotlin for Android Development."
          const splitMessage = errorMessage.split("dengan kursus yang ada:");
          if (splitMessage.length > 1) {
            coursesList = splitMessage[1]
              .replace(".", "") // Remove trailing period
              .split(",")
              .map((course) => course.trim());
          }
        }
        // Check for specific error message in English
        else if (errorMessage.includes(specificErrorPrefix)) {
          // Example: "Cannot delete type course: it is referenced by existing courses: TESTING 123, Testingting, React Native, Flutter Development, Kotlin for Android Development."
          const splitMessage = errorMessage.split(specificErrorPrefix);
          if (splitMessage.length > 1) {
            coursesList = splitMessage[1]
              .replace(".", "") // Remove trailing period
              .split(",")
              .map((course) => course.trim());
          }
        }

        if (coursesList.length > 0) {
          // Set the extracted courses and show the error modal
          setErrorCourses(coursesList);
          setShowErrorModal(true);
        } else {
          // Show generic error toast
          toast.error(
            "Gagal menghapus kategori. Silakan coba lagi.",
            {
              style: {
                borderRadius: "8px",
                background: "#FF3333",
                color: "#fff",
              },
            }
          );
        }
      } finally {
        setIsDeleting(false);
        setShowDeleteModal(false);
        setCategoryToDelete(null);
      }
    }
  };

  // Remove undefined or null categories
  const validCategories = categories.filter(
    (category) => category && typeof category.categoryName === "string"
  );

  // Filter categories based on searchValue before pagination
  const filteredCategories = validCategories.filter((category) => {
    const categoryName = category.categoryName.toLowerCase();
    const searchTerm = (searchValue || "").toLowerCase();
    return categoryName.includes(searchTerm);
  });

  // Calculate total pages based on filtered categories
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage) || 1;

  // Adjust currentPage if it exceeds totalPages
  const adjustedCurrentPage = Math.min(currentPage, totalPages);

  // Slice the filtered categories for the current page
  const currentItems = filteredCategories.slice(
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

          {/* Section Data Kategori */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
            <h2 className="flex items-center py-2 px-4 mt-4 bg-gradient-to-r from-[#FF5722] to-[#FF9800] text-white font-semibold rounded-md text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4">
              Data Kategori Kelas
            </h2>

            <div className="flex justify-end items-center space-x-2 w-full md:w-auto">
              {/* Tambah Kategori Button */}
              <div className="relative">
                <button
                  className="py-2 px-3 md:px-4 bg-[#0a61aa] text-white font-semibold rounded-md text-sm transition-all duration-300 hover:scale-105 flex items-center justify-center"
                  onClick={handleAddClick}
                >
                  <IoAddCircleOutline className="mr-2" />
                  Tambah
                </button>
              </div>

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

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto bg-white p-4 rounded-md shadow-md">
            {loadingFetch ? (
              <p>Loading...</p>
            ) : errorFetch ? (
              <p className="text-red-500">Error: {errorFetch}</p>
            ) : (
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100 text-left text-xs md:text-sm font-semibold">
                    <th className="px-2 md:px-4 py-2">Nomor</th>
                    <th className="px-2 md:px-4 py-2">Nama Kategori</th>
                    <th className="px-2 md:px-4 py-2">Foto</th>
                    <th className="px-2 md:px-4 py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems?.map((category, index) => {
                    if (!category || !category.categoryName) return null;
                    const rowNumber =
                      (adjustedCurrentPage - 1) * itemsPerPage + index + 1;
                    return (
                      <tr
                        key={category.id}
                        className="border-t text-xs md:text-sm"
                      >
                        {/* Row Number */}
                        <td className="px-2 md:px-4 py-2">{rowNumber}</td>
                        <td className="px-2 md:px-4 py-2">
                          {category.categoryName}
                        </td>
                        <td className="px-2 md:px-4 py-2">
                          {category.image ? (
                            <img
                              src={category.image}
                              alt={category.categoryName}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                          ) : (
                            <span className="text-gray-500">No Image</span>
                          )}
                        </td>
                        <td className="px-2 md:px-4 py-2 flex space-x-2">
                          {/* Edit Button */}
                          <button
                            className="py-2 px-3 md:px-4 bg-green-500 text-white font-semibold rounded-md text-sm transition-all duration-300 hover:bg-blue-600"
                            onClick={() => handleEditClick(category)}
                          >
                            Ubah
                          </button>
                          {/* Delete Button */}
                          <button
                            className="py-2 px-3 md:px-4 bg-red-500 text-white font-semibold rounded-md text-sm transition-all duration-300 hover:bg-red-600"
                            onClick={() => handleDelete(category)}
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

          {/* Mobile Cards */}
          <div className="block md:hidden space-y-4">
            {loadingFetch ? (
              <p>Loading...</p>
            ) : errorFetch ? (
              <p className="text-red-500">Error: {errorFetch}</p>
            ) : (
              filteredCategories.length === 0 ? (
                <p className="text-center text-gray-500">Tidak ada kategori ditemukan.</p>
              ) : (
                currentItems.map((category, index) => (
                  <div
                    key={category.id}
                    className="bg-white p-4 rounded-md shadow-md flex flex-col space-y-4"
                  >
                    {/* Number and Category Name */}
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-sm">
                        {((currentPage - 1) * itemsPerPage) + index + 1}. {category.categoryName}
                      </span>
                    </div>

                    {/* Category Image */}
                    <div className="flex justify-center">
                      {category.image ? (
                        <img
                          src={category.image}
                          alt={category.categoryName}
                          className="w-32 h-32 object-cover rounded-md"
                        />
                      ) : (
                        <span className="text-gray-500">No Image</span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center space-x-4">
                      {/* Edit Button */}
                      <button
                        className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md text-sm transition-all duration-300 hover:bg-blue-600"
                        onClick={() => handleEditClick(category)}
                      >
                        Ubah
                      </button>
                      {/* Delete Button */}
                      <button
                        className="py-2 px-4 bg-red-500 text-white font-semibold rounded-md text-sm transition-all duration-300 hover:bg-red-600"
                        onClick={() => handleDelete(category)}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))
              )
            )}
          </div>

          {/* Pagination Controls */}
          {filteredCategories.length > itemsPerPage && (
            <div className="grid grid-cols-3 items-center mt-4">
              {/* Previous Button */}
              <div className="flex justify-start">
                {adjustedCurrentPage > 1 && (
                  <button
                    className={`flex items-center py-2 px-4 rounded-lg bg-[#0a61aa] text-white transition-all duration-300 hover:scale-105`}
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
                    className={`flex items-center py-2 px-4 rounded-lg bg-[#0a61aa] text-white transition-all duration-300 hover:scale-105`}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    Next
                    <IoArrowForwardCircle className="ml-2 text-xl" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Pop-up for Add Category */}
          <TambahKategori
            show={showTambahPopup}
            onClose={() => {
              setShowTambahPopup(false);
            }}
            onSuccess={() => {
              // Optional: Refresh categories or perform additional actions
            }}
          />

          {/* Conditionally Render Pop-up for Edit Category */}
          {showUbahPopup && selectedCategory && (
            <UbahKategori
              show={showUbahPopup}
              onClose={() => {
                setShowUbahPopup(false);
              }}
              onSuccess={() => {
                // Optional: Refresh categories or perform additional actions
              }}
              existingData={selectedCategory}
            />
          )}

          {/* Delete Confirmation Modal */}
          <CategoryDelete
            show={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={confirmDelete}
            isDeleting={isDeleting}
          />

          {/* Error Modal */}
          <ErrorModal
            show={showErrorModal}
            onClose={() => setShowErrorModal(false)}
            title="Gagal menghapus kategori"
            message="Kategori sudah digunakan oleh:"
            courses={errorCourses}
          />

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

export default AdminDataKategori;
