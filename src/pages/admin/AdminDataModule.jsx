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

  const handleEdit = (module) => {
    alert("Edit modul: " + module.title);
  };

  const handleDelete = (module) => {
    if (window.confirm(`Yakin ingin menghapus modul ${module.title}?`)) {
      setModules(modules.filter((mod) => mod.id !== module.id));
    }
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

        {/* Tombol Tambah di bawah judul Data Module */}
        <div className="flex justify-end mb-4">
          <button
            className="bg-blue-800 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-900 transition"
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
                    onClick={() => handleEdit(module)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-3 mx-1 rounded hover:bg-red-600 transition"
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
    </div>
  );
};

export default AdminDataModule;
