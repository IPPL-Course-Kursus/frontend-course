// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

const AdminDataModule = () => {
  const [modules, setModules] = useState([
    { id: 1, title: "Pengenalan", content: 2 },
    { id: 2, title: "Dasar-Dasar HTML, CSS, & Javascript", content: 3 },
    { id: 3, title: "Pengembangan Front End Lanjutan", content: 2 },
    { id: 4, title: "Pengembangan Back End", content: 4 },
    { id: 5, title: "Integrasi Front End dan Back End", content: 2 },
    { id: 6, title: "Melakukan Deploy", content: 2 },
  ]);

  const [selectedModule, setSelectedModule] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState(""); // Menyimpan tipe popup: tambah, edit, hapus

  // Mengatur visibilitas popup
  const openPopup = (type, module = null) => {
    setPopupType(type);
    setSelectedModule(module);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedModule(null);
    setPopupType("");
  };

  const handleSaveModule = (isEdit = false) => {
    if (isEdit && selectedModule) {
      // Edit module
      setModules(
        modules.map((mod) =>
          mod.id === selectedModule.id ? selectedModule : mod
        )
      );
    } else {
      // Tambah module baru
      const newModule = {
        id: modules.length + 1,
        title: selectedModule?.title || "Modul Baru",
        content: selectedModule?.content || 1,
      };
      setModules([...modules, newModule]);
    }
    closePopup();
  };

  const handleDeleteModule = () => {
    setModules(modules.filter((mod) => mod.id !== selectedModule.id));
    closePopup();
  };

  return (
    <div className="p-6 bg-secondary min-h-screen font-poppins">
      {/* Header */}
      <div className="bg-[#F3F7FB] p-4 flex justify-between items-center mb-4 shadow-sm">
        <h1 className="text-2xl font-bold text-[#173D94]">Hi, Admin!</h1>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-lg p-6 relative">
        <h3 className="text-2xl font-bold mb-6 text-left">Data Module Kelas</h3>

        {/* Tombol Tambah */}
        <div className="flex justify-end mb-4">
          <button
            className="bg-blue-800 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-900 transition"
            onClick={() => openPopup("tambah")}
          >
            Tambah
          </button>
        </div>

        <table className="min-w-full bg-white border rounded-lg shadow-sm mt-2">
          <thead>
            <tr>
              <th className="py-2 px-4 border text-left">ID</th>
              <th className="py-2 px-4 border text-left">Judul Chapter</th>
              <th className="py-2 px-4 border text-left">Konten</th>
              <th className="py-2 px-4 border text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((module) => (
              <tr key={module.id} className="hover:bg-gray-100 transition-all">
                <td className="py-2 px-4 border text-center">{module.id}</td>
                <td className="py-2 px-4 border text-left">{module.title}</td>
                <td className="py-2 px-4 border text-center">{module.content}</td>
                <td className="py-2 px-4 border text-center">
                  <button
                    className="bg-green-500 text-white py-1 px-3 mx-1 rounded hover:bg-green-600 transition"
                    onClick={() => openPopup("edit", module)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-3 mx-1 rounded hover:bg-red-600 transition"
                    onClick={() => openPopup("hapus", module)}
                  >
                    Hapus
                  </button>
                  <button
                    className="bg-yellow-500 text-white py-1 px-3 mx-1 rounded hover:bg-yellow-600 transition"
                    onClick={() => openPopup("kelola", module)}
                  >
                    Kelola
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg relative max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">
              {popupType === "tambah" && "Tambah Modul Baru"}
              {popupType === "edit" && "Edit Modul"}
              {popupType === "hapus" && "Hapus Modul"}
              {popupType === "kelola" && "Kelola Modul"}
            </h2>

            {popupType === "hapus" ? (
              <div>
                <p>Yakin ingin menghapus modul "{selectedModule?.title}"?</p>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                    onClick={handleDeleteModule}
                  >
                    Hapus
                  </button>
                  <button
                    className="bg-gray-300 py-2 px-4 rounded"
                    onClick={closePopup}
                  >
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <label className="block mb-2">
                  Judul Chapter:
                  <input
                    type="text"
                    className="w-full border rounded px-2 py-1"
                    value={selectedModule?.title || ""}
                    onChange={(e) =>
                      setSelectedModule({
                        ...selectedModule,
                        title: e.target.value,
                      })
                    }
                  />
                </label>
                <label className="block mb-2">
                  Konten:
                  <input
                    type="number"
                    className="w-full border rounded px-2 py-1"
                    value={selectedModule?.content || ""}
                    onChange={(e) =>
                      setSelectedModule({
                        ...selectedModule,
                        content: e.target.value,
                      })
                    }
                  />
                </label>

                <div className="flex justify-end mt-4">
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
                    onClick={() =>
                      handleSaveModule(popupType === "edit" ? true : false)
                    }
                  >
                    {popupType === "edit" ? "Simpan Perubahan" : "Tambah Modul"}
                  </button>
                  <button
                    className="bg-gray-300 py-2 px-4 rounded"
                    onClick={closePopup}
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}

            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closePopup}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDataModule;
