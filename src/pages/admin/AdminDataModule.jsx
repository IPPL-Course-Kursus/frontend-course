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

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentModule, setCurrentModule] = useState({
    id: null,
    title: "",
    content: "",
  });
  const [moduleToDelete, setModuleToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  const handleAdd = () => {
    setCurrentModule({ id: null, title: "", content: "" });
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (module) => {
    setCurrentModule(module);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleSave = () => {
    if (isEditMode) {
      setModules(
        modules.map((mod) =>
          mod.id === currentModule.id ? currentModule : mod
        )
      );
    } else {
      setModules([...modules, { ...currentModule, id: modules.length + 1 }]);
    }
    setShowModal(false);
  };

  const handleDelete = (module) => {
    setModuleToDelete(module);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setModules(modules.filter((mod) => mod.id !== moduleToDelete.id));
    setShowDeleteModal(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="w-full p-8">
        <div className="bg-white rounded-lg shadow-lg p-6 relative">
          {/* Mengubah judul menjadi justify-left */}
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-left">
            Hi, Admin!
          </h2>
          <h3 className="text-2xl font-bold mb-6 text-left">Data Module Kelas</h3>

          {/* Tombol tambah tetap di kanan */}
          <div className="flex justify-end mb-4">
            <button
              className="flex items-center bg-blue-800 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-900 transition"
              onClick={handleAdd}
            >
              <span className="text-xl font-bold">+</span>
              <span className="ml-2">Tambah</span>
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
                    <tr key={module.id} className="hover:bg-gray-100 text-center transition-all">
                    <td className="py-2 px-4 border">{module.id}</td>
                    <td className="py-2 px-4 border text-left">{module.title}</td> {/* Align left */}
                    <td className="py-2 px-4 border">{module.content}</td>
                    <td className="py-2 px-4 border">
                        <button
                        className="bg-red-500 text-black py-1 px-2 mx-1 rounded hover:bg-red-800 transition"
                        onClick={() => alert("Kelola modul: " + module.title)}
                        >
                        Kelola
                        </button>
                        <button
                        className="bg-red-500 text-black py-1 px-2 mx-1 rounded hover:bg-red-800 transition"
                        onClick={() => handleEdit(module)}
                        >
                        Ubah
                        </button>
                        <button
                        className="bg-red-500 text-black py-1 px-2 mx-1 rounded hover:bg-red-800 transition"
                        onClick={() => handleDelete(module)}
                        >
                        Hapus
                        </button>
                    </td>
                    </tr>
                  ))}
                </tbody>
          </table>
        </div>
      </main>

      {/* Modal Tambah/Ubah */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-2/3 h-3/4 p-6 rounded-3xl shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={toggleModal}
            >
              &#x2716;
            </button>
            <h2 className="text-left text-2xl font-bold mb-4 text-blue-600 mt-5">
              {isEditMode ? "Edit Modul" : "Tambah Modul"}
            </h2>
            <form className="max-w-lg mx-auto">
              <div className="mb-8 rounded-3xl">
                <label className="block text-gray-700">Judul Chapter</label>
                <input
                  type="text"
                  value={currentModule.title}
                  className="w-full border rounded px-3 py-2 mt-1"
                  onChange={(e) =>
                    setCurrentModule({ ...currentModule, title: e.target.value })
                  }
                />
              </div>

              <div className="mb-8 rounded-3xl">
                <label className="block text-gray-700">Konten</label>
                <input
                  type="number"
                  value={currentModule.content}
                  className="w-full border rounded px-3 py-2 mt-1"
                  onChange={(e) =>
                    setCurrentModule({ ...currentModule, content: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  className="items-center w-52 h-10 rounded-2xl bg-blue-600 text-white font-bold py-2 shadow"
                  onClick={handleSave}
                >
                  {isEditMode ? "Update" : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-3xl shadow-lg relative w-80">
            <h2 className="text-xl font-bold text-center mb-4">Yakin hapus modul?</h2>
            <div className="flex justify-around mt-6">
              <button
                className="bg-red-600 text-white px-6 py-2 rounded-full font-bold"
                onClick={confirmDelete}
              >
                Hapus
              </button>
              <button
                className="bg-gray-300 px-6 py-2 rounded-full font-bold"
                onClick={() => setShowDeleteModal(false)}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDataModule;