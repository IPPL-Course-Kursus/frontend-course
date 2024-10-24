import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminCategories } from "../../../redux/actions/adminDataKategoriActions";
import SidebarInstruktur from "../../../components/Sidebar/SidebarInstruktur";

const InstrukturDataKategori = () => {
  const dispatch = useDispatch();

  // Fetch categories from Redux store
  const { loading, categories, error } = useSelector((state) => state.adminDataKategori);

  useEffect(() => {
    dispatch(fetchAdminCategories());
  }, [dispatch]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Sidebar state for mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Pagination logic: slicing categories for the current page
  const totalPages = Math.ceil(categories?.length / itemsPerPage);
  const currentItems = categories?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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
          <SidebarInstruktur />
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
          </div>

          {/* Tabel Data Kategori */}
          <div className="overflow-x-auto bg-white p-4">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100 text-left text-xs md:text-sm font-semibold">
                    <th className="px-2 md:px-4 py-2">ID</th>
                    <th className="px-2 md:px-4 py-2">Nama Kategori</th>
                    <th className="px-2 md:px-4 py-2">Foto</th>
                    <th className="px-2 md:px-4 py-2">Published</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems?.map((category, index) => (
                    <tr key={index} className="border-t text-xs md:text-sm">
                      <td className="px-2 md:px-4 py-2">{category.id}</td>
                      <td className="px-2 md:px-4 py-2">{category.categoryName}</td>
                      <td className="px-2 md:px-4 py-2">
                        <img
                          src={category.image}
                          alt={category.categoryName}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2">{category.published ? "True" : "False"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              className={`flex items-center py-2 px-4 rounded-lg ${
                currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-[#0a61aa] text-white"
              } transition-all duration-300 hover:scale-105`}
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <IoArrowBackCircle className="mr-2 text-xl" />
              Previous
            </button>

            <span className="text-lg font-semibold">
              Page {currentPage} of {totalPages}
            </span>

            <button
              className={`flex items-center py-2 px-4 rounded-lg ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#0a61aa] text-white"
              } transition-all duration-300 hover:scale-105`}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <IoArrowForwardCircle className="ml-2 text-xl" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstrukturDataKategori;
