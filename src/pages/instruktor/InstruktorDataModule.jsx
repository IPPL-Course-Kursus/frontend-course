import { useState } from "react";
import { FaBars } from "react-icons/fa";
import {
  IoAddCircleOutline,
  IoArrowBack,
  IoArrowBackCircle,
  IoArrowForwardCircle,
} from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../../components/Sidebar/SidebarInstruktur";
import TambahModule from "../../components/InstrukturComponents/DataModuleComponent/TambahModule";
import UbahModule from "../../components/InstrukturComponents/DataModuleComponent/UbahModule";

const InstruktorDataModule = () => {
  const [showTambahPopup, setShowTambahPopup] = useState(false);
  const [showUbahPopup, setShowUbahPopup] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  const handleAddClick = () => {
    setSelectedCourse(null);
    setShowTambahPopup(true);
  };

  const handleEditClick = (course) => {
    setSelectedCourse(course);
    setShowUbahPopup(true);
  };

  const handleDetailClick = (course) => {
    console.log("Detail clicked for:", course);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const [courseType] = useState([
    { id: 1, judulChapter: "Pengenalan", konten: 2 },
    { id: 2, judulChapter: "Dasar-Dasar HTML, CSS, & JavaScript", konten: 3 },
    { id: 3, judulChapter: "Pengembangan Front End Lanjutan", konten: 2 },
    { id: 4, judulChapter: "Pengembangan Back End", konten: 4 },
    { id: 5, judulChapter: "React Basics", konten: 3 },
    { id: 6, judulChapter: "Node.js Intro", konten: 2 },
    { id: 7, judulChapter: "GraphQL Basics", konten: 3 },
    { id: 8, judulChapter: "Advanced TypeScript", konten: 4 },
    { id: 9, judulChapter: "React Native", konten: 3 },
    { id: 10, judulChapter: "Redux in Practice", konten: 3 },
    { id: 11, judulChapter: "MongoDB Basics", konten: 4 },
    { id: 12, judulChapter: "Next.js Advanced", konten: 5 },
    { id: 13, judulChapter: "Fundamentals of Web Accessibility", konten: 3 },
    { id: 14, judulChapter: "JavaScript ES6 Features", konten: 4 },
    { id: 15, judulChapter: "Integrasi API dengan Fetch", konten: 3 },
    { id: 16, judulChapter: "Pengantar DevOps", konten: 4 },
    { id: 17, judulChapter: "Dasar-Dasar Testing dengan Jest", konten: 2 },
    { id: 18, judulChapter: "Pengenalan Microservices", konten: 3 },
    { id: 19, judulChapter: "UI/UX Design Principles", konten: 4 },
    { id: 20, judulChapter: "Cloud Computing dengan AWS", konten: 5 },
  ]);

  const totalPages = Math.ceil(courseType.length / itemsPerPage);
  const currentItems = courseType.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="flex">
        <div
          className={`fixed inset-0 z-50 transition-transform transform bg-white md:relative md:translate-x-0 md:bg-transparent ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SideBar />
        </div>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        <div className="flex-1 p-4 md:p-6 bg-secondary min-h-screen font-poppins">
          <div className="bg-[#F3F7FB] p-4 flex justify-between items-center mb-4 shadow-sm">
            <button
              className="text-[#0a61aa] md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FaBars className="text-2xl" />
            </button>

            <h1 className="text-2xl font-bold text-[#0a61aa]">Hi, Instruktur!</h1>
          </div>

          <button
            className="flex items-center text-[#0a61aa] transition-all duration-300 hover:scale-105 mb-4"
            onClick={handleBackClick}
          >
            <IoArrowBack className="text-2xl mr-2" />
            <span className="text-lg font-bold">Kembali</span>
          </button>

          <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
            <h2 className="text-lg md:text-xl font-bold text-[#0a61aa]">Data Module Kelas</h2>

            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
              <div className="relative">
                <button
                  className="py-1 px-4 bg-[#0a61aa] text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 flex items-center justify-center"
                  onClick={handleAddClick}
                >
                  <IoAddCircleOutline className="mr-2" />
                  Tambah
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-left text-xs md:text-sm font-semibold border-b">
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Judul Chapter</th>
                  <th className="px-4 py-3">Konten</th>
                  <th className="px-4 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((course) => (
                  <tr key={course.id} className="border-b text-xs md:text-sm hover:bg-gray-50">
                    <td className="px-4 py-2">{course.id}</td>
                    <td className="px-4 py-2">{course.judulChapter}</td>
                    <td className="px-4 py-2">{course.konten}</td>
                    <td className="px-4 py-2 flex space-x-2">
                      <Link to="/inst/data-konten">
                        <button className="py-1 px-2 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2">
                          Kelola
                        </button>
                      </Link>
                      <button
                        className="py-1 px-2 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
                        onClick={() => handleEditClick(course)}
                      >
                        Ubah
                      </button>
                      <button
                        className="py-1 px-2 bg-red-700 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
                        onClick={() => handleDetailClick(course)}
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

          {/* Pop-up untuk tambah module */}
          <TambahModule show={showTambahPopup} onClose={() => setShowTambahPopup(false)} />

          {/* Pop-up untuk ubah module */}
          <UbahModule
            show={showUbahPopup}
            onClose={() => setShowUbahPopup(false)}
            existingData={selectedCourse}
          />
        </div>
      </div>
    </>
  );
};

export default InstruktorDataModule;
