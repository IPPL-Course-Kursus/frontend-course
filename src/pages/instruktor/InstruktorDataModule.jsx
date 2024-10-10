import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import SideBar from "../../components/Sidebar/SidebarInstruktur";
import TambahModule from "../../components/InstrukturComponents/DataModuleComponent/TambahModule";
import UbahModule from "../../components/InstrukturComponents/DataModuleComponent/UbahModule";
import { Link } from "react-router-dom";

const InstruktorDataModule = () => {
  const [showTambahPopup, setShowTambahPopup] = useState(false);
  const [showUbahPopup, setShowUbahPopup] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // New state for sidebar visibility
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleAddClick = () => {
    setSelectedCourse(null);
    setShowTambahPopup(true);
  };

  const handleEditClick = (course) => {
    setSelectedCourse(course);
    setShowUbahPopup(true);
  };

  // detail handle TBA
  const handleDetailClick = (course) => {
    console.log("Detail clicked for:", course);
  };

  // Data
  const [courseType] = useState([
    {
      id: 1,
      judulChapter: "Pengenalan",
      konten: 2,
    },
    {
      id: 2,
      judulChapter: "Dasar-Dasar HTML, CSS, & JavaScript",
      konten: 3,
    },
    {
      id: 3,
      judulChapter: "Pengembangan Front End Lanjutan",
      konten: 2,
    },
    {
      id: 4,
      judulChapter: "Pengembangan Back End",
      konten: 4,
    },
  ]);
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
          {/* header */}
          <div className="bg-[#F3F7FB] p-4 flex justify-between items-center mb-4 shadow-sm">
            {/* menu button on mobile */}
            <button
              className="text-[#0a61aa] md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FaBars className="text-2xl" />
            </button>

            <h1 className="text-2xl font-bold text-[#0a61aa]">Hi, Instruktur!</h1>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
            <h2 className="text-lg md:text-xl font-bold text-[#0a61aa]">Data Module Kelas</h2>

            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
              {/* Tombol tambah module */}
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

          {/* Tabel Data Module */}
          <div className="overflow-x-auto bg-white p-4">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100 text-left text-xs md:text-sm font-semibold">
                  <th className="px-2 md:px-4 py-2">ID</th>
                  <th className="px-2 md:px-4 py-2">Judul Chapter</th>
                  <th className="px-2 md:px-4 py-2">Konten</th>
                  <th className="px-2 md:px-4 py-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {courseType.map((course, index) => (
                  <tr key={index} className="border-t text-xs md:text-sm">
                    <td className="px-2 md:px-4 py-2">{course.id}</td>
                    <td className="px-2 md:px-4 py-2">{course.judulChapter}</td>
                    <td className="px-2 md:px-4 py-2">{course.konten}</td>
                    <td className="px-2 md:px-4 py-2 flex flex-wrap space-x-2">
                      {/* Action Buttons */}
                      <Link to="/inst/data-konten">
                        <button
                          className="py-1 px-2 md:px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
                          //   onClick={() => console.log("Kelola", course)}
                        >
                          Kelola
                        </button>
                      </Link>
                      <button
                        className="py-1 px-2 md:px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
                        onClick={() => handleEditClick(course)}
                      >
                        Ubah
                      </button>
                      <button
                        className="py-1 px-2 md:px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
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
