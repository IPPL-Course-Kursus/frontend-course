import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoAddCircleOutline, IoArrowBack } from "react-icons/io5";
import DataKontenInput from "../../components/InstrukturComponents/DataKonten/DataKontenInput";
import DataKontenUbah from "../../components/InstrukturComponents/DataKonten/DataKontenUbah";
import DataKontenDetail from "../../components/InstrukturComponents/DataKonten/DataKontenDetail";
import Sidebar from "../../components/Sidebar/SidebarInstruktur";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDataKonten } from "../../redux/actions/instruktorActions";

const InstruktorDataKonten = () => {
  const [showTambahPopup, setShowTambahPopup] = useState(false);
  const [showUbahPopup, setShowUbahPopup] = useState(false);
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { content, loading, error } = useSelector((state) => state.content);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDataKonten(id));
  }, [dispatch, id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleAddClick = () => {
    setSelectedContent({}); // Reset selectedContent saat menambah konten baru
    setShowTambahPopup(true);
  };

  const handleEditClick = (contentItem) => {
    setSelectedContent(contentItem);
    setShowUbahPopup(true);
  };

  const handleDetailClick = (contentItem) => {
    setSelectedContent(contentItem);
    setShowDetailPopup(true);
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
          {/* Header */}
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
            className="flex items-center py-2 px-4 bg-gradient-to-r from-[#FF5722] to-[#FF9800] text-white font-semibold rounded-md text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4"
            onClick={handleDetailClick}
          >
            <span className="font-bold">Data Konten Kelas</span>
          </button>

          {/* Section Data Kelas */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
            <button
              className="flex items-center py-2 px-4 bg-gradient-to-r from-[#0a61aa] to-[#007bbf] text-white font-semibold rounded-md text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              onClick={handleBackClick}
            >
              <IoArrowBack className="text-2xl mr-2" />
              <span className="font-bold">Kembali</span>
            </button>

            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <button
                className="flex items-center justify-center py-2 px-4 bg-gradient-to-r from-[#0a61aa] to-[#007bbf] text-white font-semibold rounded-md text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={handleAddClick}
              >
                <IoAddCircleOutline className="mr-2 text-2xl" />
                <span className="font-bold">Tambah</span>
              </button>
            </div>
          </div>

          {/* Tabel Data Kelas */}
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : content.length === 0 ? (
            <p>Tidak ada konten yang ditemukan.</p>
          ) : (
            <div className="overflow-x-auto bg-white p-4">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100 text-left text-xs md:text-sm font-semibold">
                    <th className="px-2 md:px-4 py-2">Urutan</th>
                    <th className="px-2 md:px-4 py-2">Judul Materi</th>
                    <th className="px-2 md:px-4 py-2">Teks</th>
                    <th className="px-2 md:px-4 py-2">Video URL</th>
                    <th className="px-2 md:px-4 py-2">Durasi</th>
                    <th className="px-2 md:px-4 py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(content) && content.length > 0 ? (
                    content.map((contentItem, index) => (
                      <tr key={index} className="border-t text-xs md:text-sm">
                        <td className="px-2 md:px-4 py-2">{contentItem.sort}</td>
                        <td className="px-2 md:px-4 py-2">{contentItem.contentTitle}</td>
                        <td className="px-2 md:px-4 py-2">{contentItem.teks}</td>
                        <td className="px-2 md:px-4 py-2">{contentItem.contentUrl}</td>
                        <td className="px-2 md:px-4 py-2">{contentItem.duration}</td>
                        <td className="px-2 md:px-4 py-2 flex flex-wrap space-x-2">
                          <button
                            className="py-1 px-2 md:px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
                            onClick={() => handleEditClick(contentItem)}
                          >
                            Ubah
                          </button>
                          <button
                            className="py-1 px-2 md:px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
                            onClick={() => handleDetailClick(contentItem)}
                          >
                            Detail
                          </button>
                          <button className="py-1 px-2 md:px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2">
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-4">
                        Tidak ada konten yang ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>

                {/* <tbody>
                  {content.map((contentItem, index) => (
                    <tr key={index} className="border-t text-xs md:text-sm">
                      <td className="px-2 md:px-4 py-2">{contentItem.sort}</td>
                      <td className="px-2 md:px-4 py-2">{contentItem.contentTitle}</td>
                      <td className="px-2 md:px-4 py-2">{contentItem.teks}</td>
                      <td className="px-2 md:px-4 py-2">{contentItem.contentUrl}</td>
                      <td className="px-2 md:px-4 py-2">{contentItem.duration}</td>
                      <td className="px-2 md:px-4 py-2 flex flex-wrap space-x-2">
                        <button
                          className="py-1 px-2 md:px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
                          onClick={() => handleEditClick(contentItem)}
                        >
                          Ubah
                        </button>
                        <button
                          className="py-1 px-2 md:px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2"
                          onClick={() => handleDetailClick(contentItem)}
                        >
                          Detail
                        </button>
                        <button className="py-1 px-2 md:px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 mb-2">
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody> */}
              </table>
            </div>
          )}

          {/* Modal Pop-up */}
          <DataKontenInput
            show={showTambahPopup}
            onClose={() => setShowTambahPopup(false)}
            chapterId={id} // Pass the chapterId (which is obtained from useParams)
          />
          <DataKontenUbah
            show={showUbahPopup}
            onClose={() => setShowUbahPopup(false)}
            existingData={selectedContent}
          />
          <DataKontenDetail
            show={showDetailPopup}
            onClose={() => setShowDetailPopup(false)}
            contentId={selectedContent ? selectedContent.id : null}
          />
        </div>
      </div>
    </>
  );
};

export default InstruktorDataKonten;
