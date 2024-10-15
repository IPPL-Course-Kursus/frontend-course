import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import DataKontenInput from "../../components/InstrukturComponents/DataKonten/DataKontenInput";
import DataKontenUbah from "../../components/InstrukturComponents/DataKonten/DataKontenUbah";
import DataKontenDetail from "../../components/InstrukturComponents/DataKonten/DataKontenDetail";
import Sidebar from "../../components/Sidebar/SidebarInstruktur";

const InstruktorDataKonten = () => {
  const [showTambahPopup, setShowTambahPopup] = useState(false);
  const [showUbahPopup, setShowUbahPopup] = useState(false);
  const [showDetailPopup, setShowDetailPopup] = useState(false); // State untuk modal detail
  const [selecteContent, setSelectedContent] = useState(null);

  // sidebar state for mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleAddClick = () => {
    setSelectedContent(null);
    setShowTambahPopup(true);
  };

  const handleEditClick = (content) => {
    setSelectedContent(content);
    setShowUbahPopup(true);
  };

  const handleDetailClick = (content) => {
    setSelectedContent(content);
    setShowDetailPopup(true);
  };
  // Filter

  const [content] = useState([
    {
      id: 1,
      urutan: 1,
      Judulmateri: "Pengenalan",
      video: "ixOd42SEUF0?si=D7mUnv467Ci_01eH",
      durasi: "20 Menit",
    },
    {
      id: 2,
      urutan: 2,
      Judulmateri: "Setup Vsc",
      video: "ixOd42SEUF0?si=D7mUnv467Ci_01eH",
      durasi: "20 Menit",
    },
    {
      id: 3,
      urutan: 3,
      Judulmateri: "Dasar JavaScript",
      video: "ixOd42SEUF0?si=D7mUnv467Ci_01eH",
      durasi: "20 Menit",
    },
    {
      id: 4,
      urutan: 4,
      Judulmateri: "Belajar Mapping",
      video: "ixOd42SEUF0?si=D7mUnv467Ci_01eH",
      durasi: "20 Menit",
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

            <h1 className="text-2xl font-bold text-[#0a61aa]">Hi, Instruktur!</h1>
          </div>

          {/* Section Data Kelas */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
            <h2 className="text-lg md:text-xl font-bold text-[#0a61aa]">Data Konten</h2>

            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
              {/* Tombol tambah kelas */}
              <div className="relative">
                <button
                  className="py-1 px-4 bg-[#0a61aa] text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 flex items-center justify-center"
                  onClick={handleAddClick}
                >
                  <IoAddCircleOutline className="mr-2" />
                  Tambah
                </button>
              </div>

              {/* Dropdown filter */}
            </div>
          </div>

          {/* Tabel Data Kelas */}
          <div className="overflow-x-auto bg-white p-4">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100 text-left text-xs md:text-sm font-semibold">
                  <th className="px-2 md:px-4 py-2">ID</th>
                  <th className="px-2 md:px-4 py-2">Urutan</th>
                  <th className="px-2 md:px-4 py-2">Judul Materi</th>
                  <th className="px-2 md:px-4 py-2">Video URL</th>
                  <th className="px-2 md:px-4 py-2">Durasi</th>
                  <th className="px-2 md:px-4 py-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {content.map((content, index) => (
                  <tr key={index} className="border-t text-xs md:text-sm">
                    <td className="px-2 md:px-4 py-2">{content.id}</td>
                    <td className="px-2 md:px-4 py-2">{content.urutan}</td>
                    <td className="px-2 md:px-4 py-2">{content.Judulmateri}</td>
                    <td className="px-2 md:px-4 py-2">{content.video}</td>
                    {/* <td
                      className={`px-2 md:px-4 py-2 font-bold ${
                        content.tipeKelas === "Free" ? "text-success" : "text-failed"
                      }`}
                    >
                      {content.tipeKelas}
                    </td> */}
                    <td className="px-2 md:px-4 py-2">{content.durasi}</td>
                    <td className="px-2 md:px-4 py-2 flex flex-wrap space-x-2">
                      <button
                        className="py-1 px-2 md:px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
                        onClick={() => handleEditClick(content)}
                      >
                        Ubah
                      </button>
                      <button
                        className="py-1 px-2 md:px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
                        onClick={() => handleDetailClick(content)}
                      >
                        Detail
                      </button>
                      <button className="py-1 px-2 md:px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2">
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pop-up untuk tambah kelas */}
          <DataKontenInput show={showTambahPopup} onClose={() => setShowTambahPopup(false)} />

          {/* Pop-up untuk ubah kelas */}
          <DataKontenUbah
            show={showUbahPopup}
            onClose={() => setShowUbahPopup(false)}
            existingData={selecteContent}
          />

          {/* Pop-up untuk detail kelas */}
          <DataKontenDetail
            show={showDetailPopup}
            onClose={() => setShowDetailPopup(false)}
            existingData={selecteContent}
          />
        </div>
      </div>
    </>
  );
};

export default InstruktorDataKonten;
