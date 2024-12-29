import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import { IoAddCircleOutline } from "react-icons/io5"; 
import { useDispatch, useSelector } from "react-redux";
import { getAllKelas } from "../../../redux/actions/adminDataKelasActions";
import SidebarAdminR from "../../../components/Sidebar/SidebarAdminR";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { toast, Toaster } from "react-hot-toast"; 

const AdminDataKelas = () => {
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.courses);

  useEffect(() => {
    dispatch(getAllKelas());
  }, [dispatch]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredCourses = courses.filter((courseType) => {
    return filter === "" || courseType.typeCourse.typeName === filter;
  });

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage) || 1;
  const adjustedCurrentPage = Math.min(currentPage, totalPages);
  const currentItems = filteredCourses.slice(
    (adjustedCurrentPage - 1) * itemsPerPage,
    adjustedCurrentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (adjustedCurrentPage < totalPages) setCurrentPage(adjustedCurrentPage + 1);
  };

  const handlePreviousPage = () => {
    if (adjustedCurrentPage > 1) setCurrentPage(adjustedCurrentPage - 1);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };

  // State for delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [kelasToDelete, setKelasToDelete] = useState(null);

  const handleDeleteKelas = (id) => {
    setKelasToDelete(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setKelasToDelete(null);
  };

  const confirmDeleteKelas = () => {
    // dispatch(deleteKelasById(kelasToDelete));
    // toast.success("Kelas berhasil dihapus");
    // closeDeleteModal();
  };

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

          {/* Section Data Kelas */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
            <h2 className="flex items-center py-2 px-4 mt-4 bg-gradient-to-r from-[#FF5722] to-[#FF9800] text-white font-semibold rounded-md text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4">
              Data Kelas
            </h2>
            <div className="flex justify-end items-center space-x-2 w-full md:w-auto">
              {/* Filter Select */}
              <div className="relative">
                <select
                  value={filter}
                  onChange={handleFilterChange}
                  className="flex items-center py-2 pl-10 pr-4 bg-[#0a61aa] text-white font-semibold rounded-md text-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#0a61aa] focus:ring-opacity-50"
                >
                  <option value="">Filter</option>
                  <option value="Free">Free</option>
                  <option value="Premium">Premium</option>
                </select>
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-sm" />
              </div>
            </div>
          </div>

          {/* Responsive Layout: Table for Desktop, Cards for Mobile */}
          <div className="overflow-x-auto bg-white p-4 rounded-md shadow-md">
            {/* Desktop Table */}
            <div className="hidden md:block">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100 text-left text-xs md:text-sm font-semibold">
                    <th className="px-4 py-2 w-1/12">No</th>
                    <th className="px-4 py-2 w-1/6">Kategori</th>
                    <th className="px-4 py-2 w-2/6">Nama Kelas</th>
                    <th className="px-4 py-2 w-1/6">Tipe Kelas</th>
                    <th className="px-4 py-2 w-1/6">Level</th>
                    <th className="px-4 py-2 w-1/6">Harga</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((course, index) => (
                      <tr key={course.id} className="border-t text-xs md:text-sm">
                        {/* Row Number */}
                        <td className="px-4 py-2">
                          {(adjustedCurrentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="px-4 py-2">{course.category.categoryName}</td>
                        <td className="px-4 py-2">{course.courseName}</td>
                        <td
                          className={`px-4 py-2 font-bold ${
                            course.typeCourse.typeName === "Free" ? "text-green-600" : "text-red-500"
                          }`}
                        >
                          {course.typeCourse.typeName}
                        </td>
                        <td className="px-4 py-2">{course.courseLevel.levelName}</td>
                        <td className="px-4 py-2 text-gray-900 font-semibold">
                          Rp. {course.coursePrice.toLocaleString("id-ID")}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        Tidak ada kelas ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="block md:hidden space-y-4">
              {currentItems.length > 0 ? (
                currentItems.map((course, index) => (
                  <div key={course.id} className="border rounded-md p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">
                        {(adjustedCurrentPage - 1) * itemsPerPage + index + 1}. {course.courseName}
                      </span>
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Kategori:</span> {course.category.categoryName}
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Tipe Kelas:</span>{" "}
                      <span
                        className={`font-bold ${
                          course.typeCourse.typeName === "Free" ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {course.typeCourse.typeName}
                      </span>
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Level:</span> {course.courseLevel.levelName}
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Harga:</span> Rp. {course.coursePrice.toLocaleString("id-ID")}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">Tidak ada kelas ditemukan.</p>
              )}
            </div>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="grid grid-cols-3 items-center mt-4">
              {/* Previous Button */}
              <div className="flex justify-start">
                {adjustedCurrentPage > 1 && (
                  <button
                    className="flex items-center py-2 px-4 rounded-lg bg-[#0a61aa] text-white transition-all duration-300 hover:scale-105"
                    onClick={handlePreviousPage}
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
                    className="flex items-center py-2 px-4 rounded-lg bg-[#0a61aa] text-white transition-all duration-300 hover:scale-105"
                    onClick={handleNextPage}
                  >
                    Next
                    <IoArrowForwardCircle className="ml-2 text-xl" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteModal && (
            <DataKelasDelete
              show={showDeleteModal}
              onClose={closeDeleteModal}
              kelasId={kelasToDelete}
              onConfirm={confirmDeleteKelas}
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

export default AdminDataKelas;