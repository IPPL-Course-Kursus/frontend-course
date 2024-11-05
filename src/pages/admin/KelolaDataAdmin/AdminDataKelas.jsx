import { useEffect, useState } from "react";
import { FaFilter, FaBars } from "react-icons/fa";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getAllKelas } from "../../../redux/actions/adminDataKelasActions";
import Sidebar from "../../../components/Sidebar/SidebarAdmin";

const AdminDataKelas = () => {
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.courses || []);

  useEffect(() => {
    dispatch(getAllKelas());
  }, [dispatch]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredCourses = courses.filter((courseType) => {
    return (
      (filter === "" || courseType.typeCourse.typeName === filter)
    );
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
        <div className="bg-[#F3F7FB] p-4 flex justify-between items-center mb-4 shadow-sm">
          <button className="text-[#0a61aa] md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars className="text-2xl" />
          </button>
          <h1 className="text-2xl font-bold text-[#0a61aa]">Hi, Admin!</h1>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
          <h2 className="text-lg md:text-xl font-bold text-[#0a61aa]">Data Kelas</h2>
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
                <th className="px-2 md:px-4 py-2">Urutan</th>
                <th className="px-2 md:px-4 py-2">Kategori</th>
                <th className="px-2 md:px-4 py-2">Nama Kelas</th>
                <th className="px-2 md:px-4 py-2">Tipe Kelas</th>
                <th className="px-2 md:px-4 py-2">Level</th>
                <th className="px-2 md:px-4 py-2">Harga</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((courseType, index) => (
                <tr key={courseType.id} className="border-t text-xs md:text-sm">
                  <td className="px-2 md:px-4 py-2">{indexOfFirstItem + index + 1}</td>
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
                  <td className="px-2 md:px-4 py-2">{courseType.coursePrice}</td>
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
