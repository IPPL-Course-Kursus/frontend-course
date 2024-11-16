import { useState, useEffect } from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import {
  IoAddCircleOutline,
  IoArrowBackCircle,
  IoArrowForwardCircle,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchAdminCategories,
  deleteCategory,
} from "../../../redux/actions/adminDataKategoriActions";

import SideBar from "../../../components/Sidebar/SidebarAdmin";
import TambahKategori from "../../../components/KategoriComponents/TambahKategori";
import UbahKategori from "../../../components/KategoriComponents/UbahKategori";
import NavbarAdmin from "../../../components/NavbarAdmin";

const AdminDataKategori = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const [showTambahPopup, setShowTambahPopup] = useState(false);
  const [showUbahPopup, setShowUbahPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // State for delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // State for popup notification
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

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
  const { loading, categories = [], error } = useSelector(
    (state) => state.adminDataKategori
  );

  useEffect(() => {
    dispatch(fetchAdminCategories());
  }, [dispatch]);

  const confirmDelete = () => {
    dispatch(deleteCategory(categoryToDelete.id));
    setShowDeleteModal(false);
    showPopupNotification("Kategori berhasil dihapus");
  };

  // Remove undefined or null categories
  const validCategories = categories.filter(
    (category) => category && typeof category.categoryName === "string"
  );

  // 1. Filter categories based on searchValue before pagination
  const filteredCategories = validCategories.filter((category) => {
    const categoryName = category.categoryName.toLowerCase();
    const searchTerm = (searchValue || "").toLowerCase();
    return categoryName.includes(searchTerm);
  });

  // 2. Calculate total pages based on filtered categories
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage) || 1;

  // 3. Adjust currentPage if it exceeds totalPages
  const adjustedCurrentPage = Math.min(currentPage, totalPages);

  // 4. Slice the filtered categories for the current page
  const currentItems = filteredCategories.slice(
    (adjustedCurrentPage - 1) * itemsPerPage,
    adjustedCurrentPage * itemsPerPage
  );

  // 5. Update currentPage when totalPages changes
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Show notification popup
  const showPopupNotification = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
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
          <SideBar />
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

          {/* Section Data Kategori */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
            <h2 className="flex items-center py-2 px-4 mt-4 bg-gradient-to-r from-[#FF5722] to-[#FF9800] text-white font-semibold rounded-md text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4">
              Data Kategori Kelas
            </h2>

            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
              {/* Tambah Kategori Button */}
              <div className="relative">
                <button
                  className="py-1 px-4 bg-[#0a61aa] text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 flex items-center justify-center"
                  onClick={handleAddClick}
                >
                  <IoAddCircleOutline className="mr-2" />
                  Tambah
                </button>
              </div>

              {/* Search Input */}
              <div className="relative w-full md:w-auto flex items-center">
                <FaSearch
                  className="text-[#173D94] text-lg cursor-pointer"
                  onClick={toggleSearch}
                />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value ?? "");
                    setCurrentPage(1); // Reset to first page on search
                  }}
                  className={`transition-all duration-300 ease-in-out border border-[#173D94] rounded-full ml-2 p-1 ${
                    searchVisible
                      ? "w-40 opacity-100"
                      : "w-0 opacity-0 pointer-events-none"
                  }`}
                  placeholder="Cari Nama..."
                />
              </div>
            </div>
          </div>

          {/* Table Data Kategori */}
          <div className="overflow-x-auto bg-white p-4">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
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
                    if (!category || !category.categoryName) return null; // Skip undefined categories
                    const rowNumber =
                      (adjustedCurrentPage - 1) * itemsPerPage + index + 1;
                    return (
                      <tr
                        key={category.id}
                        className="border-t text-xs md:text-sm"
                      >
                        <td className="px-2 md:px-4 py-2">{rowNumber}</td>
                        <td className="px-2 md:px-4 py-2">
                          {category.categoryName}
                        </td>
                        <td className="px-2 md:px-4 py-2">
                          <img
                            src={category.image}
                            alt={category.categoryName}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        </td>
                        <td className="px-2 md:px-4 py-2 flex flex-wrap space-x-2">
                          {/* Edit Button */}
                          <button
                            className="py-1 px-2 md:px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
                            onClick={() => handleEditClick(category)}
                          >
                            Ubah
                          </button>
                          {/* Delete Button */}
                          <button
                            className="py-1 px-2 md:px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
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

          {/* Pagination Controls */}
          {filteredCategories.length > itemsPerPage && (
            <div className="flex justify-between items-center mt-4">
              <button
                className={`flex items-center py-2 px-4 rounded-lg ${
                  adjustedCurrentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#0a61aa] text-white"
                } transition-all duration-300 hover:scale-105`}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={adjustedCurrentPage === 1}
              >
                <IoArrowBackCircle className="mr-2 text-xl" />
                Previous
              </button>

              <span className="text-lg font-semibold">
                Page {adjustedCurrentPage} of {totalPages}
              </span>

              <button
                className={`flex items-center py-2 px-4 rounded-lg ${
                  adjustedCurrentPage === totalPages
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#0a61aa] text-white"
                } transition-all duration-300 hover:scale-105`}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={adjustedCurrentPage === totalPages}
              >
                Next
                <IoArrowForwardCircle className="ml-2 text-xl" />
              </button>
            </div>
          )}

          {/* Pop-up for Add Category */}
          <TambahKategori
            show={showTambahPopup}
            onClose={() => {
              setShowTambahPopup(false);
            }}
            onSuccess={() => {
              dispatch(fetchAdminCategories());
              showPopupNotification("Kategori berhasil ditambahkan");
            }}
          />

          {/* Pop-up for Edit Category */}
          <UbahKategori
            show={showUbahPopup}
            onClose={() => {
              setShowUbahPopup(false);
            }}
            onSuccess={() => {
              dispatch(fetchAdminCategories());
              showPopupNotification("Kategori berhasil diubah");
            }}
            existingData={selectedCategory}
          />

          {/* Delete Confirmation Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-3xl shadow-lg relative w-80">
                <h2 className="text-xl font-bold text-center mb-4">
                  Yakin hapus data?
                </h2>
                <div className="flex justify-around mt-6">
                  <button
                    className="bg-red-600 text-white px-6 py-2 rounded-full font-bold"
                    onClick={confirmDelete}
                  >
                    Hapus
                  </button>
                  <button
                    className="bg-gray-300 px-6 py-2 rounded-full font-bold"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notification Popup */}
          {showNotification && (
            <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-10 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg transition-all duration-500 ease-in-out transform ${showNotification ? 'translate-y-0' : 'translate-y-full'}`">
              {notificationMessage}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDataKategori;
