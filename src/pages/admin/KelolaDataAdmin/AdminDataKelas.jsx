import { useEffect, useState } from "react";
import { FaFilter, FaBars } from "react-icons/fa";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getAllKelas } from "../../../redux/actions/adminDataKelasActions";
import Sidebar from "../../../components/Sidebar/SidebarAdmin";
import NavbarAdmin from "../../../components/NavbarAdmin";

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

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
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
    setCurrentPage(1);
  };

  return (
    <div className="flex">
      <div
        className={`fixed inset-0 z-50 transition-transform transform bg-white md:relative md:translate-x-0 md:bg-transparent ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className="flex-1 p-4 md:p-6 bg-secondary min-h-screen font-poppins">
      <NavbarAdmin setSidebarOpen={setSidebarOpen} />

        <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
          <h2 className="flex items-center py-2 px-4 mt-4 bg-gradient-to-r from-[#FF5722] to-[#FF9800] text-white font-semibold rounded-md text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4">Data Kelas</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={filter}
                onChange={handleFilterChange}
                className="p-1 border border-[#0a61aa] rounded-full text-sm text-[#0a61aa]"
              >
                <option value="">Filter</option>
                <option value="Free">Free</option>
                <option value="Premium">Premium</option>
              </select>
              <FaFilter className="absolute right-4 top-2 text-[#0a61aa] text-sm" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left text-xs md:text-sm font-semibold">
                <th className="px-2 md:px-4 py-2">ID</th>
                <th className="px-2 md:px-4 py-2">Kategori</th>
                <th className="px-2 md:px-4 py-2">Nama Kelas</th>
                <th className="px-2 md:px-4 py-2">Tipe Kelas</th>
                <th className="px-2 md:px-4 py-2">Level</th>
                <th className="px-2 md:px-4 py-2">Harga</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((course, index) => (
                <tr key={index} className="border-t text-xs md:text-sm">
                  <td className="px-2 md:px-4 py-2">{course.courseCode}</td>
                  <td className="px-2 md:px-4 py-2">{course.category.categoryName}</td>
                  <td className="px-2 md:px-4 py-2">{course.courseName}</td>
                  <td
                    className={`px-2 md:px-4 py-2 font-bold ${
                      course.typeCourse.typeName === "Free" ? "text-success" : "text-failed"
                    }`}
                  >
                    {course.typeCourse.typeName}
                  </td>
                  <td className="px-2 md:px-4 py-2">{course.courseLevel.levelName}</td>
                  <td className="px-2 md:px-4 py-2">{course.coursePrice}</td>
                  <td className="px-2 md:px-4 py-2 flex flex-wrap space-x-2"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            className={`flex items-center py-2 px-4 rounded-lg ${
              currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-[#0a61aa] text-white"
            } transition-all duration-300 hover:scale-105`}
            onClick={handlePreviousPage}
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
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
            <IoArrowForwardCircle className="ml-2 text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDataKelas;
