import { useEffect, useState } from "react";
import { FaFilter, FaBars } from "react-icons/fa";
import { IoAddCircleOutline, IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import DataKelasInput from "../../components/InstrukturComponents/DataKelas/DataKelasInput";
import DataKelasUbah from "../../components/InstrukturComponents/DataKelas/DataKelasUbah";
import DataKelasDetail from "../../components/InstrukturComponents/DataKelas/DataKelasDetail";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SidebarInstruktur from "../../components/Sidebar/SidebarInstruktur";
import { deleteDataCourse, fetchUserCourses } from "../../redux/actions/instruktorActions";
import HeadInstruktur from "../../components/InstrukturComponents/HeadInstruktur";

const InstruktorDataKelas = () => {
  const [courseTypeSearch, setCourseTypeSearch] = useState("");
  const [searchVisible] = useState(false);
  const [showTambahPopup, setShowTambahPopup] = useState(false);
  const [showUbahPopup, setShowUbahPopup] = useState(false);
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const dispatch = useDispatch();
  const { mycourse } = useSelector((state) => state.course);

  console.log("mycourse:", mycourse);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        await dispatch(fetchUserCourses());
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    fetchCourses();
  }, [dispatch, mycourse]); // Tambahkan mycourse sebagai dependency

  const handleAddClick = () => {
    setSelectedCourse({});
    setShowTambahPopup(true);
  };

  const handleEditClick = (mycourse) => {
    setSelectedCourse(mycourse);
    setShowUbahPopup(true);
  };

  const handleDetailClick = (mycourse) => {
    setSelectedCourse(mycourse);
    setShowDetailPopup(true);
  };

  const handleDelete = (mycourse) => {
    setCourseToDelete(mycourse); // Pastikan Anda mengatur kursus yang ingin dihapus
    setShowDeleteModal(true);
  };

  // const confirmDelete = () => {
  //   // Check if courseToDelete has a valid ID
  //   if (!courseToDelete?.id) {
  //     console.error("Course ID is required.");
  //     return; // Don't proceed if there's no valid course ID
  //   }

  //   // Dispatch the delete action
  //   dispatch(deleteDataCourse(courseToDelete.id))
  //     .then(() => {
  //       setShowDeleteModal(false); // Close the modal after successful deletion
  //       dispatch(fetchUserCourses()); // Refresh the course list after deletion
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting course:", error);
  //       setShowDeleteModal(false); // Close the modal even if there's an error
  //     });
  // };
  const confirmDelete = () => {
    if (!courseToDelete?.id) {
      console.error("Course ID is required.");
      return;
    }

    dispatch(deleteDataCourse(courseToDelete.id))
      .then(() => {
        setShowDeleteModal(false);
        dispatch(fetchUserCourses());
      })
      .catch((error) => {
        console.error("Error deleting course:", error);
        alert("Gagal menghapus kelas. Silakan coba lagi.");
      });
  };

  const filteredCourses = Array.isArray(mycourse)
    ? mycourse.filter((courseType) => {
        const search = courseTypeSearch || "";
        return (
          courseType.typeCourse.typeName.toLowerCase().includes(search.toLowerCase()) &&
          (filter === "" || courseType.typeCourse.typeName === filter)
        );
      })
    : [];

  // Menghitung total halaman
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  // Menentukan data yang akan ditampilkan pada halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1); // Reset halaman saat filter berubah
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
          {/* header */}
          <div className="bg-[#F3F7FB] p-4 flex justify-between items-center mb-4 shadow-sm">
            {/* menu button on mobile */}
            <button
              className="text-[#0a61aa] md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FaBars className="text-2xl" />
            </button>
            <HeadInstruktur />
          </div>

          {/* Section Data Kelas */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
            <h2 className="flex items-center py-2 px-4 bg-gradient-to-r from-[#FF5722] to-[#FF9800] text-white font-semibold rounded-md text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4">
              Data Kelas
            </h2>

            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
              {/* Tombol tambah kelas */}
              <div className="flex items-center space-x-4">
                {/* Tombol Tambah */}
                <div className="relative inline-block">
                  <button
                    className="flex items-center py-2 px-4 bg-[#0a61aa] text-white font-semibold rounded-md text-sm transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#0a61aa] focus:ring-opacity-50"
                    onClick={handleAddClick}
                  >
                    <IoAddCircleOutline className="mr-2 text-2xl" />
                    <span className="font-bold">Tambah</span>
                  </button>
                </div>

                {/* Dropdown Filter */}
                <div className="relative inline-block">
                  <select
                    value={filter}
                    onChange={handleFilterChange}
                    className="flex items-center py-2 pl-10 pr-4 bg-[#0a61aa] text-white font-semibold rounded-md text-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#0a61aa] focus:ring-opacity-50"
                  >
                    <option value="" className="text-gray-500">
                      Filter
                    </option>
                    <option value="Free">Free</option>
                    <option value="Premium">Premium</option>
                  </select>
                  <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-sm" />
                </div>
              </div>

              {/* Pencarian */}
              <div className="relative w-full md:w-auto flex items-center">
                {/* <FaSearch
                  className="text-[#173D94] text-lg cursor-pointer"
                  onClick={toggleSearch}
                /> */}
                <input
                  type="text"
                  value={courseTypeSearch}
                  onChange={(e) => setCourseTypeSearch(e.target.value)}
                  className={`transition-all duration-300 ease-in-out border border-[#173D94] rounded-full ml-2 p-1 ${
                    searchVisible ? "w-40 opacity-100" : "w-0 opacity-0 pointer-events-none"
                  }`}
                  placeholder="Cari Id..."
                />
              </div>
            </div>
          </div>

          {/* Tabel Data Kelas */}
          <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-left text-xs md:text-sm font-semibold">
                  <th className="px-2 md:px-4 py-2">Urutan</th>
                  <th className="px-2 md:px-4 py-2">Image</th>
                  <th className="px-2 md:px-4 py-2">Kategori</th>
                  <th className="px-2 md:px-4 py-2">Nama Kelas</th>
                  <th className="px-2 md:px-4 py-2">Tipe Kelas</th>
                  <th className="px-2 md:px-4 py-2">Level</th>
                  <th className="px-2 md:px-4 py-2">Publish</th>
                  <th className="px-2 md:px-4 py-2">Harga</th>
                  <th className="px-2 md:px-4 py-2">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((courseType, index) => (
                  <tr key={courseType.id} className="border-t text-xs md:text-sm">
                    {/* Nomor urutan */}
                    <td className="px-2 md:px-4 py-2">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-2 md:px-4 py-2">
                      <img src={courseType.image} className="w-16 object-cover h-16 rounded-lg" />
                    </td>
                    <td className="px-2 md:px-4 py-2">{courseType.category.categoryName}</td>
                    <td className="px-2 md:px-4 py-2">{courseType.courseName}</td>
                    <td
                      className={`px-2 md:px-4 py-2 font-bold ${
                        courseType.typeCourse.typeName === "Free" ? "text-success" : "text-failed"
                      }`}
                    >
                      {courseType.typeCourse.typeName}
                    </td>
                    <td className="px-2 md:px-4 py-2">{courseType.courseLevel.levelName}</td>
                    <td className="px-2 md:px-4 py-2">
                      {courseType.publish ? "Published" : "Unpublished"}
                    </td>
                    {/* <td className="px-2 md:px-4 py-2">{courseType.coursePrice}</td> */}
                    <td className="px-2 md:px-4 py-2">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(courseType.coursePrice)}
                    </td>

                    <td className="px-2 md:px-4 py-2 flex flex-wrap space-x-2">
                      <Link to={`/inst/data-chapter/${courseType.id}`}>
                        <button className="py-1 px-2 md:px-4 bg-blue-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2">
                          Kelola
                        </button>
                      </Link>
                      <button
                        className="py-1 px-2 md:px-4 bg-green-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
                        onClick={() => handleEditClick(courseType)}
                      >
                        Ubah
                      </button>
                      <button
                        className="py-1 px-2 md:px-4 bg-yellow-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
                        onClick={() => handleDetailClick(courseType)}
                      >
                        Detail
                      </button>
                      <button
                        className="py-1 px-2 md:px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
                        onClick={() => handleDelete(courseType)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              className={`flex items-center py-2 px-4 rounded-lg ${
                currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
              }`}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <IoArrowBackCircle className="mr-2" />
              Previous
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              className={`flex items-center py-2 px-4 rounded-lg ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
              <IoArrowForwardCircle className="ml-2" />
            </button>
          </div>

          {/* Popups for Add, Edit, Detail, and Delete Modals */}
          <DataKelasInput show={showTambahPopup} onClose={() => setShowTambahPopup(false)} />
          <DataKelasUbah
            show={showUbahPopup}
            onClose={() => setShowUbahPopup(false)}
            existingData={selectedCourse}
          />
          <DataKelasDetail
            show={showDetailPopup}
            onClose={() => setShowDetailPopup(false)}
            existingData={selectedCourse}
          />

          {showDeleteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-70">
              {" "}
              {/* Ubah warna latar belakang */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
                <p className="mb-4">Apakah Anda yakin ingin menghapus konten ini?</p>
                <div className="flex justify-end space-x-4">
                  <button
                    className="py-2 px-4 bg-red-500 text-white rounded-md"
                    onClick={confirmDelete}
                  >
                    Hapus
                  </button>
                  <button
                    className="py-2 px-4 bg-gray-300 rounded-md"
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

export default InstruktorDataKelas;
