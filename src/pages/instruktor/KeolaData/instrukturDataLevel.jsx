import { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/SidebarInstruktur";
import { FaBars } from "react-icons/fa";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getAllLevelCourses } from "../../../redux/actions/levelCourseActions";
import HeadInstruktur from "../../../components/InstrukturComponents/HeadInstruktur";

const InstrukturDataLevel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redux dispatch and selector
  const dispatch = useDispatch();
  const { levelCourses, loading, error, successMessage } = useSelector(
    (state) => state.levelCourse
  );

  // Fetch level courses on component mount
  useEffect(() => {
    dispatch(getAllLevelCourses());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Pagination logic: slicing categories for the current page
  const totalPages = Math.ceil(levelCourses?.length / itemsPerPage);

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

          {/* Section Data Level */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
            <h2 className="flex items-center py-2 px-4 bg-gradient-to-r from-[#FF5722] to-[#FF9800] text-white font-semibold rounded-md text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4">
              Data Level Kelas
            </h2>
          </div>

          {/* Success and Error Messages */}
          {successMessage && (
            <p className="text-green-500 mb-4">{successMessage}</p>
          )}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Tabel Data Level */}
          <div className="overflow-x-auto bg-white p-4">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100 text-left text-xs md:text-sm font-semibold">
                    <th className="px-2 md:px-4 py-2">ID</th>
                    <th className="px-2 md:px-4 py-2">Level</th>
                  </tr>
                </thead>
                <tbody>
                  {levelCourses.map((level, index) => {
                    const rowNumber = index + 1;
                    return (
                      <tr key={index} className="border-t text-xs md:text-sm">
                        <td className="px-2 md:px-4 py-2">{rowNumber}</td>
                        <td className="px-2 md:px-4 py-2">{level.levelName}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              className={`flex items-center py-2 px-4 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#0a61aa] text-white"
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

export default InstrukturDataLevel;
