import { useState } from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import SideBar from "../../../components/Sidebar/SidebarAdmin";
import TambahKategori from "../../../components/KategoriComponents/TambahKategori";
import UbahKategori from "../../../components/KategoriComponents/UbahKategori";

const AdminDataKategori = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const [showTambahPopup, setShowTambahPopup] = useState(false);
  const [showUbahPopup, setShowUbahPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // State for delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

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

  const confirmDelete = () => {
    // Logic to delete category (e.g., send delete request to API)
    console.log("Hapus kategori:", categoryToDelete);
    setShowDeleteModal(false);
  };

  // Data for categories
  const [categories] = useState([
    {
      id: 1,
      name: "Web Development",
      photo:
        "https://blog.tempoinstitute.com/wp-content/uploads/2019/07/aperture-black-blur-274973-800x600.jpg",
      published: true,
      pengajar: "John Doe",
    },
    {
      id: 2,
      name: "UI/UX Design",
      photo:
        "https://blog.tempoinstitute.com/wp-content/uploads/2019/07/aperture-black-blur-274973-800x600.jpg",
      published: true,
      pengajar: "Jane Smith",
    },
    {
      id: 3,
      name: "Android Development",
      photo:
        "https://blog.tempoinstitute.com/wp-content/uploads/2019/07/aperture-black-blur-274973-800x600.jpg",
      published: true,
      pengajar: "John Doe",
    },
    {
      id: 4,
      name: "Data Science",
      photo:
        "https://blog.tempoinstitute.com/wp-content/uploads/2019/07/aperture-black-blur-274973-800x600.jpg",
      published: true,
      pengajar: "Jane Smith",
    },
  ]);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchValue.toLowerCase())
  );

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
          {/* Header */}
          <div className="bg-[#F3F7FB] p-4 flex justify-between items-center mb-4 shadow-sm">
            {/* Menu button on mobile */}
            <button
              className="text-[#0a61aa] md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FaBars className="text-2xl" />
            </button>

            <h1 className="text-2xl font-bold text-[#0a61aa]">Hi, Admin!</h1>
          </div>

          {/* Section Data Kategori */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
            <h2 className="text-lg md:text-xl font-bold text-[#0a61aa]">Data Kategori Kelas</h2>

            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
              {/* Tombol tambah kategori */}
              <div className="relative">
                <button
                  className="py-1 px-4 bg-[#0a61aa] text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 flex items-center justify-center"
                  onClick={handleAddClick}
                >
                  <IoAddCircleOutline className="mr-2" />
                  Tambah
                </button>
              </div>

              {/* Pencarian */}
              <div className="relative w-full md:w-auto flex items-center">
                <FaSearch
                  className="text-[#173D94] text-lg cursor-pointer"
                  onClick={toggleSearch}
                />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className={`transition-all duration-300 ease-in-out border border-[#173D94] rounded-full ml-2 p-1 ${
                    searchVisible ? "w-40 opacity-100" : "w-0 opacity-0 pointer-events-none"
                  }`}
                  placeholder="Cari Nama..."
                />
              </div>
            </div>
          </div>

          {/* Tabel Data Kategori */}
          <div className="overflow-x-auto bg-white p-4">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100 text-left text-xs md:text-sm font-semibold">
                  <th className="px-2 md:px-4 py-2">ID</th>
                  <th className="px-2 md:px-4 py-2">Nama Kategori</th>
                  <th className="px-2 md:px-4 py-2">Foto</th>
                  <th className="px-2 md:px-4 py-2">Published</th>
                  <th className="px-2 md:px-4 py-2">Pengajar</th>
                  <th className="px-2 md:px-4 py-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category, index) => (
                  <tr key={index} className="border-t text-xs md:text-sm">
                    <td className="px-2 md:px-4 py-2">{category.id}</td>
                    <td className="px-2 md:px-4 py-2">{category.name}</td>
                    <td className="px-2 md:px-4 py-2">
                      <img
                        src={category.photo}
                        alt={category.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-2 md:px-4 py-2">{category.published ? "True" : "False"}</td>
                    <td className="px-2 md:px-4 py-2">{category.pengajar}</td>
                    <td className="px-2 md:px-4 py-2 flex flex-wrap space-x-2">
                      {/* Tombol Ubah */}
                      <button
                        className="py-1 px-2 md:px-4 bg-green-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
                        onClick={() => handleEditClick(category)}
                      >
                        Ubah
                      </button>
                      {/* Tombol Hapus */}
                      <button
                        className="py-1 px-2 md:px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
                        onClick={() => handleDelete(category)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pop-up untuk tambah kategori */}
          <TambahKategori show={showTambahPopup} onClose={() => setShowTambahPopup(false)} />

          {/* Pop-up untuk ubah kategori */}
          <UbahKategori
            show={showUbahPopup}
            onClose={() => setShowUbahPopup(false)}
            existingData={selectedCategory}
          />

          {/* Modal Konfirmasi Hapus */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-3xl shadow-lg relative w-80">
                <h2 className="text-xl font-bold text-center mb-4">Yakin hapus data?</h2>
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
        </div>
      </div>
    </>
  );
};

export default AdminDataKategori;
